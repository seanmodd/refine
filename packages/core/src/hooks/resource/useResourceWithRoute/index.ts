import { useContext, useCallback } from "react";
import { ResourceContext } from "@contexts/resource";
import { IResourceItem } from "../../../interfaces";

export const useResourceWithRoute = (): ((route: string) => IResourceItem) => {
    const { resources } = useContext(ResourceContext);

    const resourceWithRoute = useCallback(
        (route: string) => {
            const resource = resources.find((p) => p.route === route);

            if (!resource) {
                return { name: route } as IResourceItem;
            }
            return resource;
        },
        [resources],
    );

    return resourceWithRoute;
};
