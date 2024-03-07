export enum CrunchyRoute {
    HOME = "/",
    ITEMS = "/items",
    PROFILE = "/profile",
    ADMIN = "/admin",
}

enum Views {
    HOME,
    ITEMS,
    PROFILE,
    ADMIN,
}

interface PathNode {
    children?: PathNode[],
    id: Views | null,
    path: string
}

class CrunchyPaths {

    static readonly paths: PathNode[] = [
        {
            id: Views.HOME,
            path: "/",
        },
        {
            id: Views.ITEMS,
            path: "/items",
        },
        {
            id: Views.PROFILE,
            path: "/profile",
        },
        {
            id: Views.ADMIN,
            path: "/admin",
        }
    ];

    static getPath = (id: Views, type: "relative" | "absolute" = "absolute"): string => {
        const findPathRecursively = (node: PathNode, targetId: Views): string[] | undefined => {
            if (!node || typeof node !== 'object') return undefined;

            if (node.id === targetId) return [node.path];

            for (const child of node.children || []) {
                const path = findPathRecursively(child, targetId);
                if (path) return [node.path, ...path];
            }

            return undefined;
        };

        const path = findPathRecursively({ id: null, path: "", children: CrunchyPaths.paths }, id);

        switch (type) {
            case "absolute":
                return path ? path.join("") : "";
            case "relative":
            default:
                return path ? path[path.length - 1] : "";
        }
    };

}

export { CrunchyPaths, Views };