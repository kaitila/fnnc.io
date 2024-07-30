import { CompanyProfile } from "@/apis/finnhub/types";
import { getProfile } from "@/apis/methods/getProfile";
import { StockViewMinimal } from "@/components/StockViewMinimal";

export interface RecentsProps {
	className?: string | undefined;
	recents: { ticker: any }[];
}

export const Recents = async ({ className, recents }: RecentsProps) => {
	const dataArr: CompanyProfile[] = [];

	return (
		<div
			className={`border border-lighter rounded-xl p-2 w-80 shadow-sm ${className}`}
		>
			<h2 className="relative w-max mb-4 text-3xl ml-1 mt-1 p-1 font-semibold after:content-[''] after:h-0.5 after:rounded-sm after:absolute after:w-full after:bg-primary after:left-0 after:bottom-0.5">
				Recently viewed
			</h2>
			{recents.slice(0, 3).map(async (el, i) => {
				const { data, error } = await getProfile(el.ticker);
				if (!data) return;
				dataArr.push(data);
				return (
					<StockViewMinimal
						img={data.logo}
						name={data.name}
						ticker={data.ticker}
						key={i}
					/>
				);
			})}
		</div>
	);
};
