import { Navbar } from "./Navbar";

export default function StaticLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar className="fixed top-0"/>
    		{children}
		</>	
	);
}
