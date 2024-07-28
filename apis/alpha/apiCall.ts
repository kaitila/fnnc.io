export const apiCall = async (endpoint: string) => {
    const url = `https://www.alphavantage.co/query?${endpoint}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'request',
            }
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch (e) {
        console.error((e as Error).message);
    }
}