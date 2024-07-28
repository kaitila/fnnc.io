import { ticker } from "../polygon/ticker"
import { SearchQuery } from "./types";

export const getSearchQuery = async (search: string) => {
    const data: SearchQuery = await ticker(search);
    return data;
}