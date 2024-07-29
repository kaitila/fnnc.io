import { quote } from "@/apis/finnhub/quote";
import { PriceQuote } from "./types";

export const getPriceQuote = async (ticker: string): Promise<PriceQuote> => {
	const data = await quote(ticker);
	return {
		ticker: ticker,
		price: data.c,
		change: data.d || 0,
		changeP: data.dp || 0,
	};
};
