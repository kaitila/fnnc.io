/* 'use client'; */

import { SignUpForm } from "@/components/auth/SignUpForm";
import { Logo } from "@/components/Logo";
import { LogoVisual } from "@/components/LogoVisual";
import { StockCard } from "@/components/stocks/card/StockCard";
import Link from "next/link";

const SignUpPage = () => {
	return (
		<div
			className="
            flex max-w-224 min-h-screen justify-center items-center mx-auto p-6 pt-20
            md:p-6 md:justify-between
        "
		>
			<Link href="/">
				<Logo
					className="
                    absolute hidden
                    md:block md:-translate-x-0 md:left-8 md:top-6 md:text-6xl
                "
				/>
			</Link>
			<div
				className="
                hidden relative
                md:block
            "
			>
				<StockCard
					ticker="IBM"
					exchange="NYSE"
					countryCode="US"
					status
					className="mt-4 w-max"
					chartWidth={30}
					darkMode
				/>
				<LogoVisual className="absolute opacity-30 -rotate-90 -z-10 scale-125 top-0 left-0" />
			</div>

			<div className="rounded-2xl shadow-md border-primary border-2 bg-bg relative">
				<Link href="/">
					<Logo
						className="
                        absolute text-5xl -top-16 left-1/2 -translate-x-1/2 
                        md:hidden
                    "
					/>
				</Link>
				<LogoVisual
					className="
                    -bottom-16 -left-16 -z-10 opacity-30 absolute
                    md:hidden
                "
				/>
				<SignUpForm />
			</div>
		</div>
	);
};

export default SignUpPage;
