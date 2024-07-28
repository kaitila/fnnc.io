import { rest } from "./client"

export const ticker = async (search: string) => {
    if (search === '') {
        return [];
    }
    try {
        const data = await rest.reference.tickers({
            type: 'CS',
            market: 'stocks',
            limit: 10,
            search: search,
        });

        if (data.results) {
            return data.results;
        }
    } catch(e) {
        console.error('An error happened:', e);
    }

    return [];
}