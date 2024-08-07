export const mockTickets = [
    {
        id: "1",
        title: "Implement user profile image upload functionality",
        description:
            "As a user, I want to be able to upload and update my profile picture so that I can personalize my account.",
        assignedTo: [
            { id: 1, name: "Kevin Bueno" },
            { id: 2, name: "John Doe" },
        ],
        priority: 3,
        footer: {},
    },
    {
        id: "2",
        title: "Optimize database queries for product search",
        description:
            "The product search feature is running slowly. Investigate and optimize the database queries to improve search performance.",
        assignedTo: [],
        priority: 7,
        footer: {},
    },
    {
        id: "3",
        title: "Create mobile-responsive design for checkout page",
        description:
            "The checkout page needs to be redesigned to work seamlessly on mobile devices. Implement a responsive layout that adapts to different screen sizes.",
        assignedTo: [{ id: 1, name: "John Doe" }],
        priority: 1,
        footer: {},
    },

    {
        id: "4",
        title: "Fix bug: Cart items disappearing after session timeout",
        description:
            "Users have reported that items in their shopping cart are disappearing when their session times out. Investigate and fix this issue to prevent loss of cart contents.",
        priority: 10,
        assignedTo: [
            { id: 1, name: "John Doe" },
            { id: 2, name: "John Doe" },
            { id: 3, name: "John Doe" },
        ],
        footer: {},
    },
    {
        id: "5",
        title: "Implement two-factor authentication",
        description:
            "Enhance account security by implementing a two-factor authentication system using SMS or authenticator apps.",
        priority: 0,
        assignedTo: [{ id: 3, name: "John Doe" }],
        footer: {},
    },
];
