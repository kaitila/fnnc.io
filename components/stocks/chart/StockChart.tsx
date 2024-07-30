"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Candle, CandleOHLC } from "@/components/stocks/chart/Candle";
import { OHLC } from "@/apis/methods/types";
import { getOHLC } from "@/apis/methods/getOHLC";
import { PriceChange } from "@/components/stocks/Price";
import { CompanyError } from "@/components/CompanyError";

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
					<div className="flex font-semibold text-nowrap gap-2 items-center">
						<ChartButton
							onClick={() => setTimespan("year")}
							active={timespan === "year"}
						>
							1Y
						</ChartButton>
						<ChartButton
							onClick={() => setTimespan("month")}
							active={timespan === "month"}
						>
							1M
						</ChartButton>
						<ChartButton
							onClick={() => setTimespan("week")}
							active={timespan === "week"}
						>
							1W
						</ChartButton>
						<PriceChange
							className="inline ml-2"
							changeP={performance}
							size="xl"
						/>
					</div>
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

interface Boundaries {
	high: number;
	low: number;
	start: number;
	end: number;
	latest: number;
}

interface PricePoint {
	val: number;
	norm: number;
}
interface PricePoints {
	top: PricePoint;
	mid: PricePoint;
	low: PricePoint;
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
	const [error, setError] = useState(false);
	const [normData, setNormData] = useState<CandleOHLC[]>([]);

	const [pricePoints, setPricePoints] = useState<PricePoints>({
		top: {
			val: 0,
			norm: 0,
		},
		mid: {
			val: 0,
			norm: 0,
		},
		low: {
			val: 0,
			norm: 0,
		},
	});

	useEffect(() => {
		setError(false);
		setPending(true);
		getOHLC(ticker, timespan).then(({ data, error }) => {
			if (data) {
				processData(data);
			} else if (error) {
				setError(true);
				setPending(false);
			}
		});
	}, [timespan]);

	const processData = (data: OHLC) => {
		setData(data);
		setNormData(getNormalizedData(data));
		setPerformance(getPerformance(data));
		console.log(data.results![0].t);
		setPending(false);
	};

	const getPerformance = (data: OHLC) => {
		const start = data.results![0].o!;
		const end = data.results![data.results!.length - 1].c!;

		return (end / start - 1) * 100;
	};

	const getNormalizedVal = (high: number, low: number, val: number) => {
		const delta = high - low;

		return ((val - low) / delta) * 100;
	};

	const getNormalizedData = (data: OHLC) => {
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

			setPricePoints(
				getPricePoints(
					high,
					low,
					data.results[data.results.length - 1].c!
				)
			);

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

	const getPricePoints = (high: number, low: number, latest: number) => {
		const normLatest = getNormalizedVal(high, low, latest);

		if (normLatest > 80) {
			return {
				top: {
					val: latest,
					norm: normLatest,
				},
				mid: {
					val: (high - low) / 2 + low,
					norm: 50,
				},
				low: {
					val: low,
					norm: 0,
				},
			};
		} else if (normLatest < 20) {
			return {
				top: {
					val: high,
					norm: 100,
				},
				mid: {
					val: (high - low) / 2 + low,
					norm: 50,
				},
				low: {
					val: latest,
					norm: normLatest,
				},
			};
		} else {
			return {
				top: {
					val: high,
					norm: 100,
				},
				mid: {
					val: latest,
					norm: normLatest,
				},
				low: {
					val: low,
					norm: 0,
				},
			};
		}
	};

	return (
		<>
			{error || !data ? (
				<div className="w-full flex justify-center">
					<CompanyError
						className="mb-6 mt-2"
						message="Too many requests"
					/>
				</div>
			) : (
				<div className="p-8 h-80">
					<div
						className="w-full grid gap-0.5 relative"
						style={{
							gridTemplateColumns: `repeat(${data!.results!.length + 3}, minmax(0, 1fr))`,
						}}
					>
						{normData.map((el, i) => (
							<Candle data={el} key={i} chartHeight={16} />
						))}
						<PricePoint
							val={pricePoints.top.val}
							norm={pricePoints.top.norm}
							current={
								pricePoints.top.val ===
								data!.results![data!.results!.length - 1].c!
							}
						/>
						<PricePoint
							className=""
							val={pricePoints.mid.val}
							norm={pricePoints.mid.norm}
							current={
								pricePoints.mid.val ===
								data!.results![data!.results!.length - 1].c!
							}
						/>
						<PricePoint
							val={pricePoints.low.val}
							norm={pricePoints.low.norm}
							current={
								pricePoints.low.val ===
								data!.results![data!.results!.length - 1].c!
							}
						/>
					</div>
				</div>
			)}
		</>
	);
};

interface ChartButtonProps {
	className?: string | undefined;
	children: React.ReactNode;
	onClick: () => void;
	active?: boolean;
}

const ChartButton = ({
	className,
	children,
	onClick,
	active,
}: ChartButtonProps) => {
	return (
		<button
			className={`${className} h-10 px-1 text-xl rounded-md border font-semibold ${active ? "border-primary text-primary border-2" : "border-light text-light"}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

interface PricePointProps {
	className?: string | undefined;
	val: number;
	norm: number;
	current?: boolean;
}

const PricePoint = ({ className, val, norm, current }: PricePointProps) => {
	console.log(norm);
	return (
		<>
			<div
				className={` absolute ${current ? "text-xl text-primary font-bold -right-6" : "text-light font-semibold -right-4"}  ${className}`}
				style={{ bottom: `${norm}%` }}
			>
				{val.toFixed(2)}
			</div>
			<div
				className="absolute -z-10 bg-lighter w-full h-0.25 -right-0"
				style={{ bottom: `${norm}%` }}
			></div>
		</>
	);
};
