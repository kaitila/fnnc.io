import { IoMdArrowDropup } from "react-icons/io";

const CompanyPage = async ({
    params: {
        ticker,
        }
    }: {
        params: {
            ticker: string,
    }
}) => {

    const name = 'Apple Inc';

    return (
        <main>
            <header>
                <div className="
                    mt-40 mx-auto flex justify-between 
                    md:max-w-240 md:min-w-192 md:px-16 md:gap-4
                ">
                    <div>
                        <h1 className="
                            font-bold
                            md:text-5xl md:mb-4
                        ">
                            {name}
                        </h1>
                        <h3 className="
                            font-semibold text-light
                            md:text-3xl
                        ">
                            {ticker}
                        </h3>
                    </div>
                    <div>
                        <h2 className="
                            font-semibold 
                            md:text-4xl md:mb-2
                        ">
                            193<span className="text-light md:text-3xl">.25</span>
                        </h2>
                        <h3 className="
                            font-semibold text-open
                            md:text-2xl
                        "><IoMdArrowDropup className="inline"/>0.89%</h3>
                    </div>
                </div>
            </header>
            <section>{ticker}</section>
        </main>
    );
}

export default CompanyPage;