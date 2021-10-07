import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    Space,
    EditButton,
    ShowButton,
    useList,
    Tag,
} from "@pankod/refine";

import { IPost, ITag } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const { data, isLoading } = useList<ITag>({ resource: "tags" });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex={["tags"]}
                    title="Tags"
                    render={(value: Array<string>) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <>
                                {value?.map((tagId) => (
                                    <Tag key={tagId}>
                                        {
                                            data?.data.find(
                                                (item) => item.id === tagId,
                                            )?.title
                                        }
                                    </Tag>
                                ))}
                            </>
                        );
                    }}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
