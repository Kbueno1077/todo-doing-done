import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/dashboard");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect(
            "/login?message=Check email to continue sign in process"
        );
    };

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form className="form-control w-full gap-2">
                <IpadCursorBlockWrapper type="text">
                    <label className="label" htmlFor="email">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="input input-bordered w-full"
                        required
                    />
                </IpadCursorBlockWrapper>

                <IpadCursorBlockWrapper type="text">
                    <label className="label" htmlFor="password">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full"
                        required
                    />
                </IpadCursorBlockWrapper>

                <SubmitButton
                    formAction={signIn}
                    className="btn btn-primary mt-6"
                >
                    Log In
                </SubmitButton>

                <SubmitButton
                    formAction={signUp}
                    className="btn btn-outline mt-2"
                >
                    Sign Up
                </SubmitButton>

                {searchParams?.message && (
                    <div className="alert mt-4">
                        <span>{searchParams.message}</span>
                    </div>
                )}
            </form>
        </div>
    );
}
