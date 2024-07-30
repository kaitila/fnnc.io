import { createClient } from "@/utils/supabase/server";
import { Recents } from "./Recents";

export default async function DashboardHomePage() {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("profiles")
		.select("first_name");
	const searchData = (await supabase.from("searches").select("ticker")).data;

	let recents: any[] = [];
	if (searchData) {
		recents = searchData.reverse().slice(0, 5);
	}

	let name = "";
	if (data) {
		name = data[0].first_name;
	}

	return (
		<div
			className="
            mx-auto mb-6
            md:max-w-240 md:min-w-192 md:px-16 
        "
		>
			<h1 className="text-5xl font-bold leading-normal mb-4">
				Welcome back {name}
				<span className="text-primary">.</span>
			</h1>
			<Recents recents={recents} />
		</div>
	);
}
