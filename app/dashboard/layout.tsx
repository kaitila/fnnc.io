import { Logo } from "@/components/Logo";
import { DashboardNav } from "./DashboardNav";

import '@/app/globals.css';
import { SearchBar } from "@/components/SearchBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <>
            <Logo className="
                absolute left-4 top-4 text-4xl
            "/>
            <DashboardNav />
            <SearchBar className="mx-auto -mt-4 mb-4 max-w-144" sqHeight={24}/>
            <main>
                {children}
            </main>
        </>
        
    );
}

