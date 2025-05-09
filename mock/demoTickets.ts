export const mockTickets = [
  {
    id: "91157c91-a07c-4ad4-9731-e53c8d0a755d",
    created_at: "2024-08-09T16:54:36.664699+00:00",
    updated_at: "2024-08-31T12:54:22.622356+00:00",
    title: "Implement two-factor authentication",
    description:
      "Enhance account security by implementing a two-factor authentication system using SMS or authenticator apps.",
    priority: 0,
    status: "Done",
    board_id: "ea21517a-c745-4e84-844e-e8257cb6750b",
    isActive: true,
    AssignedToTickets: [
      {
        id: "ac8601e2-d4ae-4cf0-a48c-1707757d0fa3",
        Users: {
          id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5",
          img: "",
          name: "John Doe",
          created_at: "2024-08-09T16:56:01.773162+00:00",
          updated_at: "2024-08-09T16:56:01.773162+00:00",
        },
        user_id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5",
        ticket_id: "91157c91-a07c-4ad4-9731-e53c8d0a755d",
        created_at: "2024-08-09T16:56:26.683504+00:00",
        updated_at: "2024-08-09T16:56:26.683504+00:00",
      },
      {
        id: "4218a928-5723-4130-8ea8-6cf75294eb66",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "91157c91-a07c-4ad4-9731-e53c8d0a755d",
        created_at: "2024-08-09T16:58:47.124635+00:00",
        updated_at: "2024-08-09T16:58:47.124635+00:00",
      },
    ],
  },
  {
    id: "486be73c-f626-4095-841e-ec6957672c55",
    created_at: "2024-08-09T17:06:15.043777+00:00",
    updated_at: "2024-08-31T14:18:17.431029+00:00",
    title: "Create mobile-responsive design for checkout page",
    description:
      "The checkout page needs to be redesigned to work seamlessly on mobile devices. Implement a responsive layout that adapts to different screen sizes.",
    priority: 5,
    status: "Doing",
    board_id: "ea21517a-c745-4e84-844e-e8257cb6750b",
    isActive: true,
    AssignedToTickets: [],
  },
  {
    id: "72f11a42-4097-4c0b-991b-2e2591c2d08f",
    created_at: "2024-08-09T00:50:13.999303+00:00",
    updated_at: "2024-09-01T23:40:42.790709+00:00",
    title: "Optimize database queries for product search",
    description:
      "The product search feature is running slowly. Investigate and optimize the database queries to improve search performance.",
    priority: 8,
    status: "Doing",
    board_id: "ea21517a-c745-4e84-844e-e8257cb6750b",
    isActive: true,
    AssignedToTickets: [
      {
        id: "69d03035-b4e9-4214-ac11-3549078ecfe0",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "72f11a42-4097-4c0b-991b-2e2591c2d08f",
        created_at: "2024-08-09T16:56:19.111745+00:00",
        updated_at: "2024-08-09T16:56:19.111745+00:00",
      },
    ],
  },
  {
    id: "4ae1c12d-b30d-45d2-ae7f-287197c9811d",
    created_at: "2024-08-09T17:05:48.558671+00:00",
    updated_at: "2024-08-31T02:28:47.559632+00:00",
    title: "Fix bug: Cart items disappearing after session timeout",
    description:
      "Users have reported that items in their shopping cart are disappearing when their session times out. Investigate and fix this issue to prevent loss of cart contents.",
    priority: 7,
    status: "Todo",
    board_id: "ea21517a-c745-4e84-844e-e8257cb6750b",
    isActive: true,
    AssignedToTickets: [
      {
        id: "8a448b22-9863-4692-9258-f2eb0a481d30",
        Users: {
          id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5",
          img: "",
          name: "John Doe",
          created_at: "2024-08-09T16:56:01.773162+00:00",
          updated_at: "2024-08-09T16:56:01.773162+00:00",
        },
        user_id: "91de3176-ae5a-492d-a6d5-bfeb328e4bd5",
        ticket_id: "4ae1c12d-b30d-45d2-ae7f-287197c9811d",
        created_at: "2024-08-24T12:57:54.387597+00:00",
        updated_at: "2024-08-24T12:57:54.387597+00:00",
      },
    ],
  },
  {
    id: "f9de34f0-5039-45b1-80fd-4411b1007a3a",
    created_at: "2024-08-09T17:05:06.934607+00:00",
    updated_at: "2024-08-31T02:30:07.307487+00:00",
    title: "Implement user profile image upload functionality",
    description:
      "As a user, I want to be able to upload and update my profile picture so that I can personalize my account.",
    priority: 2,
    status: "Doing",
    board_id: "ea21517a-c745-4e84-844e-e8257cb6750b",
    isActive: true,
    AssignedToTickets: [
      {
        id: "89188c7e-89be-4334-a9cf-2764e6ad79a2",
        Users: {
          id: "dfb0322f-a05f-4b74-b7ec-4674f39ce96a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/krbueno.JPG",
          name: "Kristen Bueno ",
          created_at: "2024-08-09T17:03:21.067223+00:00",
          updated_at: "2024-08-09T17:03:21.067223+00:00",
        },
        user_id: "dfb0322f-a05f-4b74-b7ec-4674f39ce96a",
        ticket_id: "f9de34f0-5039-45b1-80fd-4411b1007a3a",
        created_at: "2024-08-28T17:00:44.853152+00:00",
        updated_at: "2024-08-28T17:00:44.853152+00:00",
      },
      {
        id: "569da44f-9369-46bf-b857-217cf7dcd702",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "f9de34f0-5039-45b1-80fd-4411b1007a3a",
        created_at: "2024-08-28T17:00:44.853152+00:00",
        updated_at: "2024-08-28T17:00:44.853152+00:00",
      },
    ],
  },
  {
    id: "a3c82fe1-f4b9-488b-8f92-e0e96e458beb",
    created_at: "2024-08-15T16:06:30.914309+00:00",
    updated_at: "2024-08-31T12:54:36.918738+00:00",
    title: "Implement AI Recommendations Panel in AcmeCloud Dashboard",
    description:
      'As part of our new AI-Powered Workspace Optimizer feature, we need to create a dedicated panel in the AcmeCloud dashboard to display AI-generated recommendations for resource optimization and workflow efficiency.\n\nObjective: Design and implement a new UI component that presents AI-generated recommendations in a clear, actionable format for users.\n\nRequirements:\n\nCreate a new "AI Recommendations" panel in the main dashboard view.\n\nDisplay top 3-5 recommendations generated by the AI system.\n\nFor each recommendation, show:\n\nBrief description of the suggested optimization\n\nEstimated cost savings or performance improvement\n\nDifficulty level of implementation (Easy, Medium, Hard)\n\n"Implement" button for one-click application of simple optimizations\n\nInclude a "View All Recommendations" link to access a full list of suggestions.\n\nImplement a refresh button to update recommendations on demand.\n\nEnsure the panel is responsive and works well on both desktop and mobile views.',
    priority: 10,
    status: "Done",
    board_id: "ea21517a-c745-4e84-844e-e8257cb6750b",
    isActive: true,
    AssignedToTickets: [
      {
        id: "f17b8d3e-88aa-4d6c-8c95-210260adc434",
        Users: {
          id: "dfb0322f-a05f-4b74-b7ec-4674f39ce96a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/krbueno.JPG",
          name: "Kristen Bueno ",
          created_at: "2024-08-09T17:03:21.067223+00:00",
          updated_at: "2024-08-09T17:03:21.067223+00:00",
        },
        user_id: "dfb0322f-a05f-4b74-b7ec-4674f39ce96a",
        ticket_id: "a3c82fe1-f4b9-488b-8f92-e0e96e458beb",
        created_at: "2024-08-16T02:57:29.914905+00:00",
        updated_at: "2024-08-16T02:57:29.914905+00:00",
      },
      {
        id: "fa41b031-f811-4bcf-b2e1-9a13ac8656b9",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "a3c82fe1-f4b9-488b-8f92-e0e96e458beb",
        created_at: "2024-08-16T02:57:29.914905+00:00",
        updated_at: "2024-08-16T02:57:29.914905+00:00",
      },
    ],
  },

  {
    id: "74338731-9652-43e3-a490-bfc072ed702d",
    created_at: "2024-08-31T15:45:35.063152+00:00",
    updated_at: "2024-09-01T04:02:54.372357+00:00",
    title: "Labels and Tags for Task Management",
    description:
      "Develop a feature that allows users to organize and categorize their tasks using customizable labels and tags. This enhancement will improve task management by enabling users to filter, sort, and prioritize their tasks more effectively. The feature should include the following functionalities:\n\n- Create, edit, and delete labels and tags.\n- Assign multiple labels and tags to a single task.\n- Filter tasks based on selected labels and tags.\n- Display labels and tags in the task list and task details view.\n- Ensure the feature is responsive and works seamlessly across different devices.",
    priority: 5,
    status: "Todo",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "92b4236b-992e-4a0f-9110-8ddc4db1ab6c",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "74338731-9652-43e3-a490-bfc072ed702d",
        created_at: "2024-08-31T15:55:50.608654+00:00",
        updated_at: "2024-08-31T15:55:50.608654+00:00",
      },
    ],
  },
  {
    id: "1afbf550-f052-4c42-9550-d665b5417c66",
    created_at: "2024-09-01T15:41:40.236361+00:00",
    updated_at: "2024-09-01T15:46:25.667613+00:00",
    title: "Implement Time Tracking Feature",
    description:
      "Develop and integrate a built-in time tracking feature for tasks. This feature should include:\n\n- The ability to log time spent on individual tasks.\n- A dashboard to view and analyze time tracking data.",
    priority: 0,
    status: "Todo",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "5d1c8d2b-942e-4a30-9f22-f1d488a2a77f",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "1afbf550-f052-4c42-9550-d665b5417c66",
        created_at: "2024-09-01T15:46:25.667613+00:00",
        updated_at: "2024-09-01T15:46:25.667613+00:00",
      },
    ],
  },
  {
    id: "ae3554f5-9d2e-4c96-811a-0847bb768e84",
    created_at: "2024-08-31T03:24:10.996971+00:00",
    updated_at: "2024-09-01T04:02:56.123299+00:00",
    title: "Implement Attachment Feature for Tickets",
    description:
      "As a user, I want to be able to add attachments to cards in our Trello-like project management tool. This will allow for better documentation and resource sharing within tasks.\n\nRequirements:\n1. Add an 'Attach' button to each card\n2. Allow users to upload files from their device.\n3. Support drag-and-drop functionality for adding attachments\n4. Display a thumbnail for image attachments\n5. Show file name and size for non-image attachments\\n6. Implement a way to download attachments\n7. Add the ability to delete attachments\n8. Ensure attachments are securely stored and only accessible to project members\n\nAcceptance Criteria:\nUsers can add multiple attachments to a single card \nAttached files are visible on the card details view\nThumbnails are generated for image files\nNon-image files show an appropriate icon based on file type\nAttachments can be downloaded by clicking on them\nThere is a clear option to remove attachments from a card \nThe system should handle various file types (docs, images, PDFs, etc.) \nImplement proper error handling for upload failures or unsupported file types",
    priority: 5,
    status: "Todo",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "f323ff59-e87d-4cf3-9a4e-79022e790f74",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "ae3554f5-9d2e-4c96-811a-0847bb768e84",
        created_at: "2024-08-31T03:47:49.720132+00:00",
        updated_at: "2024-08-31T03:47:49.720132+00:00",
      },
    ],
  },
  {
    id: "9e071909-6d18-4cc6-bce2-e80638e0f054",
    created_at: "2024-09-01T15:48:02.237918+00:00",
    updated_at: "2024-09-01T15:48:02.237918+00:00",
    title: "Add More Custom Themes",
    description:
      "Expand and integrate more Custom Themes that allows users to personalize their workspace with more color schemes and themes.",
    priority: 0,
    status: "Todo",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "1014658f-d459-488f-8c2a-d6be0774058e",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "9e071909-6d18-4cc6-bce2-e80638e0f054",
        created_at: "2024-09-01T15:48:02.237918+00:00",
        updated_at: "2024-09-01T15:48:02.237918+00:00",
      },
    ],
  },
  {
    id: "88361661-74ce-4449-ba66-65fb43de970d",
    created_at: "2024-09-01T15:40:25.358997+00:00",
    updated_at: "2024-09-01T15:40:25.358997+00:00",
    title: "Implement Due Dates Feature",
    description:
      "Develop and integrate a feature that allows users to set and track deadlines for their tasks. This feature should include:\n\n- The ability to assign due dates to individual tasks.\n- A visual indicator on the task list to show the due date status.\n",
    priority: 2,
    status: "Todo",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "aab70cbb-925d-454f-9c02-d06c149b857e",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "88361661-74ce-4449-ba66-65fb43de970d",
        created_at: "2024-09-01T15:40:25.358997+00:00",
        updated_at: "2024-09-01T15:40:25.358997+00:00",
      },
    ],
  },
  {
    id: "6a7feb34-b27d-4fc3-a90a-36b94dcd0049",
    created_at: "2024-09-01T15:43:31.484403+00:00",
    updated_at: "2024-09-01T15:43:31.484403+00:00",
    title: "Implement Activity Log Feature",
    description:
      "Develop and integrate an Activity Log feature to maintain a detailed history of all actions and changes made to boards and tasks. This feature will enhance transparency and accountability by allowing users to track modifications, updates, and activities within the application. The Activity Log should include timestamps, user information, and a description of the action performed.",
    priority: 3,
    status: "Todo",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "0b03b554-e13b-4436-9810-529440c883fd",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "6a7feb34-b27d-4fc3-a90a-36b94dcd0049",
        created_at: "2024-09-01T15:43:31.484403+00:00",
        updated_at: "2024-09-01T15:43:31.484403+00:00",
      },
    ],
  },
  {
    id: "715ad70d-7181-4673-9d6b-aaf6904a627e",
    created_at: "2024-09-01T15:53:04.320686+00:00",
    updated_at: "2024-09-01T15:53:04.320686+00:00",
    title: "Create a Mock Footer Section",
    description:
      "Conjure up a delightful mock footer section for our application. This whimsical footer should include the following elements:\n\n- A quirky product logo\n- A cheeky copyright notice\n- Witty navigation links (e.g., to my socials)",
    priority: 1,
    status: "Done",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "264fb87c-62bd-41a8-bc5d-dec643ae7cce",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "715ad70d-7181-4673-9d6b-aaf6904a627e",
        created_at: "2024-09-01T15:53:04.320686+00:00",
        updated_at: "2024-09-01T15:53:04.320686+00:00",
      },
    ],
  },
  {
    id: "57433c48-fe71-44a3-8289-255a03578b57",
    created_at: "2024-09-01T15:56:04.390684+00:00",
    updated_at: "2024-09-01T15:56:04.390684+00:00",
    title: "Create DB and Crud for Boards, Columns, Tickets",
    description:
      "Develop a database schema and implement CRUD (Create, Read, Update, Delete) operations for managing Boards, Columns, and Tickets.\n\n1. Database Schema Design:\n      - Create tables for Boards, Columns, and Tickets.\n      - Define relationships between tables (e.g., a Board has many Columns, a Column has many Tickets).\n\n2. CRUD Operations:\n      - Implement Create, Read, Update, and Delete operations for Boards.\n      - Implement Create, Read, Update, and Delete operations for Columns.\n      - Implement Create, Read, Update, and Delete operations for Tickets.\n\n3. API Endpoints:\n      - Create API endpoints for each CRUD operation.\n      - Ensure endpoints are secure and follow best practices.\n",
    priority: 9,
    status: "Done",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "2cc6158e-0d77-4642-bc1a-7416f09c3e8e",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "57433c48-fe71-44a3-8289-255a03578b57",
        created_at: "2024-09-01T15:56:04.390684+00:00",
        updated_at: "2024-09-01T15:56:04.390684+00:00",
      },
    ],
  },
  {
    id: "60f22510-63a1-4935-a045-7203a5846c7b",
    created_at: "2024-09-01T16:05:16.390586+00:00",
    updated_at: "2024-09-01T16:05:16.390586+00:00",
    title: "The inspiration of this project",
    description:
      "The idea of making a project like this is so played out, but use the ipad-cursor and the idea to use it with some drag and drop behavior seems cool, Then doing a Kanban/Jira/Trello board kind of project was the go to for it\n\n- Integrate the ipad-cursor \n- on/off button\n- Disable by default in movile as it does not provide nothing to tactile feedback, and messes with the experience\n",
    priority: 6,
    status: "Done",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "457fbd13-05e3-4c9f-ae26-1f5621b4067e",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "60f22510-63a1-4935-a045-7203a5846c7b",
        created_at: "2024-09-01T16:05:16.390586+00:00",
        updated_at: "2024-09-01T16:05:16.390586+00:00",
      },
    ],
  },
  {
    id: "1acca881-0a73-4889-9555-06ee02e2d61b",
    created_at: "2024-09-01T16:08:32.362103+00:00",
    updated_at: "2024-12-11T02:59:49.604419+00:00",
    title: "Filters feature",
    description:
      "Develop a feature that allows users to filter Tickets depending on their props",
    priority: 7,
    status: "Done",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "8ba49932-37d6-4e6e-8090-fd1619567b5d",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "1acca881-0a73-4889-9555-06ee02e2d61b",
        created_at: "2024-09-01T16:08:32.362103+00:00",
        updated_at: "2024-09-01T16:08:32.362103+00:00",
      },
    ],
  },
  {
    id: "ffa2f5d9-a709-4f48-8d44-57ce875e8437",
    created_at: "2024-09-01T15:50:29.081961+00:00",
    updated_at: "2024-09-01T16:08:51.536128+00:00",
    title: "Create a Home Page to disclose the reason of this project",
    description:
      "Design and develop a Home Page that clearly communicates the purpose and objectives of the project. This page should provide an overview of the project’s goals, its significance, and the benefits it offers to users. Include sections that highlight key features, user testimonials, and any relevant background information. The Home Page should be visually appealing, easy to navigate, and aligned with the overall branding of the application.\n\n- Hero Section with link to DEMO and DISCLAIMER\n- Featues\n- How to use DEMO\n- The Disclaimer Section\n- Small Roadmap on what to add",
    priority: 6,
    status: "Done",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "da56e440-9ee9-445b-9688-0d8a6a1e5c54",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "ffa2f5d9-a709-4f48-8d44-57ce875e8437",
        created_at: "2024-09-01T15:50:29.081961+00:00",
        updated_at: "2024-09-01T15:50:29.081961+00:00",
      },
    ],
  },
  {
    id: "d7b178ac-9445-436f-a9cd-bfd52dbaaca9",
    created_at: "2024-09-01T16:10:10.720346+00:00",
    updated_at: "2024-09-01T16:10:10.720346+00:00",
    title: "Themes",
    description:
      "Add some pre-defined themes according with the tech stack that we are using\n\n- Min of 5\n- Dark ones as to be there\n- Remeber selected one ",
    priority: 0,
    status: "Done",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "94a23376-28d2-47f7-a49a-40341b238e56",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "d7b178ac-9445-436f-a9cd-bfd52dbaaca9",
        created_at: "2024-09-01T16:10:10.720346+00:00",
        updated_at: "2024-09-01T16:10:10.720346+00:00",
      },
    ],
  },
  {
    id: "50ee9ddc-bffe-492d-8e11-9be29166f3d9",
    created_at: "2024-09-01T15:46:14.347689+00:00",
    updated_at: "2024-09-02T00:09:57.061065+00:00",
    title: "Make DEMO section Board not do changes on DB",
    description:
      "Modify the DEMO section of the Board to prevent any changes from being made to the database. This will allow users to test and demonstrate the application’s functionality without impacting the actual data. The DEMO section should simulate all actions and changes, providing a realistic experience while maintaining the integrity of the database. Ensure that all features, including the Activity Log, operate in this simulated environment.\r\n\r\n\r\n - Create Ticket\r\n - Update Ticket\r\n - Create Board (Not allowed)\r\n - Move Columns\r\n - Invite Users (not allowed)\r\n - Delete Ticket",
    priority: 10,
    status: "Doing",
    board_id: "d04aeafb-728a-4e31-8187-b895e6cda905",
    isActive: true,
    AssignedToTickets: [
      {
        id: "1f410702-c57f-42e3-aeff-da02ed045e68",
        Users: {
          id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
          img: "https://sxfpasuclnlqrljkmjdc.supabase.co/storage/v1/object/public/user-pictures/kbueno.jpg",
          name: "Kevin Bueno",
          created_at: "2024-08-08T23:12:44.942386+00:00",
          updated_at: "2024-08-08T23:12:44.942386+00:00",
        },
        user_id: "f70e24e7-438b-42ae-8458-14e8e058dd9a",
        ticket_id: "50ee9ddc-bffe-492d-8e11-9be29166f3d9",
        created_at: "2024-09-01T15:46:14.347689+00:00",
        updated_at: "2024-09-01T15:46:14.347689+00:00",
      },
    ],
  },
];
