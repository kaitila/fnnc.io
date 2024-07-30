import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export interface PriceProps {
	className?: string | undefined;
	price: number;
	changeP: number;
	size?: "sm" | "base" | "lg";
}

const viewStyles = {
	base: {
		h2: "text-3xl",
		h3: "text-lg",
		gap: "mb-0",
	},
	sm: {
		h2: "text-2xl",
		h3: "text-base",
		gap: "mb-0",
	},
	lg: {
		h2: "text-4xl",
		h3: "text-xl",
		gap: "mb-1",
	},
	xl: {
		h2: "text-4xl",
		h3: "text-2xl",
		gap: "mb-2",
	},
};

export const PriceView = ({
	className,
	price,
	changeP,
	size = "base",
}: PriceProps) => {
	const positive = changeP > 0;

	const parsedPrice = price.toFixed(2);
	const parsedChangeP = Math.abs(changeP).toFixed(2);

	return (
		<div className={` ${className}`}>
			<h2
				className={`font-semibold ${viewStyles[size].h2} ${viewStyles[size].gap}`}
			>
				{parsedPrice.slice(0, -3)}
				<span className={`text-light ${viewStyles[size].h3}`}>
					{parsedPrice.slice(-3)}
				</span>
			</h2>
			<PriceChange size={size} changeP={changeP} />
		</div>
	);
};

export interface PriceLoadingProps {
	className?: string | undefined;
	size?: "sm" | "base" | "lg";
}

const loadingSizes = {
	sm: {
		h2: "h-8",
		h3: "h-6",
	},
	base: {
		h2: "h-9",
		h3: "h-7",
	},
	lg: {
		h2: "h-10",
		h3: "h-8",
	},
};

export const PriceLoading = ({
	className,
	size = "base",
}: PriceLoadingProps) => {
	return (
		<div className={` ${className}`}>
			<div
				className={`rounded-md loading-animation ${loadingSizes[size].h2} w-16 mb-2`}
			></div>
			<div
				className={`rounded-md loading-animation ${loadingSizes[size].h3} w-16 mb-2`}
			></div>
		</div>
	);
};

export interface PriceChangeProps {
	className?: string | undefined;
	changeP: number;
	size?: "sm" | "base" | "lg" | "xl";
}

export const PriceChange = ({
	className,
	changeP,
	size = "base",
}: PriceChangeProps) => {
	const positive = changeP > 0;
	const parsedChangeP = Math.abs(changeP).toFixed(2);

	return (
		<h3
			className={`${viewStyles[size].h3} font-semibold ${positive ? "text-green-500" : "text-red-500"} text-nowrap ${className}`}
		>
			{positive ? (
				<IoMdArrowDropup className="inline" />
			) : (
				<IoMdArrowDropdown className="inline" />
			)}
			{parsedChangeP}%
		</h3>
	);
};
