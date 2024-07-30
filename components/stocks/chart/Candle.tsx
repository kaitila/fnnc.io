export interface CandleOHLC {
	open: number;
	high: number;
	low: number;
	close: number;
	timestamp: number;
}

export interface CandleProps {
	className?: string | undefined;
	data: CandleOHLC;
	chartHeight: number;
}

export const Candle = ({ className, data, chartHeight }: CandleProps) => {
	const positive = data.open < data.close;
	return (
		<div
			style={{ height: `${chartHeight}rem` }}
			className="flex flex-col flex-nowrap col-span-1"
		>
			{positive ? (
				<>
					<div
						className="w-full"
						style={{ height: `${100 - data.close}%` }}
					></div>
					<div
						className="w-full rounded-md bg-open"
						style={{ height: `${data.close - data.open}%` }}
					></div>
				</>
			) : (
				<>
					<div
						className="w-full"
						style={{ height: `${100 - data.open}%` }}
					></div>
					<div
						className="w-full rounded-md bg-closed"
						style={{ height: `${data.open - data.close}%` }}
					></div>
				</>
			)}
		</div>
	);
};
