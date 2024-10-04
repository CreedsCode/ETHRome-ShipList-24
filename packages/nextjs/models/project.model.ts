import {TPersonReference} from "./user.model";
import {ServiceNeed} from "./service.model";
import {MediaItem} from "./media.model";

export interface IProject {
    id: string;
    name: string;
    description: string;
    industry: string;
    stage: 'idea' | 'prototype' | 'mvp' | 'growth';
    fundingGoal: number;
    fundingReceived: number;
    cofounderNeeded: boolean;
    acceptsServiceForEquity: boolean;
    serviceNeeds?: ServiceNeed[];
    team: TPersonReference[];
    media: MediaItem[];
    founders: TPersonReference[];
    contactEmail: string;
    hrbNumber?: string;
    vatId?: string;
    instaUrl?: string;
    facebookUrl?: string;
    linkedInUrl?: string;
    wageEquityBalance?: number;
    status: 'active' | 'completed' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}
