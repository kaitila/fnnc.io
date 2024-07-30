import { getPriceQuote } from "@/apis/methods/getPriceQuote";
import { getProfile } from "@/apis/methods/getProfile";
import { CompanyError } from "@/components/CompanyError";
import { PriceLoading, PriceView } from "@/components/stocks/Price";
import { LuDot } from "react-icons/lu";
import { createClient } from "@/utils/supabase/server";

import "@/app/globals.css";

export interface HeaderProps {
	className?: string | undefined;
	ticker: string;
}

export const Header = async ({ className, ticker }: HeaderProps) => {
	const { data, error } = await getProfile(ticker);

	if (error || !data) {
		console.log(error);
		return (
			<CompanyError
				message="ticker not found!"
				className="mx-auto w-fit"
			/>
		);
	}

	const supabase = createClient();
	await supabase.from("searches").insert({ ticker: ticker });
	const priceData = await getPriceQuote(ticker);

	return (
		<header
			className={`
                    md:max-w-192 md:min-w-192 mx-auto
                    ${className}
                `}
		>
			<div className="p-6 border border-lighter rounded-xl shadow-sm w-full">
				<div
					className="
							mx-auto flex items-center
							md:gap-8
						"
				>
					<div className="relative">
						<img
							src={data.logo}
							alt=""
							className="h-16 w-16 rounded-md"
						/>
						<img
							src="https://ik.imagekit.io/demo/img/image2.jpeg?tr=w-1,h-1:w-64,h-64"
							alt="dominant color placeholder"
							className="h-16 w-16 rounded-md absolute left-0 top-0 -z-10"
						/>
					</div>
					<div className="flex-1">
						<h1
							className="
									font-bold
									md:text-4xl md:mb-1
								"
						>
							{data.name}
						</h1>
						<h3
							className="
									font-semibold text-light
									md:text-2xl
								"
						>
							{data.ticker}
						</h3>
					</div>
					<PriceView
						price={priceData.price}
						changeP={priceData.changeP}
						size="lg"
					/>
				</div>
				<div className="flex mt-4 items-center gap-1">
					<p className="text-primary text-lg font-semibold">
						{data.exchange}
					</p>
					<LuDot className="text-xl text-light" />
					<p className="text-base font-semibold text-red-500">
						closed
					</p>
				</div>
			</div>
		</header>
	);
};

export const HeaderLoading = () => {
	return (
		<header>
			<div className="p-6 border border-lighter rounded-xl shadow-sm w-full">
				<div
					className="
							mx-auto flex items-center
							md:gap-8
						"
				>
					<div className="relative w-16 h-16 rounded-lg bg-lighter"></div>
					<div className="flex-1">
						<div className="w-64 h-9 loading-animation rounded-lg mb-1"></div>
						<div className="loading-animation rounded-lg w-20 h-8"></div>
					</div>
					<PriceLoading size="lg" />
				</div>
				<div className="flex mt-4 items-center gap-1">
					<div className="w-64 h-7 loading-animation rounded-lg"></div>
					<LuDot className="text-xl text-light" />
					<div className="loading-animation rounded-lg w-16 h-6"></div>
				</div>
			</div>
		</header>
	);
};
