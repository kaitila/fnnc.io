import { createClient } from "@/utils/supabase/server";

export default async function DashboardHomePage() {
    const supabase = createClient();

    const { data, error } = await supabase.from('profiles').select('first_name');

    let name = '';
    if (data) {
        name = data[0].first_name;
    }

    return (
        <div className="
            mx-auto
            md:max-w-240 md:min-w-192 md:px-16 
        ">
            <h1 className="text-5xl font-bold leading-normal">
                Welcome back {name}<span className="text-primary">.</span>
            </h1>
        </div>
    );
}
