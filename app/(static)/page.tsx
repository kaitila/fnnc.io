import { ticker } from "@/polygon_api/ticker";
import { Header } from "./Header";
import { ReadMore } from "./ReadMore";

export default async function Home() {

	return (
		<main className="min-h-screen h-screen">
			<Header />
			<ReadMore />
			<footer className="min-h-screen">
				<p>footer</p>
			</footer>
    		
    	</main>
	);
}

/* underline underline-offset-2 */