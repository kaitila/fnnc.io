import { companyProfile } from "../finnhub/companyProfile";

export const getProfile = async (ticker: string) => {
	const response = await companyProfile(ticker);
	return response;
};
