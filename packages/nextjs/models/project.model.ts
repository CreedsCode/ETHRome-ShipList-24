import {TPersonReference} from "./user.model";
import {ServiceNeed} from "./service.model";
import {MediaItem} from "./media.model";

export type TProjectStage = 'idea' | 'prototype' | 'mvp' | 'growth';

export interface IProjectFormData {
    name: string;
    description: string;
    industry: string;
    stage: TProjectStage;
    fundingGoal: number;
    fundingReceived: number;
    contactEmail: string;
    hrbNumber?: string;
    vatId?: string;
    instaUrl?: string;
    facebookUrl?: string;
    linkedInUrl?: string;
    coFounderNeeded: boolean;
}

export interface IProject extends IProjectFormData{
    id: string;
    acceptsServiceForEquity: boolean;
    serviceNeeds?: ServiceNeed[];
    team: TPersonReference[];
    media: MediaItem[];
    founders: TPersonReference[];
    status: 'active' | 'completed' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}
