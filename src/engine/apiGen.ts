function postApi<T>(endpoint: string, data: unknown): Promise<T> {
    const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json() as Promise<T>;
    });
}

export { postApi };