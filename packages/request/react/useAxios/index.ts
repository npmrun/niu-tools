import { useState, useEffect } from "react"
import request from "@/request"
import { AxiosRequestConfig } from "axios";

export const useAxios = (config: AxiosRequestConfig) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        setLoading(true);

        request(config)
            .then((val: any)=>setResult(val))
            .catch((err)=>setError(err))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { loading, error, result };
};
