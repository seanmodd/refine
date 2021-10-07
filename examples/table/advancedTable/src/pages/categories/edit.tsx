import {
    Checkbox,
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
} from "@pankod/refine";

import { ICategory } from "interfaces";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ICategory>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Active" name="active" valuePropName="checked">
                    <Checkbox>Active</Checkbox>
                </Form.Item>
            </Form>
        </Edit>
    );
};
