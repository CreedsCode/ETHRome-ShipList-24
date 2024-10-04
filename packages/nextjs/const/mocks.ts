import {IProject, TServiceType} from "~~/models";

const PROJECT_LIST_MOCK: IProject[] = [
    {
        id: '1',
        name: 'Eco Software',
        description: 'A platform to monitor environmental impact of businesses.',
        industry: 'Software',
        stage: 'mvp',
        fundingGoal: 50000,
        fundingReceived: 25000,
        cofounderNeeded: true,
        acceptsServiceForEquity: true,
        serviceNeeds: [
            { serviceType: TServiceType.Development, description: 'Full-stack development', equityOffered: 10 },
        ],
        team: [
            { uid: 'u123', displayName: 'Alice Smith', photoUrl: 'https://example.com/alice.jpg' },
            { uid: 'u124', displayName: 'Bob Johnson', photoUrl: 'https://example.com/bob.jpg' },
        ],
        media: [],
        founders: [
            { uid: 'u123', displayName: 'Alice Smith', photoUrl: 'https://example.com/alice.jpg' },
        ],
        contactEmail: 'contact@eco-software.com',
        status: 'active',
        createdAt: new Date('2023-05-01'),
        updatedAt: new Date('2023-08-01'),
    },
    {
        id: '2',
        name: 'GreenTech Innovations',
        description: 'Next-generation energy-saving solutions.',
        industry: 'Energy',
        stage: 'growth',
        fundingGoal: 150000,
        fundingReceived: 90000,
        cofounderNeeded: false,
        acceptsServiceForEquity: false,
        serviceNeeds: [
            { serviceType: TServiceType.Marketing, description: 'Brand strategy', equityOffered: 5 },
        ],
        team: [
            { uid: 'u125', displayName: 'Charlie Adams', photoUrl: 'https://example.com/charlie.jpg' },
            { uid: 'u126', displayName: 'Diana Roberts', photoUrl: 'https://example.com/diana.jpg' },
        ],
        media: [],
        founders: [
            { uid: 'u125', displayName: 'Charlie Adams', photoUrl: 'https://example.com/charlie.jpg' },
        ],
        contactEmail: 'info@greentech.com',
        status: 'completed',
        createdAt: new Date('2022-09-15'),
        updatedAt: new Date('2023-02-20'),
    },
    {
        id: '3',
        name: 'LegalEase',
        description: 'An automated platform to streamline legal document generation.',
        industry: 'Legal',
        stage: 'prototype',
        fundingGoal: 75000,
        fundingReceived: 40000,
        cofounderNeeded: true,
        acceptsServiceForEquity: true,
        serviceNeeds: [
            { serviceType: TServiceType.Design, description: 'UI/UX design', equityOffered: 7 },
        ],
        team: [
            { uid: 'u123', displayName: 'Peter Parker', photoUrl: 'https://example.com/johnwayne.jpg' },
        ],
        media: [],
        founders: [
            { uid: 'u123', displayName: 'Peter Parker', photoUrl: 'https://example.com/johnwayne.jpg' },
        ],
        contactEmail: 'contact@legalease.com',
        status: 'active',
        createdAt: new Date('2023-01-10'),
        updatedAt: new Date('2023-07-05'),
    },
    {
        id: '4',
        name: 'MediTech Solutions',
        description: 'AI-driven medical diagnostics platform.',
        industry: 'Healthcare',
        stage: 'idea',
        fundingGoal: 100000,
        fundingReceived: 50000,
        cofounderNeeded: true,
        acceptsServiceForEquity: true,
        serviceNeeds: [
            {  serviceType: TServiceType.Development, description: 'AI development', equityOffered: 15 },
        ],
        team: [
            { uid: 'u123', displayName: 'John Wayne', photoUrl: 'https://example.com/johnwayne.jpg' },
        ],
        media: [],
        founders: [
            { uid: 'u123', displayName: 'John Wayne', photoUrl: 'https://example.com/johnwayne.jpg' },
        ],
        contactEmail: 'info@meditech.com',
        status: 'active',
        createdAt: new Date('2023-03-12'),
        updatedAt: new Date('2023-07-10'),
    },
    {
        id: '5',
        name: 'EduNext',
        description: 'Revolutionary platform for remote education.',
        industry: 'Education',
        stage: 'mvp',
        fundingGoal: 80000,
        fundingReceived: 30000,
        cofounderNeeded: false,
        acceptsServiceForEquity: true,
        serviceNeeds: [
            { serviceType: TServiceType.Design, description: 'App design', equityOffered: 12 },
        ],
        team: [
            { uid: 'u123', displayName: 'Alice Smith', photoUrl: 'https://example.com/alice.jpg' },
        ],
        media: [],
        founders: [
            { uid: 'u123', displayName: 'Alice Smith', photoUrl: 'https://example.com/alice.jpg' },
        ],
        contactEmail: 'contact@edunext.com',
        status: 'active',
        createdAt: new Date('2022-10-25'),
        updatedAt: new Date('2023-04-05'),
    },
];

export default PROJECT_LIST_MOCK;
