export const mockTickets = [
    {
        id: "1",
        title: "Implement user profile image upload functionality",
        description:
            "As a user, I want to be able to upload and update my profile picture so that I can personalize my account.",
        assignedTo: [
            { id: "f70e24e7-438b-42ae-8458-14e8e058dd9a", name: "Kevin Bueno" },
            { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
        ],
        priority: 3,
        createdAt: "2023-03-01T00:00:00.000Z",
        updatedAt: "2023-03-01T00:00:00.000Z",
        comments: [
            {
                id: "1",
                content: "This is a comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },
            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },

            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "f70e24e7-438b-42ae-8458-14e8e058dd9a", name: "Kevin Bueno" },
                isMine: true,
            },
        ],
    },
    {
        id: "2",
        title: "Optimize database queries for product search",
        description:
            "The product search feature is running slowly. Investigate and optimize the database queries to improve search performance.",
        assignedTo: [],
        createdAt: "2023-03-01T00:00:00.000Z",
        updatedAt: "2023-03-01T00:00:00.000Z",
        priority: 7,
    },
    {
        id: "3",
        title: "Create mobile-responsive design for checkout page",
        description:
            "The checkout page needs to be redesigned to work seamlessly on mobile devices. Implement a responsive layout that adapts to different screen sizes.",
        assignedTo: [{ id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" }],
        priority: 1,
        comments: [
            {
                id: "1",
                content: "This is a comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },
            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },

            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "f70e24e7-438b-42ae-8458-14e8e058dd9a", name: "Kevin Bueno" },
                isMine: true,
            },
        ],
    },

    {
        id: "4",
        title: "Fix bug: Cart items disappearing after session timeout",
        description:
            "Users have reported that items in their shopping cart are disappearing when their session times out. Investigate and fix this issue to prevent loss of cart contents.",
        priority: 10,
        createdAt: "2023-03-01T00:00:00.000Z",
        updatedAt: "2023-03-01T00:00:00.000Z",
        assignedTo: [
            { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            { id: "f70e24e7-438b-42ae-8458-14e8e058dd9a", name: "Kevin Bueno" },
            { id: "dfb0322f-a05f-4b74-b7ec-4674f39ce96a", name: "Bibi Leon" },
        ],
        comments: [
            {
                id: "1",
                content: "This is a comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },
            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },

            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "f70e24e7-438b-42ae-8458-14e8e058dd9a", name: "Kevin Bueno" },
                isMine: true,
            },
        ],
    },
    {
        id: "5",
        title: "Implement two-factor authentication",
        createdAt: "2023-03-01T00:00:00.000Z",
        updatedAt: "2023-03-01T00:00:00.000Z",
        description:
            "Enhance account security by implementing a two-factor authentication system using SMS or authenticator apps.",
        priority: 0,
        assignedTo: [{ id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" }],
        comments: [
            {
                id: "1",
                content: "This is a comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },
            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5", name: "John Doe" },
            },

            {
                id: "2",
                content: "This is another comment",
                createdAt: "2023-03-01T00:00:00.000Z",
                updatedAt: "2023-03-01T00:00:00.000Z",
                author: { id: "f70e24e7-438b-42ae-8458-14e8e058dd9a", name: "Kevin Bueno" },
                isMine: true,
            },
        ],
    },
];

export const mockUsers = [
    {
        id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5",
        name: "John Doe",
        img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
        id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        name: "Kevin Bueno",
        img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    {
        id: "dfb0322f-a05f-4b74-b7ec-4674f39ce96a",
        name: "Bibi Leon",
        img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
];
