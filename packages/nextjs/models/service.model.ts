export enum ServiceType {
    Development = 'development',
    Marketing = 'marketing',
    Design = 'design',
    Legal = 'legal',
    TaxAdvisor = 'tax advisor',
    Other = 'other',
}

export interface ServiceNeed {
    serviceType: ServiceType;
    description: string;
    equityOffered?: number;
    budget?: number;
    startDate?: Date;
    endDate?: Date;
}
