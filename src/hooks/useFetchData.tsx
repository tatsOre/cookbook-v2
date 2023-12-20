import React from 'react';

interface ApiResponse {
    // Adjust this interface based on the API response format
}

interface useFetchDataProps {
    method: string;
    url: string;
    body?: Record<string, any> | null;
}

const useFetchData = ({ method, url, body }: useFetchDataProps) => {
    const [data, setData] = React.useState<ApiResponse | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    const fetchBody = body ? JSON.stringify(body) : null

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    method: method || 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: fetchBody ? fetchBody : null,
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result: ApiResponse = await response.json();
                setData(result);
                setError(null);
            } catch (error) {
                process.env.NEXT_PUBLIC_NODE_ENV_FE === "development"
                    && console.log(error);

                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [method, url, fetchBody]);

    return { data, error, loading };
};

export default useFetchData;
