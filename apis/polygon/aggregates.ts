import { IAggs } from "@polygon.io/client-js";
import { rest } from "./client";
import { AggregatesResponse } from "./types";

export const aggregates = async (
	ticker: string,
	timespan: "day" | "hour" | "week",
	from: string,
	to: string
): Promise<AggregatesResponse> => {
	if (ticker === "") {
		return {
			error: "Invalid ticker",
			data: null,
		};
	}
	try {
		const data: IAggs = await rest.stocks.aggregates(
			ticker,
			1,
			timespan,
			from,
			to
		);

		return {
			data: data,
		};
	} catch (e) {
		console.error("An error happened:", e);
		return {
			error: "An error happened",
			data: null,
		};
	}
};
