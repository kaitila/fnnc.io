import { IAggs, IAggsResults, ITickersResults } from "@polygon.io/client-js";

export interface PriceQuote {
	ticker: string;
	price: number;
	change: number;
	changeP: number;
}

export interface OHLC extends IAggs {}

export interface OHLCResponse {
	error?: string | undefined;
	data: OHLC | null;
}

export interface SearchQuery extends Array<ITickersResults> {}
