import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";

export function useApi<T>(endpoint: string, options?: { method?: string; body?: any }) {
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const fetchData = useCallback(async () => {
    try {
        setLoading(true);
        setError(null);
        const method = options?.method?.toLowerCase() || "get";
        const res = await (api as any)[method](endpoint, options?.body);
        setData(res.data);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}, [endpoint, options]);

useEffect(() => {
    fetchData();
}, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
