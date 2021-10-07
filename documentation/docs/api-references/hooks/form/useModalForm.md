---
id: useModalForm
title: useModalForm
---

import createGif from '@site/static/img/hooks/useModalForm/create.gif';
import editGif from '@site/static/img/hooks/useModalForm/edit.gif';

`useModalForm` hook allows you to manage a form within a modal. It returns Ant Design [Form](https://ant.design/components/form/) and [Modal](https://ant.design/components/modal/) components props.

```ts twoslash
interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
// ---cut---

import { useModalForm } from "@pankod/refine";

const { modalProps, formProps } = useModalForm<IPost>({
    action: "create", // or "edit"
});
```

All we have to do is to pass the `modalProps` to `<Modal>` and `formProps` to `<Form>` components.

## Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useModalForm` is used in both.

### Create Modal

In this example, we will show you how to create a record with `useModalForm`.

```tsx title="pages/posts/list.tsx" twoslash {3-5, 10-14, 18-31}
import { useModalForm, Modal, Form, Create, Radio, List, Input } from "@pankod/refine";

export const PostList: React.FC = () => {
    const { modalProps, formProps, show } = useModalForm<IPost>({
        action: "create",
    });

    return (
        <>
            <List
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
            >
                ...
            </List>
            <Modal {...modalProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value="draft">Draft</Radio>
                            <Radio value="published">Published</Radio>
                            <Radio value="rejected">Rejected</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br/>

`createButtonProps` allows us to create and manage a button above the table.

```tsx
    createButtonProps={{
        onClick: () => {
            show();
        },
    }}
```

This code block makes `<Modal>` appear when you click the button.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={createGif} alt="Create modal action" />
</div>

<br />

### Edit Modal

Let's learn how to add editing capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx twoslash title="pages/posts/list.tsx" {17, 19, 32}
import { 
    useModalForm,
    Modal,
    Form,
    Create,
    Radio,
    List,
    Table,
    EditButton,
    Input
} from "@pankod/refine";

export const PostList: React.FC = () => {
    const {
        modalProps,
        formProps,
        show,
        editId,
    } = useModalForm<IPost>({
        action: "edit",
    });

    return (
        <>
            <List>
                <Table>
                    ...
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_value, record) => (
                            <EditButton onClick={() => show(record.id)} />
                        )}
                    />
                </Table>
            </List>
            <Modal {...modalProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value="draft">Draft</Radio>
                            <Radio value="published">Published</Radio>
                            <Radio value="rejected">Rejected</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br />

:::important
**refine** doesn't automatically add a edit button to the each record in `<PostList>` which opens edit form in `<Modal>` when clicked.

So, we have to put the edit buttons on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
    title="Actions"
    dataIndex="actions"
    key="actions"
    render={(_value, record) => <EditButton onClick={() => show(record.id)} />}
/>
```

:::

:::caution
Don't forget to pass the record id to `show` to fetch the record data. This is necessary for both edit and clone forms.
:::

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={editGif} alt="Edit modal action" />
</div>

<br />


## API Reference

### Properties

| Key                                              | Description                                                                                                                                                                             | Type                                                                           | Default    |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------- |
| action <div className=" required">Required</div> | Type of form mode                                                                                                                                                                       | `"edit"` \| `"create"`                                                         | `"create"` |
| autoSubmitClose                                  | Close modal after submission                                                                                                                                                                | `boolean`                                                                      |            |
| form                                             | Ant Design form instance                                                                                                                                                                | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance) |            |
| mutationMode                                     | [Determines when mutations are executed](guides-and-concepts/mutation-mode.md). If not explicitly configured, it is read from the mutation mode configuration of the resource in current route | `"pessimistic"` \| `"optimistic"` \| `"undoable"`                              |            |
| onMutationError                                  | Called when a [mutation](https://react-query.tanstack.com/reference/useMutation) encounters an error                                                                                      | `(error: TError, variables: TVariables, context: any) => void`                 |            |
| onMutationSuccess                                | Called when a [mutation](https://react-query.tanstack.com/reference/useMutation) is successful                                                                                            | `(data: TData, variables: TVariables, context: any) => void`                   |            |
| redirect                                         | Page to redirect after a succesfull mutation                                                                                                                                              | `"show` \| `"edit` \| `"list"`\*\*                                             |            |
| submit                                           | Submit the form                                                                                                                                                                         | `(values?: TVariables) => Promise<TData>`                                      |            |
| submitOnEnter                                    | Listens `Enter` key press to submit form                                                                                                                                                 | `boolean`                                                                      | `false`    |
| undoableTimeout                                  | Duration to wait before executing mutations when `mutationMode = "undoable"`                                                                                                            | `number`                                                                       | `5000`\*   |
| warnWhenUnsavedChanges                           | Shows notification when unsaved changes exist                                                                                                                                           | `boolean`                                                                      | `false`\*  |
| successNotification                                 | Successful Mutation notification          | [`SuccessErrorNotification`](../../interfaces.md#successerrornotification) | "Successfully created `resource`" or "Successfully updated `resource`"                           |
| errorNotification                                   | Unsuccessful Mutation notification        | [`SuccessErrorNotification`](../../interfaces.md#successerrornotification) | "There was an error creating `resource` (status code: `statusCode`)" or "Error when updating `resource` (status code: `statusCode`)" |
| metaData                                            | Metadata query for `dataProvider`                                              | [`MetaDataQuery`](/api-references/interfaces.md#metadataquery)           | {}                                                                   |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-references/components/refine-config.md)>** component. `useModalForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends on which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). If `action` is `edit` instead, `redirect`s default value is `list`.

### Return Value

| Key                      | Description                                                  | Type                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that can open the modal                           | `(id?: string) => void`                                                                                                                                                               |
| formProps                | Ant Design form props                                        | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                                               |
| modalProps               | Props for managed modal                                      | [`ModalProps`](https://ant.design/components/modal/#API)                                                                                                                              |
| formLoading              | Loading status of form                                       | `boolean`                                                                                                                                                                             |
| submit                   | Submit method, the parameter is the value of the form fields | `() => void`                                                                                                                                                                          |
| visible                  | Whether the modal dialog is visible or not                   | `boolean`                                                                                                                                                                             |
| close                    | Specify a function that can close the modal                  | `() => void`                                                                                                                                                                          |
| defaultFormValuesLoading | DefaultFormValues loading status of form                     | `boolean`                                                                                                                                                                             |
| form                     | Ant Design form instance                                     | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                                                                        |
| editId                   | Record id for edit action                                    | `string`                                                                                                                                                                              |
| setEditId                | `editId` setter                                              | `Dispatch<SetStateAction<` `string` \| `undefined>>`                                                                                                                                  |
| queryResult              | Result of the query of a record                              | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery)                                                                                         |
| mutationResult           | Result of the mutation triggered by submitting the form      | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |
| setCloneId               | `cloneId` setter                                             | `Dispatch<SetStateAction<` `string` \| `undefined>>`                                                                                                                                  |
| cloneId                  | Record id for clone action                                   | `string`                                                                                                                                                                              |

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][BaseRecord] | [`BaseRecord`][BaseRecord] |
| TError     | Custom error object that extends [`HttpError`][HttpError]        | [`HttpError`][HttpError]   |
| TVariables | Values for params.                                               | `{}`                       |

## Live Codesandbox Example

   <iframe src="https://codesandbox.io/embed/refine-use-modal-form-example-qbi4m?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Flist.tsx&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-modal-form-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
