import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import {
    IconBrandZapier,
    IconCheck,
    IconLayout2,
    IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

function Home() {
    return (
        <div className="flex flex-col">
            <main className="">
                <section>
                    <BackgroundBeamsWithCollision>
                        <div className="px-10">
                            <div className="max-w-lg">
                                <IpadCursorBlockWrapper type="text">
                                    <div className="mockup-code p-10 w-max bg-primary text-primary-content text-center">
                                        <pre>
                                            <code>
                                                <h1 className="text-7xl font-bold">
                                                    Welcome to
                                                </h1>
                                                <h2 className="text-5xl font-bold">
                                                    <span className="">
                                                        Todo
                                                    </span>
                                                    <span> - </span>
                                                    <span className="">
                                                        Doing
                                                    </span>
                                                    <span> - </span>
                                                    <span className="">
                                                        Done
                                                    </span>
                                                </h2>
                                            </code>
                                        </pre>
                                    </div>

                                    <p className="py-6 text-2xl">
                                        Streamline your workflow with our
                                        intuitive board. Organize, collaborate,
                                        and boost productivity.
                                    </p>
                                </IpadCursorBlockWrapper>

                                <div className="flex  gap-4 ">
                                    <IpadCursorBlockWrapper>
                                        <button className="btn btn-primary">
                                            Try Out Demo
                                        </button>
                                    </IpadCursorBlockWrapper>

                                    <IpadCursorBlockWrapper>
                                        <button className="btn btn-outline">
                                            Learn More
                                        </button>
                                    </IpadCursorBlockWrapper>
                                </div>
                            </div>
                        </div>
                    </BackgroundBeamsWithCollision>
                </section>

                <section className="bg-base-200 py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        <IconLayout2 className="h-6 w-6" />
                                        Intuitive Board Layout
                                    </h2>
                                    <p>
                                        Easily visualize your workflow with our
                                        drag-and-drop interface. Organize tasks
                                        into columns and move them as they
                                        progress.
                                    </p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        <IconUsers className="h-6 w-6" />
                                        Team Collaboration
                                    </h2>
                                    <p>
                                        Work together seamlessly. Assign tasks,
                                        mention team members, and keep everyone
                                        in the loop with real-time updates.
                                    </p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        <IconCheck className="h-6 w-6" />
                                        Progress Tracking
                                    </h2>
                                    <p>
                                        Monitor project progress at a glance.
                                        Use labels, due dates, and custom fields
                                        to keep track of important details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="flex">
                                <ul className="steps steps-vertical">
                                    <li className="step step-primary py-8"></li>
                                    <li className="step step-primary "></li>
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
                                                Set up your project board in
                                                minutes. Customize columns to
                                                match your workflow.
                                            </p>
                                        </div>

                                        <div className="mt-10">
                                            <h3 className="text-2xl font-bold">
                                                2. Add and Organize Tasks
                                            </h3>
                                            <p className="text-base-content">
                                                Create cards for each task, add
                                                descriptions, assign priorities
                                                and team members.
                                            </p>
                                        </div>

                                        <div className="mt-10">
                                            <h3 className="text-2xl font-bold">
                                                3. Collaborate and Track
                                                Progress
                                            </h3>
                                            <p className="text-base-content">
                                                Work together with your team,
                                                move cards across columns, and
                                                watch your project come to life.
                                            </p>
                                        </div>

                                        <div className="mt-10">
                                            <h3 className="text-2xl font-bold">
                                                4. Collaborate and Track
                                                Progress
                                            </h3>
                                            <p className="text-base-content">
                                                Work together with your team,
                                                move cards across columns, and
                                                watch your project come to life.
                                            </p>
                                        </div>
                                    </div>
                                </IpadCursorBlockWrapper>
                            </div>

                            <div className="flex justify-center">
                                <img
                                    alt="TaskFlow Board"
                                    className="rounded-box object-cover object-center"
                                    height="310"
                                    src="/placeholder.svg?height=310&width=550"
                                    width="550"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
