import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from("Tickets")
            .update({ description: "Map Description 1" })
            .eq("id", "b2755a5b-a90e-4211-b791-b2c59fb7b982")
            .select();

        const { data: data2, error: error2 } = await supabase
            .from("Tickets")
            .update({ description: "Map Description" })
            .eq("id", "b2755a5b-a90e-4211-b791-b2c59fb7b982")
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
