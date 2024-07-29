import { apiKey } from "./client";
import { CompanyProfile } from "./types";

export const companyProfile = async (ticker: string) => {
	const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${apiKey}`;

	const data: any = await fetch(url).then((res) => res.json());
	if (data.error) {
		console.error(data.error);
		return {
			error: data.error,
			data: null,
		};
	}

	if (Object.keys(data).length === 0) {
		return {
			error: "Invalid ticker",
			data: null,
		};
	}

	return {
		data: data as CompanyProfile,
	};
};
