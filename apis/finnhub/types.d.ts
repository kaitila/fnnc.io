export interface QuoteResponse {
	c: number;
	d: number | null;
	dp: number | null;
	h: number;
	l: number;
	o: number;
	pc: number;
	t: number;
	error?: string;
}

export interface CompanyProfile {
	country: string;
	currency: string;
	exchange: string;
	finnhubIndustry: string;
	ipo: string;
	logo: string;
	marketCapitalization: number;
	name: string;
	phone: string;
	sharesOutstanding: number;
	ticker: string;
	weburl: string;
}

export interface ComparyProfileResponse {
	error?: string | undefined;
	data: CompanyProfile | null;
}

export interface ErrorResponse {
	error: string;
}
