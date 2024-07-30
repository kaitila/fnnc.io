export interface CompanyErrorProps {
	className?: string | undefined;
	message: string;
}

export const CompanyError = ({ className, message }: CompanyErrorProps) => {
	return (
		<div
			className={`p-4 rounded-xl border-2 w-max h-max border-closed bg-stone-50 ${className}`}
		>
			<h1 className="text-3xl font-bold text-closed">Error: {message}</h1>
		</div>
	);
};
