import { useAuth0 } from "@auth0/auth0-react"


export const useAuthToken = () => {
    const { REACT_APP_AUTH0_AUDIENCE } = process.env;
    const { getAccessTokenSilently } = useAuth0();

    const getToken = async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: REACT_APP_AUTH0_AUDIENCE as string,
                }
            });
            return accessToken;
        } catch (error) {
            console.error("Error getting access token: ", error);
            throw error;
        }
    };

    return { getToken };
}