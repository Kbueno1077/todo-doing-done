import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import React from "react";

function Steps() {
    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex">
                        <ul className="steps steps-vertical w-[150px] sm:w-auto">
                            <li className="step step-primary py-8"></li>
                            <li className="step step-primary"></li>
                            <li className="step"></li>
                            <li className="step"></li>
                        </ul>

                        <IpadCursorBlockWrapper type="text">
                            <div className="space-y-10 mt-8">
                                <div className="mt-1">
                                    <h3 className="text-2xl font-bold ">
                                        1. Create Your Board
                                    </h3>
                                    <p className="text-base-content">
                                        Set up your project board in minutes.
                                        Customize columns to match your
                                        workflow.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-2xl font-bold">
                                        2. Add and Organize Tasks
                                    </h3>
                                    <p className="text-base-content">
                                        Create cards for each task, add
                                        descriptions, assign priorities and team
                                        members, comment on them ...etc
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-2xl font-bold">
                                        3. Collaborate and Track Progress
                                    </h3>
                                    <p className="text-base-content">
                                        Work together with your team, move cards
                                        across columns, and watch your project
                                        come to life.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-2xl font-bold">
                                        4. Review and Reflect
                                    </h3>
                                    <p className="text-base-content">
                                        Analyze your team's performance, gather
                                        feedback, and identify areas for
                                        improvement to enhance future projects.
                                    </p>
                                </div>
                            </div>
                        </IpadCursorBlockWrapper>
                    </div>

                    <div className="flex justify-center">
                        {/* <img
                            alt="TaskFlow Board"
                            className="rounded-box object-cover object-center"
                            height="310"
                            src="/placeholder.svg?height=310&width=550"
                            width="550"
                        /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Steps;
