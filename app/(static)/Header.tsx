import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { StockCard } from "@/components/StockCard";
import { SearchBar } from "@/components/SearchBar";
import { LogoVisual } from "@/components/LogoVisual";

export const Header = () => {
    const titleTransition = 'hover:-translate-y-0.5 duration-500 inline-block transition-all ease-out';

    return (
        <header className="flex items-center mt-20 md:justify-center overflow-x-hidden overflow-y-clip min-h-screen">
			<div className="
				flex flex-col items-center px-6 w-full
				md:block md:min-w-192 md:max-w-240 md:px-16
				"
			>
				<div className="w-full max-w-128">
					<h1 className="
						font-medium mb-1 select-none text-4xl
						md:text-5xl	
					">
						<span className={`font-bold ${titleTransition}`}>Real time<span className="text-primary inline-block">*</span></span> <span className={titleTransition}>stock</span> <span className={titleTransition}>data</span> <span className={titleTransition}>at</span> <span className={titleTransition}>your</span> <span className={titleTransition}>fingertips.</span>
					</h1>
					
					<div className="w-max relative after:w-0 hover:after:w-full after:h-0.25 after:bg-light after:content-[''] after:absolute hover:after:left-0 after:left-1/2 after:bottom-0.5 after:transition-all ">
						<Link href="#read-more" className="text-base text-light">Read more</Link>
						<IoIosArrowForward className="inline text-light text-sm" />
					</div>
				</div>
				<div className="
					w-full h-144
					md:flex md:justify-between md:w-full md:gap-16 relative
				">
					<StockCard ticker="IBM" exchange="NYSE" countryCode="US" status className="mt-4" chartWidth={30} darkMode/>

					<SearchBar className="mt-16 mx-auto md:m-0 max-w-96 min-w-48" sqHeight={16}/>
					<LogoVisual className="scale-100 absolute opacity-50 -rotate-90 -z-10 -top-12 left-8 
						md:top-0 md:-left-2 md:scale-125"
					/>
				</div>
			</div>
		</header>
    );
}