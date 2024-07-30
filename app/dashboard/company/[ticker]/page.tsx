import { Suspense } from "react";
import { Header, HeaderLoading } from "./Header";
import { StockChart } from "@/components/stocks/chart/StockChart";

const CompanyPage = async ({
	params: { ticker },
}: {
	params: {
		ticker: string;
	};
}) => {
	return (
		<div className="mt-6 max-w-192 mx-auto">
			<Suspense fallback={<HeaderLoading />}>
				<Header ticker={ticker} className="mb-6" />
			</Suspense>
			<section>
				<StockChart ticker={ticker} />
			</section>
		</div>
	);
};

export default CompanyPage;
