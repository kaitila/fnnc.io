"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Candle, CandleOHLC } from "./Candle";
import { OHLC } from "@/apis/methods/types";
import { getOHLC } from "@/apis/methods/getOHLC";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export interface StockChartProps {
	className?: string | undefined;
	ticker: string;
}

export const StockChart = ({ className, ticker }: StockChartProps) => {
	const [timespan, setTimespan] = useState<"week" | "month" | "year">("year");
	const [performance, setPerformance] = useState(0);

	const positive = performance > 0;

	return (
		<div
			className={`w-full rounded-xl mb-6 border border-lighter shadow-sm ${className}`}
		>
			<div className="flex justify-between m-3">
				<h2 className="text-2xl font-semibold text-light">
					Stock price
				</h2>
				<div>
					<p className="text-light text-2xl font-semibold text-nowrap">
						1Y
						{positive ? (
							<span className="ml-2 text-green-500">
								<IoMdArrowDropup className="inline" />
								{performance.toFixed(2)}%
							</span>
						) : (
							<span className="ml-2 text-red-500">
								<IoMdArrowDropdown className="inline" />
								{performance.toFixed(2)}%
							</span>
						)}
					</p>
				</div>
			</div>
			<BarContainer
				ticker={ticker}
				timespan={timespan}
				setPerformance={setPerformance}
			/>
		</div>
	);
};

interface BarContainerProps {
	className?: string | undefined;
	ticker: string;
	timespan: "week" | "month" | "year";
	setPerformance: Dispatch<SetStateAction<number>>;
}

const BarContainer = ({
	className,
	ticker,
	timespan,
	setPerformance,
}: BarContainerProps) => {
	const intervalCount = {
		week: 80,
		month: 22,
		year: 55,
	};

	const [pending, setPending] = useState(false);
	const [data, setData] = useState<OHLC>();
	const [normData, setNormData] = useState<CandleOHLC[]>([]);

	useEffect(() => {
		setPending(false);
		getOHLC(ticker, timespan).then(({ data, error }) => {
			if (data) {
				setData(data);
				setNormData(getNormalizedData(data));
				setPerformance(getPerformance(data));
				console.log(data.results![0].t);
				setPending(false);
			}
		});
	}, [timespan]);

	const getPerformance = (data: OHLC) => {
		const start = data.results![0].o!;
		const end = data.results![data.results!.length - 1].c!;

		return (end / start - 1) * 100;
	};

	const getNormalizedData = (data: OHLC) => {
		const getNormalizedVal = (high: number, low: number, val: number) => {
			const delta = high - low;

			return ((val - low) / delta) * 100;
		};

		if (data.results) {
			let low = data.results[0].l!;
			let high = data.results[0].h!;

			data.results.map((el) => {
				if (el.l! < low) {
					low = el.l!;
				}

				if (el.h! > high) {
					high = el.h!;
				}
			});

			let normResults: CandleOHLC[] = [];
			data.results.map((el) => {
				normResults.push({
					open: getNormalizedVal(high, low, el.o!),
					high: getNormalizedVal(high, low, el.h!),
					low: getNormalizedVal(high, low, el.l!),
					close: getNormalizedVal(high, low, el.c!),
					timestamp: el.t!,
				});
			});

			return normResults;
		}

		return [];
	};

	return (
		<div
			className="w-full p-8 grid gap-0.5 h-80"
			style={{
				gridTemplateColumns: `repeat(${intervalCount[timespan]}, minmax(0, 1fr))`,
			}}
		>
			{normData.map((el, i) => (
				<Candle data={el} key={i} chartHeight={16} />
			))}
		</div>
	);
};
