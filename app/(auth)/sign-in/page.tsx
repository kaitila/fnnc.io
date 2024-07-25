import { SignInForm } from "@/components/auth/SignInForm";
import { Logo } from "@/components/Logo";
import { LogoVisual } from "@/components/LogoVisual";
import { StockCard } from "@/components/StockCard";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="
            flex items-center min-h-screen mx-auto max-w-80 p-6 pt-20
            md:max-w-96
        ">
            <div className="
                relative w-80 rounded-2xl shadow-md border-primary border-2 bg-bg
                md:w-96
            ">
                <Link href="/">
                    <Logo className="
                        text-5xl absolute left-1/2 -translate-x-1/2 -top-16 
                        md:text-6xl md:!-top-20
                    "/>
                </Link>
                <SignInForm />
                <LogoVisual className="absolute -left-16 -bottom-8 opacity-30 -z-10 scale-125"/>
            </div>
        </div>
    );
}

export default SignInPage;