import { quote } from "@/apis/finnhub/quote";

export const getPriceQuote = async (ticker: string) => {
    const data = await quote(ticker);
    return {
        ticker: ticker,
        price: data.c,
        change: data.d || 0,
        changeP: data.dp || 0,
    }
}