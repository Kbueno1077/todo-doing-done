import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { LinkPreview } from "@/components/ui/link-preview";
import React from "react";

function Disclaimer() {
    return (
        <section
            id="disclaimer"
            className="bg-base-200 py-12 md:py-24 lg:py-32"
        >
            <IpadCursorBlockWrapper type="text">
                <div className="container mx-auto">
                    <div className="container mx-auto px-6 md:px-6 ">
                        <h2 className="text-3xl  font-bold text-center ">
                            Disclaimer
                        </h2>

                        <p className="mt-8 text-xl sm:text-2xl">
                            This demonstration showcases the innovative
                            possibilities that can be achieved through creative
                            side projects. It serves as a platform to experiment
                            with new technologies and methodologies,
                            illustrating various approaches to executing ideas.
                            Please note that this is not intended for consumer
                            use and does not include any monetization features.
                            While the application is functional, user creation
                            is currently disabled in this demo version.
                        </p>

                        <p className="mt-8 text-xl sm:text-2xl">
                            You can check the source code at:{" "}
                            <LinkPreview
                                url="https://github.com/Kbueno1077/todo-doing-done"
                                quality={100}
                            >
                                [Source Code]
                            </LinkPreview>
                        </p>
                    </div>
                </div>
            </IpadCursorBlockWrapper>
        </section>
    );
}

export default Disclaimer;
