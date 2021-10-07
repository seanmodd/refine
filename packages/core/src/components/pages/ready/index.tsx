import * as React from "react";
import { Row, Col, Typography, Space, Button } from "antd";
import { ReadOutlined, FolderOutlined, TeamOutlined } from "@ant-design/icons";

import logo from "../../../assets/images/refine.svg";

const styles: { [key: string]: React.CSSProperties } = {
    root: {
        height: "100vh",
        backgroundImage:
            "url('https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png')",
        backgroundSize: "cover",
        backgroundColor: "#331049",
    },
    title: {
        color: "white",
        fontWeight: 800,
        fontSize: "64px",
        marginBottom: "8px",
    },
    p1: {
        color: "white",
        marginBottom: 0,
        fontSize: "20px",
        fontWeight: "bold",
    },
    p2: {
        color: "white",
        fontSize: "20px",
    },
};

const { Title } = Typography;

/**
 * **refine** shows a default ready page on root route when no `<Resource>` is passed to the `<Refine>` component as a child.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#readypage} for more details.
 */
export const ReadyPage: React.FC = () => {
    return (
        <Row align="middle" justify="center" style={styles.root}>
            <Col style={{ textAlign: "center" }}>
                <img
                    style={{ marginBottom: "48px" }}
                    src={logo}
                    alt="Refine Logo"
                />
                <Title style={styles.title}>Welcome on board</Title>
                <p style={styles.p1}>Your configuration is completed.</p>
                <p style={styles.p2}>
                    Now you can get started by adding a &lt;Resource&gt; as a
                    child of &lt;Refine&gt;
                </p>
                <Space
                    size="large"
                    wrap
                    style={{ marginTop: "70px", justifyContent: "center" }}
                >
                    <a
                        href="https://refine.dev"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button size="large" icon={<ReadOutlined />}>
                            Documentation
                        </Button>
                    </a>
                    <a
                        href="https://refine.dev/docs/examples/tutorial"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button size="large" icon={<FolderOutlined />}>
                            Examples
                        </Button>
                    </a>
                    <a
                        href="https://discord.gg/UuU3XCc3J5"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button size="large" icon={<TeamOutlined />}>
                            Community
                        </Button>
                    </a>
                </Space>
            </Col>
        </Row>
    );
};
