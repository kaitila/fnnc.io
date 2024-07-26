import { Logo } from "@/components/Logo";
import { DashboardNav } from "./DashboardNav";

import '@/app/globals.css';

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
            <main>
                {children}
            </main>
        </>
        
    );
}

