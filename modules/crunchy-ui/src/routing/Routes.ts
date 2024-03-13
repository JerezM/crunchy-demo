enum Views {
    HOME,
    ITEMS,
    SETTINGS,
    PROFILE,
    ADMIN,
    NOT_FOUND,
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
            id: Views.SETTINGS,
            path: "/settings",
            children: [
                {
                    id: Views.PROFILE,
                    path: "/profile",
                },
                {
                    id: Views.ADMIN,
                    path: "/admin",
                }
            ]
        },
        {
            id: Views.NOT_FOUND,
            path: "/not-found",
        },        
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