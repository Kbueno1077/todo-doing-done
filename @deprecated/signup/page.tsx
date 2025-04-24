import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Signup({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const userName = formData.get("userName") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/signup?message=Could not authenticate user");
        }

        if (data.user?.id) {
            const { data: userData, error: userError } = await supabase
                .from("Users")
                .insert({
                    id: data.user.id,
                    name: userName,
                });

            if (userError) {
                return redirect("/signup?message=Could not authenticate user");
            }
        }

        return redirect(
            "/signup?message=Check email to continue sign in process"
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
                    <label className="label" htmlFor="name">
                        <span className="label-text">User Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
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
                    formAction={signUp}
                    className="btn btn-primary mt-6"
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
