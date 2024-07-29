import { aggregates } from "../polygon/aggregates";
import { OHLCResponse } from "./types";

export const getOHLC = async (
	ticker: string,
	range: "week" | "month" | "year"
): Promise<OHLCResponse> => {
	const to = new Date().toISOString().split("T")[0].toString();
	const date = new Date();
	let timespan: "day" | "hour" | "week";
	switch (range) {
		case "week":
			date.setDate(date.getDate() - 7);
			timespan = "hour";
			break;
		case "month":
			date.setMonth(date.getMonth() - 1);
			timespan = "day";
			break;
		case "year":
			date.setMonth(date.getMonth() - 12);
			timespan = "week";
			break;
	}

	const from = date.toISOString().split("T")[0].toString();

	const data = await aggregates(ticker, timespan, from, to);

	if (data.error) {
		return {
			error: data.error,
			data: null,
		};
	}

	return {
		data: data.data,
	};
};
