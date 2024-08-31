import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const BYPASS_ROUTES = [
    "https://sxfpasuclnlqrljkmjdc.supabase.co/rest/v1/Tickets",
];

export async function middleware(request: NextRequest) {
    const url = request.url;
    console.log("🚀 ~ middleware ~ url:", url);
    const method = request.method;

    // Check if the route should bypass Supabase
    if (url.startsWith(BYPASS_ROUTES[0]) && method === "PATCH") {
        console.log("Bypassed route:", url);
        return NextResponse.json(
            { status: "ok", message: "bypassed" },
            { status: 200 }
        );
    }

    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
