import { Header } from "./Header";
import { StockChart } from "./StockChart";

const CompanyPage = async ({
	params: { ticker },
}: {
	params: {
		ticker: string;
	};
}) => {
	return (
		<div className="mt-6 max-w-192 mx-auto">
			<Header ticker={ticker} className="mb-6" />
			<section>
				<StockChart ticker={ticker} />
			</section>
		</div>
	);
};

export default CompanyPage;
