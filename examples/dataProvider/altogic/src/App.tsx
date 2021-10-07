import { HttpError, Refine, Resource } from "@pankod/refine";
import dataProvider from "@pankod/refine-altogic";
import axios from "axios";

import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const API_URL = "https://dev001.na-dev-engine.altogic.com";
const YOUR_SECRET_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZJZCI6IjYxMzczZGVkMjQ5NWMzMDAxOTliZTAxNiIsImtleUlkIjoiNjEzNzNlMzYyNDk1YzMwMDE5OWJlMDJkIiwiaWF0IjoxNjMxMDEwMzU4LCJleHAiOjI0OTUwMTAzNTh9.2fL28Bzd97mqfAvcsTrYj1mZ_hqf3WRnr2DOtV3lsc0";

const axiosInstance = axios.create();
axiosInstance.defaults.headers = {
    Authorization: YOUR_SECRET_API_KEY,
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data
                ?.map((p: any) => p.message)
                .join(", "),
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

const App: React.FC = () => {
    return (
        <Refine dataProvider={dataProvider(API_URL, axiosInstance)}>
            <Resource
                name="post"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
                canDelete
            />
        </Refine>
    );
};

export default App;
