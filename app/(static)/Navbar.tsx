'use client';

import { Logo } from "@/components/Logo";
import { LogoVisual, LogoVisualSmall } from "@/components/LogoVisual";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar = ({ className }: { className?: string }) => {
    const [ hasScrolled, setHasScrolled ] = useState(false);
    const [ buttonSize, setButtonSize ] = useState<'base' | 'lg'>('lg');
    const [ open, setOpen ] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setHasScrolled(true);
            setButtonSize('base');
            return;
        }
        
        setHasScrolled(false);
        setButtonSize('lg');
    }

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setOpen(false);
        }
    }

    useEffect(() => {
        handleScroll();
        handleResize();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const transition = 'transition-all duration-500 ease-out';

    return (
        <nav className={`
            bg-bg top-0 fixed w-screen z-10 min-w-max h-20 flex justify-center items-center  
            ${hasScrolled ? `shadow-md` : ``} ${transition}
        `}>
            <div className="
                w-full px-6
                flex justify-between items-center
                md:min-w-192 md:w-full md:max-w-240 md:px-12s 
            ">
                <Link href="/">
                    <Logo className={`${open ? 'opacity-0' : 'opacity-100'} ${hasScrolled ? `text-4xl` : `text-4xl md:text-6xl`} ${transition}`}/>
                </Link>
                <div className={`
                    hidden
                    md:flex md:gap-2 md:w-max
                `}>
                    <Link href={'/sign-up'}>
                        <PrimaryButton size={buttonSize} className={transition}>Get started</PrimaryButton>
                    </Link>
                    <Link href={'/sign-in'}>
                        <SecondaryButton size={buttonSize} className={transition}>Sign in</SecondaryButton>
                    </Link>
                </div>
                <div className="md:hidden h-full flex items-center">
                    <button onClick={() => setOpen(true)}>
                        <RxHamburgerMenu className="text-4xl"/>
                    </button>
                </div>
            </div>
            <div className={`
                    absolute h-screen top-0 bg-bg z-30 transition-all duration-500 ease-out
                    border-l-2 border-primary
                    ${open ? 'w-80 right-0' : '-right-128'}
                    md:hidden
            `}>
                <div className="flex justify-between flex-col p-8 gap-4 h-full">
                    <Logo className="text-5xl mb-4"/>
                    <div className="">
                        <div className="flex flex-col gap-4 items-center mb-4">
                            <Link href={'/sign-up'} className="w-full">
                                <PrimaryButton size="lg" className="min-w-full">Get started</PrimaryButton>
                            </Link>
                            <Link href={'/sign-in'} className="w-full">
                                <SecondaryButton size="lg" className="min-w-full">Sign in</SecondaryButton>
                            </Link>
                        </div>
                        <LogoVisualSmall className="opacity-60"/>
                    </div>
                </div>
                <button onClick={() => setOpen(false)}
                    className="absolute right-4 top-4"    
                >
                    <IoCloseCircleOutline className="text-5xl text-light hover:text-text"/>
                </button>
            </div>
            <div className={`
                absolute z-20 h-screen w-screen bg-black opacity-30 top-0 left-0 
                ${open ? '' : 'hidden'}
                md:hidden
                `}
                onClick={() => setOpen(false)}
            ></div>
        </nav>
    )

}