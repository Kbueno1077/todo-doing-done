import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";

function Features() {
    return (
        <section className="bg-base-200 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <IpadCursorBlockWrapper type="text">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Key Features
                    </h2>

                    <InfiniteMovingCards direction="right" speed="normal" />
                </IpadCursorBlockWrapper>
            </div>
        </section>
    );
}

export default Features;
