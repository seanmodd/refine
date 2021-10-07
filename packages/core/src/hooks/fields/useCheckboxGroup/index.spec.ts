import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useCheckboxGroup } from "./";

describe("render hook default options", () => {
    it("should success data with resource", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useCheckboxGroup({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.queryResult.isSuccess;
        });

        const { checkboxGroupProps } = result.current;
        const { options } = checkboxGroupProps;

        expect(options).toHaveLength(2);

        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("should success data with resource with optionLabel and optionValue", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useCheckboxGroup<{ id: string; slug: string }>({
                    resource: "posts",
                    optionLabel: "slug",
                    optionValue: "id",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.queryResult.isSuccess;
        });

        const { checkboxGroupProps } = result.current;
        const { options } = checkboxGroupProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            { label: "ut-ad-et", value: "1" },
            { label: "consequatur-molestiae-rerum", value: "2" },
        ]);
    });

    it("should invoke queryOptions methods successfully", async () => {
        const mockFunc = jest.fn();

        const { result, waitFor } = renderHook(
            () =>
                useCheckboxGroup<{ id: string; slug: string }>({
                    resource: "posts",
                    optionLabel: "slug",
                    optionValue: "id",
                    queryOptions: {
                        onSuccess: (data) => {
                            mockFunc();
                        },
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.queryResult.isSuccess;
        });

        const { checkboxGroupProps } = result.current;
        const { options } = checkboxGroupProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            { label: "ut-ad-et", value: "1" },
            { label: "consequatur-molestiae-rerum", value: "2" },
        ]);

        expect(mockFunc).toBeCalled();
    });
});
