import { useAuthEntityService } from "./useAuthEntityService";

export const useAdminService = () => {
    const { get } = useAuthEntityService({endpoint: "/admin"});

    const getAdminCheck = async (): Promise<void> => {
        return get<void>();
    } 

    return { getAdminCheck };
}