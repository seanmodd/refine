import React from "react";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { QueryObserverResult, UseQueryOptions } from "react-query";

import { useList } from "@hooks";
import {
    CrudSorting,
    Option,
    BaseRecord,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
} from "../../../interfaces";

export type useCheckboxGroupProps<TData, TError> = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    metaData?: MetaDataQuery;
} & SuccessErrorNotification;

export type UseCheckboxGroupReturnType<TData extends BaseRecord = BaseRecord> =
    {
        checkboxGroupProps: CheckboxGroupProps;
        queryResult: QueryObserverResult<GetListResponse<TData>>;
    };

/**
 * `useCheckboxGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/checkbox/#components-checkbox-demo-group Checkbox.Group} component when records in a resource needs to be used as checkbox options.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/field/useCheckboxGroup} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 *
 */
export const useCheckboxGroup = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
    successNotification,
    errorNotification,
    queryOptions,
    metaData,
}: useCheckboxGroupProps<TData, TError>): UseCheckboxGroupReturnType<TData> => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const defaultQueryOnSuccess = (data: GetListResponse<TData>) => {
        setOptions(
            data.data.map((item) => ({
                label: item[optionLabel],
                value: item[optionValue],
            })),
        );
    };

    const queryResult = useList<TData, TError>({
        resource,
        config: {
            sort,
            filters,
        },
        queryOptions: {
            ...queryOptions,
            onSuccess: (data) => {
                defaultQueryOnSuccess(data);
                queryOptions?.onSuccess?.(data);
            },
        },
        successNotification,
        errorNotification,
        metaData,
    });
    return {
        checkboxGroupProps: {
            options,
        },
        queryResult,
    };
};
