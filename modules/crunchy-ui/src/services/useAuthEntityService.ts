import { useState } from "react";
import { useAuthToken } from "../hooks/useAuthToken";

interface useAuthEntityServiceProps {
    endpoint: string;
}

export const useAuthEntityService = ({endpoint}: useAuthEntityServiceProps)  => {

    const baseUrl = process.env.REACT_APP_BACKEND_URL as string ?? "http://localhost:8080/api" + endpoint;
    
    const [authToken, setAuthToken] = useState<string | null>(null);
    const { getToken } = useAuthToken();

    const prepareRequest = async (httpMethod: string, bodyObject?: object): Promise<RequestInit> => {
        if (!authToken) {
            const jwt = await getToken();
            setAuthToken(jwt);
        }

        const requestOptions: RequestInit = {
            method: httpMethod,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: bodyObject ? JSON.stringify(bodyObject) : null,
        };

        return requestOptions;
    }

    const executeRequest = async <T>(request: RequestInit, endpoint?: string, params?: Record<string, string>): Promise<T> => {
        const queryParams = new URLSearchParams(params).toString();
        const requestUrl: string = baseUrl + (endpoint ?? '') + (params ? `?${queryParams}` : '');

        try {
            const response = await fetch(requestUrl, request);
            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg);
            }

            return await response.json() as T; 
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const get = async <T>(endpoint?: string, params?: Record<string, string>, body?: object): Promise<T> => {
        const request = await prepareRequest("GET", body);
        return executeRequest(request, endpoint, params);
    }

    const put = async <T>(endpoint?: string, params?: Record<string, string>, body?: object): Promise<T> => {
        const request = await prepareRequest("PUT", body);
        return executeRequest(request, endpoint, params);
    }

    return { get, put };
}