import { apiKey } from "./client"
import { QuoteResponse } from "./types";

const emptyResponse: QuoteResponse = {
    c: 0,
    d: null,
    dp: null,
    h: 0,
    l: 0,
    o: 0,
    pc: 0,
    t: 0,
}

export const quote = async (ticker: string) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`;

    const data: QuoteResponse = await fetch(url).then((res) => res.json());
    if (data.error) {
        console.error(data.error);
        return emptyResponse;
    }

    return data;
}

