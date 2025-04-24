import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import React from "react";

function FutureFeatures() {
    return (
        <section className="py-12 md:py-24 lg:py-32 ">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Future Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Attachments"
                        description="Easily add and manage files directly to your tasks. Share documents, images, and more with your team."
                        icon="📎"
                    />
                    <FeatureCard
                        title="Labels and Tags"
                        description="Organize and categorize your tasks with customizable labels and tags for improved task management."
                        icon="🏷️"
                    />
                    <FeatureCard
                        title="Due Dates"
                        description="Set and track deadlines for your tasks. Receive notifications and stay on top of your project timelines."
                        icon="📅"
                    />
                    <FeatureCard
                        title="Time Tracking"
                        description="Built-in time tracking for tasks to help you understand where your team's time is being spent."
                        icon="⏱️"
                    />
                    <FeatureCard
                        title="Activity Log"
                        description="Keep a detailed history of all actions and changes made to your boards and tasks for better transparency."
                        icon="📜"
                    />
                    <FeatureCard
                        title="Custom Themes"
                        description="Personalize your workspace with custom color schemes and themes to match your style or brand."
                        icon="🎨"
                    />

                    {/* <FeatureCard
                        title="AI-Powered Task Suggestions"
                        description="Implement machine learning algorithms to provide intelligent task recommendations based on your team's workflow patterns."
                        icon="🤖"
                    />
                    <FeatureCard
                        title="Advanced Analytics Dashboard"
                        description="Gain deeper insights into your team's productivity with comprehensive charts, graphs, and customizable reports."
                        icon="📊"
                    />
                    <FeatureCard
                        title="Integrations Ecosystem"
                        description="Connect with your favorite tools seamlessly. Upcoming integrations include Slack, GitHub, and Trello."
                        icon="🔗"
                    />
                    <FeatureCard
                        title="Mobile App"
                        description="Stay connected on-the-go with our upcoming iOS and Android applications."
                        icon="📱"
                    />
                    <FeatureCard
                        title="Custom Workflows"
                        description="Create and save custom board layouts and workflows tailored to your team's unique processes."
                        icon="🔧"
                    /> */}
                </div>
            </div>
        </section>
    );
}

export default FutureFeatures;

function FeatureCard({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: string;
}) {
    return (
        <IpadCursorBlockWrapper type="text">
            <div className="bg-base-200 p-6 rounded-lg shadow-lg h-full flex flex-col">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-base-content/70 flex-grow">{description}</p>
            </div>
        </IpadCursorBlockWrapper>
    );
}
