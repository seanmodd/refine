import {
    List,
    Table,
    useTable,
    IResourceComponentsProps,
} from "@pankod/refine";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>({
        initialPageSize: 50,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};
