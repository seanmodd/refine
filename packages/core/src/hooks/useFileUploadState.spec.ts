import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper, act } from "@test";

import { useFileUploadState } from "./useFileUploadState";

describe("useFileUploadState Hook", () => {
    it("isLoading false", async () => {
        const { result, waitFor } = renderHook(() => useFileUploadState(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await waitFor(() => {
            return !result.current.isLoading;
        });

        const { isLoading } = result.current;

        expect(isLoading).toEqual(false);
    });

    it("onChange and isLoading true", async () => {
        const { result } = renderHook(() => useFileUploadState(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        act(() => {
            result.current.onChange({
                file: {
                    uid: "1",
                    name: "aa",
                },
                fileList: [
                    {
                        uid: "1",
                        name: "test",
                        status: "uploading",
                    },
                ],
            });
        });

        expect(result.current.isLoading).toEqual(true);
    });
});
