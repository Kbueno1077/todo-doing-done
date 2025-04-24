import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email } = await request.json();

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
        const { data, error } = await supabase.auth.admin.listUsers();
        const user = data.users.find((user) => {
            return user.email === email;
        });

        if (error) throw error;

        if (!user) {
            return NextResponse.json(
                { data: "User not found" },
                { status: 404 }
            );
        }

        // Return the first (and should be only) user found
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
