import { LuDot } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

import "@/app/globals.css";

export interface StockViewMininalProps {
	className?: string | undefined;
	name: string;
	exchange?: string;
	ticker: string;
	img?: string;
}

export const StockViewMinimal = ({
	className,
	name,
	exchange,
	ticker,
	img,
}: StockViewMininalProps) => {
	return (
		<div className={`min-w-72 flex items-center gap-2 ${className}`}>
			{img && (
				<div className="w-14 h-14 loading-animation rounded-lg">
					<img className="w-14 h-14 rounded-lg" src={img}></img>
				</div>
			)}
			<div className="p-2 flex flex-1 items-center justify-between gap-8">
				<div>
					<Link href={`/dashboard/company/${ticker}`}>
						<h3 className="font-bold text-xl">{name}</h3>
						<h4 className="font-semibold text-light text-base">
							{ticker}
						</h4>
					</Link>
				</div>
				<div className="flex items-center gap-1">
					{exchange ? (
						<>
							<p className="font-semibold text-base text-primary">
								{exchange}
							</p>
							<LuDot className="text-xl text-light" />
							<p className="text-closed font-semibold text-sm">
								closed
							</p>
						</>
					) : null}
					<Link href={`/dashboard/company/${ticker}`}>
						<IoIosArrowForward className="text-4xl text-light" />
					</Link>
				</div>
			</div>
		</div>
	);
};
