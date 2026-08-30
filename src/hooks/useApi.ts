import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { AxiosRequestConfig } from "axios";

export function useApi<T>(
    endpoint: string,
    options?: {
        method?: AxiosRequestConfig["method"];
        body?: unknown;
    }
) {
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const fetchData = useCallback(async () => {
    try {
        setLoading(true);
        setError(null);
        const method = options?.method?.toLowerCase() || "get";
        const res = await api.request<T>({
            url: endpoint,
            method: options?.method ?? "GET",
            data: options?.body,
        });
        setData(res.data);
    } catch (err: unknown) {
        if(err instanceof Error) setError(err.message);
        else setError("An unexpected error occurred");
    } finally {
        setLoading(false);
    }
}, [endpoint, options]);

useEffect(() => {
    fetchData();
}, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
