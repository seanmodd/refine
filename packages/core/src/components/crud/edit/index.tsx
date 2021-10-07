import React from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Row,
    Space,
    ButtonProps,
    PageHeader,
    PageHeaderProps,
    Spin,
} from "antd";

import {
    useResourceWithRoute,
    useMutationMode,
    useNavigation,
    useTranslate,
} from "@hooks";
import {
    DeleteButton,
    RefreshButton,
    ListButton,
    DeleteButtonProps,
    SaveButton,
} from "@components";
import { userFriendlyResourceName } from "@definitions";
import { MutationMode, ResourceRouterParams } from "../../../interfaces";

export interface EditProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
    recordItemId?: string;
    pageHeaderProps?: PageHeaderProps;
    canDelete?: boolean;
    deleteButtonProps?: DeleteButtonProps;
    resource?: string;
    isLoading?: boolean;
}

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/api-references/components/basic-views/edit} for more details.
 */
export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
    pageHeaderProps,
    canDelete,
    resource: resourceFromProps,
    isLoading = false,
}) => {
    const translate = useTranslate();
    const { goBack, list } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);
    const isDeleteButtonVisible =
        canDelete ?? (resource.canDelete || deleteButtonProps);

    return (
        <PageHeader
            ghost={false}
            onBack={routeFromAction ? goBack : undefined}
            title={
                title ??
                translate(
                    `${resource.name}.titles.edit`,
                    `Edit ${userFriendlyResourceName(
                        resource.name,
                        "singular",
                    )}`,
                )
            }
            extra={
                <Space wrap>
                    {!recordItemId && (
                        <ListButton
                            data-testid="edit-list-button"
                            resourceName={resource.name}
                        />
                    )}
                    <RefreshButton
                        resourceName={resource.name}
                        recordItemId={recordItemId ?? idFromRoute}
                    />
                </Space>
            }
            {...pageHeaderProps}
        >
            <Spin spinning={isLoading}>
                <Card
                    bordered={false}
                    actions={[
                        <Space
                            key="action-buttons"
                            style={{ float: "right", marginRight: 24 }}
                        >
                            {actionButtons ?? (
                                <>
                                    {isDeleteButtonVisible && (
                                        <DeleteButton
                                            data-testid="edit-delete-button"
                                            mutationMode={mutationMode}
                                            onSuccess={() => {
                                                list(
                                                    resource.route ??
                                                        resource.name,
                                                );
                                            }}
                                            {...deleteButtonProps}
                                        />
                                    )}
                                    <SaveButton {...saveButtonProps} />
                                </>
                            )}
                        </Space>,
                    ]}
                >
                    {children}
                </Card>
            </Spin>
        </PageHeader>
    );
};
