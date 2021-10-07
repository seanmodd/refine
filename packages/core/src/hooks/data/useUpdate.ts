import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { DataContext } from "@contexts/data";
import { ActionTypes } from "@contexts/notification";
import {
    BaseRecord,
    IDataContext,
    UpdateResponse,
    QueryResponse,
    MutationMode,
    Context as UpdateContext,
    ContextQuery,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";
import pluralize from "pluralize";
import {
    useMutationMode,
    useCancelNotification,
    useCacheQueries,
    useTranslate,
    useCheckError,
} from "@hooks";
import { handleNotification } from "@definitions/helpers";

type UpdateParams<TVariables> = {
    id: string;
    resource: string;
    mutationMode?: MutationMode;
    undoableTimeout?: number;
    onCancel?: (cancelMutation: () => void) => void;
    values: TVariables;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

export type UseUpdateReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    UpdateResponse<TData>,
    TError,
    UpdateParams<TVariables>,
    UpdateContext
>;

/**
 * `useUpdate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for update mutations.
 *
 * It uses `update` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useUpdate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useUpdate = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseUpdateReturnType<TData, TError, TVariables> => {
    const queryClient = useQueryClient();
    const { update } = useContext<IDataContext>(DataContext);
    const {
        mutationMode: mutationModeContext,
        undoableTimeout: undoableTimeoutContext,
    } = useMutationMode();
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();

    const { notificationDispatch } = useCancelNotification();

    const getAllQueries = useCacheQueries();

    const mutation = useMutation<
        UpdateResponse<TData>,
        TError,
        UpdateParams<TVariables>,
        UpdateContext
    >(
        ({
            id,
            values,
            resource,
            mutationMode,
            undoableTimeout,
            onCancel,
            metaData,
        }) => {
            const mutationModePropOrContext =
                mutationMode ?? mutationModeContext;

            const undoableTimeoutPropOrContext =
                undoableTimeout ?? undoableTimeoutContext;

            if (!(mutationModePropOrContext === "undoable")) {
                return update<TData, TVariables>({
                    resource,
                    id,
                    variables: values,
                    metaData,
                });
            }
            const updatePromise = new Promise<UpdateResponse<TData>>(
                (resolve, reject) => {
                    const doMutation = () => {
                        update<TData, TVariables>({
                            resource,
                            id,
                            variables: values,
                            metaData,
                        })
                            .then((result) => resolve(result))
                            .catch((err) => reject(err));
                    };

                    const cancelMutation = () => {
                        reject({ message: "mutationCancelled" });
                    };

                    if (onCancel) {
                        onCancel(cancelMutation);
                    }

                    notificationDispatch({
                        type: ActionTypes.ADD,
                        payload: {
                            id: id,
                            resource: resource,
                            cancelMutation: cancelMutation,
                            doMutation: doMutation,
                            seconds: undoableTimeoutPropOrContext,
                            isSilent: !!onCancel,
                        },
                    });
                },
            );
            return updatePromise;
        },
        {
            onMutate: async ({ resource, id, mutationMode, values }) => {
                const previousQueries: ContextQuery[] = [];

                const allQueries = getAllQueries(resource, id);

                const mutationModePropOrContext =
                    mutationMode ?? mutationModeContext;

                for (const queryItem of allQueries) {
                    const { queryKey } = queryItem;
                    await queryClient.cancelQueries(queryKey, undefined, {
                        silent: true,
                    });

                    const previousQuery =
                        queryClient.getQueryData<QueryResponse<TData>>(
                            queryKey,
                        );

                    if (!(mutationModePropOrContext === "pessimistic")) {
                        if (previousQuery) {
                            previousQueries.push({
                                query: previousQuery,
                                queryKey,
                            });

                            if (
                                queryKey.includes(`resource/list/${resource}`)
                            ) {
                                const { data } = previousQuery;

                                queryClient.setQueryData(queryKey, {
                                    ...previousQuery,
                                    data: data.map((record: TData) => {
                                        if (
                                            record.id?.toString() ===
                                            id.toString()
                                        ) {
                                            return {
                                                ...values,
                                                id: id,
                                            };
                                        }
                                        return record;
                                    }),
                                });
                            } else {
                                queryClient.setQueryData(queryKey, {
                                    data: {
                                        ...previousQuery.data,
                                        ...values,
                                    },
                                });
                            }
                        }
                    }
                }

                return {
                    previousQueries: previousQueries,
                };
            },
            onError: (
                err: TError,
                { id, resource, errorNotification },
                context,
            ) => {
                if (context) {
                    for (const query of context.previousQueries) {
                        queryClient.setQueryData(query.queryKey, query.query);
                    }
                }

                if (err.message !== "mutationCancelled") {
                    checkError?.(err);

                    const resourceSingular = pluralize.singular(resource);

                    handleNotification(errorNotification, {
                        key: `${id}-${resource}-notification`,
                        message: translate(
                            "notifications.editError",
                            {
                                resource: translate(
                                    `${resource}.${resource}`,
                                    resourceSingular,
                                ),
                                statusCode: err.statusCode,
                            },
                            `Error when updating ${resourceSingular} (status code: ${err.statusCode})`,
                        ),
                        description: err.message,
                        type: "error",
                    });
                }
            },
            onSettled: (_data, _error, { id, resource }) => {
                const allQueries = getAllQueries(resource, id);
                for (const query of allQueries) {
                    queryClient.invalidateQueries(query.queryKey);
                }

                notificationDispatch({
                    type: ActionTypes.REMOVE,
                    payload: { id, resource },
                });
            },
            onSuccess: (_data, { id, resource, successNotification }) => {
                const resourceSingular = pluralize.singular(resource);

                handleNotification(successNotification, {
                    key: `${id}-${resource}-notification`,
                    message: translate("notifications.success", "Successful"),
                    description: translate(
                        "notifications.editSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully updated ${resourceSingular}`,
                    ),
                    type: "success",
                });
            },
        },
    );

    return mutation;
};
