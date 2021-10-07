import { useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import pluralize from "pluralize";

import { DataContext } from "@contexts/data";
import {
    CreateResponse,
    IDataContext,
    BaseRecord,
    HttpError,
    SuccessErrorNotification,
    MetaDataQuery,
} from "../../interfaces";
import { useListResourceQueries, useTranslate, useCheckError } from "@hooks";
import { handleNotification } from "@definitions";

type useCreateParams<TVariables> = {
    resource: string;
    values: TVariables;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

export type UseCreateReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseMutationResult<
    CreateResponse<TData>,
    TError,
    useCreateParams<TVariables>,
    unknown
>;

/**
 * `useCreate` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/reference/useMutation `useMutation`} for create mutations.
 *
 * It uses `create` method as mutation function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCreate} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for mutation function
 *
 */
export const useCreate = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>(): UseCreateReturnType<TData, TError, TVariables> => {
    const { mutate: checkError } = useCheckError();
    const { create } = useContext<IDataContext>(DataContext);
    const getListQueries = useListResourceQueries();
    const translate = useTranslate();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        CreateResponse<TData>,
        TError,
        useCreateParams<TVariables>,
        unknown
    >(
        ({ resource, values, metaData }: useCreateParams<TVariables>) =>
            create<TData, TVariables>({
                resource,
                variables: values,
                metaData,
            }),
        {
            onSuccess: (
                _,
                { resource, successNotification: successNotificationFromProp },
            ) => {
                const resourceSingular = pluralize.singular(resource);

                handleNotification(successNotificationFromProp, {
                    description: translate(
                        "notifications.createSuccess",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                        },
                        `Successfully created ${resourceSingular}`,
                    ),
                    message: translate("notifications.success", "Success"),
                    type: "success",
                });

                getListQueries(resource).forEach((query) => {
                    queryClient.invalidateQueries(query.queryKey);
                });
            },
            onError: (
                err: TError,
                { resource, errorNotification: errorNotificationFromProp },
            ) => {
                checkError(err);
                const resourceSingular = pluralize.singular(resource);

                handleNotification(errorNotificationFromProp, {
                    description: err.message,
                    message: translate(
                        "notifications.createError",
                        {
                            resource: translate(
                                `${resource}.${resource}`,
                                resourceSingular,
                            ),
                            statusCode: err.statusCode,
                        },
                        `There was an error creating ${resourceSingular} (status code: ${err.statusCode})`,
                    ),
                    type: "error",
                });
            },
        },
    );

    return mutation;
};
