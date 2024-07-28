import { ITickersResults } from "@polygon.io/client-js";

export interface PriceQuote {
    ticker: string;
    price: number;
    change: number;
    changeP: number;
}

export interface SearchQuery extends Array<ITickersResults> {}