import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Link from "next/link";

function Hero() {
    return (
        <BackgroundGradientAnimation>
            <section>
                <div
                    className="px-5 overflow-x-hidden sm:px-10 absolute bottom-[50px] md:bottom-[80px] left-0"
                    style={{ zIndex: 1000 }}
                >
                    <div className="max-w-lg">
                        <IpadCursorBlockWrapper
                            type="text"
                            className="flex gap-2"
                        >
                            <p className="py-6 text-2xl sm:text-4xl">
                                Streamline your workflow with our intuitive
                                board. Organize, collaborate, and boost
                                productivity.
                            </p>
                        </IpadCursorBlockWrapper>

                        <div className="flex gap-4 ">
                            <IpadCursorBlockWrapper>
                                <Link
                                    href="/demo"
                                    className="btn btn-primary sm:btn-lg"
                                >
                                    Try Out Demo
                                </Link>
                            </IpadCursorBlockWrapper>

                            <IpadCursorBlockWrapper>
                                <Link
                                    href="/#disclaimer"
                                    className="btn btn-outline sm:btn-lg"
                                >
                                    Learn More
                                </Link>
                            </IpadCursorBlockWrapper>
                        </div>
                    </div>
                </div>
            </section>
        </BackgroundGradientAnimation>
    );
}

export default Hero;
