import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export default async function POST() {
    // Initialize Supabase client
    const supabase = createClient();

    try {
        // Perform your daily operation here
        const { data, error } = await supabase
            .from("Tickets")
            .update({ status: "Todo" })
            .eq("id", "1acca881-0a73-4889-9555-06ee02e2d61b")
            .select();

        const { data: data2, error: error2 } = await supabase
            .from("Tickets")
            .update({ status: "Done" })
            .eq("id", "1acca881-0a73-4889-9555-06ee02e2d61b")
            .select();

        if (error) throw error;
        if (error2) throw error2;

        return NextResponse.json(
            { success: true, data, data2 },
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
