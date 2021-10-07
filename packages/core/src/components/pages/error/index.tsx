import React, { useLayoutEffect, useState } from "react";
import { Button, Result, Typography, Space, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";

import { useNavigation, useTranslate, useResourceWithRoute } from "@hooks";
import { ResourceErrorRouterParams } from "../../../interfaces";

const { Text } = Typography;

/**
 * When the app is navigated to a non-existent route, refine shows a default error page.
 * A custom error component can be used for this error page.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#catchall} for more details.
 */
export const ErrorComponent: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const { push } = useNavigation();
    const translate = useTranslate();
    const actionTypes = ["edit", "create", "show"];

    const params = useParams<ResourceErrorRouterParams>();
    const resource = useResourceWithRoute();

    useLayoutEffect(() => {
        if (params.resource) {
            const resourceFromRoute = resource(params.resource);
            if (
                params.action &&
                actionTypes.includes(params.action) &&
                !resourceFromRoute[params.action]
            ) {
                setErrorMessage(
                    translate(
                        "pages.error.info",
                        {
                            action: params.action,
                            resource: params.resource,
                        },
                        `You may have forgotten to add the "${params.action}" component to "${params.resource}" resource.`,
                    ),
                );
            }
        }
    }, [params]);

    return (
        <Result
            status="404"
            title="404"
            extra={
                <Space direction="vertical" size="large">
                    <Space>
                        <Text>
                            {translate(
                                "pages.error.404",
                                "Sorry, the page you visited does not exist.",
                            )}
                        </Text>
                        {errorMessage && (
                            <Tooltip title={errorMessage}>
                                <InfoCircleOutlined data-testid="error-component-tooltip" />
                            </Tooltip>
                        )}
                    </Space>
                    <Button type="primary" onClick={() => push("/")}>
                        {translate("pages.error.backHome", "Back Home")}
                    </Button>
                </Space>
            }
        />
    );
};
