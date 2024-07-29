export interface CompanyErrorProps {
	className?: string | undefined;
}

export const CompanyError = ({ className }: CompanyErrorProps) => {
	return (
		<div
			className={`p-4 rounded-xl border-2 border-closed bg-stone-50 ${className}`}
		>
			<h1 className="text-3xl font-bold text-closed">
				Error: Company not found!
			</h1>
		</div>
	);
};
