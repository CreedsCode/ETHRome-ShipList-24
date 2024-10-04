import {TServiceType} from "~~/models/service.model";
import {TProjectStage} from "~~/models/project.model";

export interface IFilterState {
    stage: TProjectStage | null;
    fundingGoal: number;
    serviceType: TServiceType | null;
    sortDirection: TSortDirection | null;
}

export type TSortDirection = 'asc' | 'desc';
