import TicketsDashboard from "@/sections/TicketsDashboard/TicketsDashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <div className="py-4 font-bold bg-primary/40 text-center">
                    This is a protected page that you can only see as an
                    authenticated user
                </div>

                <main className="flex-1 flex flex-col gap-6 px-6 py-6">
                    <TicketsDashboard />
                </main>
            </div>
        </div>
    );
}
