import { useAuthToken } from "./useAuthToken";


export default class EntityService {
    private baseUrl: string;
    private authToken: string | null;

    constructor(endpoint: string) {
        this.baseUrl = process.env.REACT_APP_BACKEND_URL as string ?? "http://localhost:8080/api";
        this.baseUrl = this.baseUrl + endpoint;
        this.authToken = null;
    }

    private async initializeTokens() {
        const { getToken } = useAuthToken();
        this.authToken = await getToken();
    }

    private async prepareRequest(httpMethod: string, bodyObject?: object): Promise<RequestInit> {
        if (!this.authToken) {
            await this.initializeTokens();
        }

        const requestOptions: RequestInit = {
            method: httpMethod,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.authToken}`,
            },
            body: bodyObject ? JSON.stringify(bodyObject) : null,
        };

        return requestOptions;
    }

    private async executeRequest<T>(request: RequestInit, endpoint?: string, params?: Record<string, string>): Promise<T> {
        const queryParams = new URLSearchParams(params).toString();
        const requestUrl: string = this.baseUrl + (endpoint ?? '') + (params ? `?${queryParams}` : '');

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

    protected async get<T>(endpoint?: string, params?: Record<string, string>, body?: object): Promise<T> {
        const request = await this.prepareRequest("GET", body);
        return this.executeRequest(request, endpoint, params);
    }

    protected async put<T>(endpoint?: string, params?: Record<string, string>, body?: object): Promise<T> {
        const request = await this.prepareRequest("PUT", body);
        return this.executeRequest(request, endpoint, params);
    }
}