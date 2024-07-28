'use client';

import { sleep } from "@/utils";
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

export interface DashboardNavProps {
    className?: string | undefined,
}

export const DashboardNav = ({
    className,
}: DashboardNavProps) => {
    return (
        <nav className={` ${ className }`}>
            <div className="
                flex justify-between items-center mb-10
                md:max-w-192 md:rounded-xl md:py-3 md:px-16 md:shadow-sm md:w-full md:mx-auto md:mt-10 md:border md:border-lighter md:h-16
            ">
                <NavLink href="/dashboard" className="">Home</NavLink>
                <NavLink href="/dashboard/explore" className="">Explore</NavLink>
                <NavLink href="/dashboard/watchlists" className="">Watchlists</NavLink>

            </div>
        </nav>
    )
}

interface NavLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

const activeStyle = 'border-primary rounded-lg text-primary';

const NavLink = ({
    href,
    children,
    className,
    ...props
}: NavLinkProps) => {
    const [ active, setActive ] = useState(false);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (path === href) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [path]);

    const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const main = document.querySelector('main');
        main?.classList.add('page-transition');

        await sleep(250);
        router.push(href);
        await sleep(500);

        main?.classList.remove('page-transition');
    }

    return (
        <Link
            className={`
                text-lg font-semibold relative py-1 px-3 transition-all duration-300 ease-in-out border-2 
                ${active ? activeStyle : `
                    border-transparent
                    after:content-[''] after:bg-primary after:h-0.5 after:absolute after:left-1/2 after:transition-all after:bottom-0.25 after:w-0 after:rounded-xs 
                    hover:after:w-full hover:after:left-0
                `}
                ${className}
            `}
            onClick={handleClick}
            href={href} {...props}>
            {children}
        </Link>
    );
}