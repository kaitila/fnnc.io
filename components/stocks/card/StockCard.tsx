import { globalQuote } from "@/apis/alpha/globalQuote";
import { Chart } from "@/components/stocks/card/Chart";
import ReactCountryFlag from "react-country-flag";
import { LuDot } from "react-icons/lu";

interface StockCardProps {
	ticker: string;
	exchange: string;
	countryCode: string;
	status?: boolean;
	className?: string;
	chartWidth?: number;
	darkMode?: boolean;
}

export const StockCard = async ({
	ticker,
	exchange,
	countryCode,
	status,
	className,
	chartWidth = 20,
	darkMode,
}: StockCardProps) => {
	const quote = await globalQuote({
		symbol: ticker,
	});

	let latestPrice: string;

	if (quote) {
		latestPrice = parseFloat(quote["05. price"]).toFixed(2);
	} else {
		latestPrice = "0";
	}

	return (
		<div
			className={`min-w-44 h-max max-w-max min-h-44 ${darkMode ? "bg-text" : "bg-bg"} rounded-lg shadow-md ${className}`}
		>
			<div className="p-2">
				<div className="flex justify-between">
					<h2
						className={`text-4xl font-bold h-max ${darkMode ? "text-bg" : ""}`}
					>
						{ticker}
					</h2>
					<div className="flex items-end h-max">
						<h3
							className={`text-3xl h-max ${darkMode ? "text-bg" : ""}`}
						>
							{latestPrice.slice(0, -3)}
						</h3>
						<h4
							className={`text-xl h-max ${darkMode ? "text-darkLight" : "text-light"}`}
						>
							{latestPrice.slice(-3)}
						</h4>
					</div>
				</div>
				<div className="flex items-center">
					<p
						className={`${darkMode ? "text-darkLight" : "text-light"}`}
					>
						{exchange}
					</p>
					<ReactCountryFlag
						countryCode={countryCode}
						svg
						className="mb-0.5 ml-1 text-sm"
					/>
					<LuDot className="text-light" />
					<p
						className={`${status ? "text-green-500" : "text-red-500"} text-sm mb-0.5 font-semibold`}
					>
						{status ? "open" : "closed"}
					</p>
				</div>
				<Chart ticker="IBM" chartWidth={chartWidth} />
			</div>
		</div>
	);
};
