import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const UserPage = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      redirect('/login')
    }

    const user = (await supabase.from('profiles').select('*')).data;
    console.log(user);

    return (
        <main >
            <p className="mt-20">Signed in as: {data.user.email}</p>
        </main>
    );
}

export default UserPage;