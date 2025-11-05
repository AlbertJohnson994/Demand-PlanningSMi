export declare enum DemandStatus {
    PLANNING = "Planning",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed"
}
export declare class Demand {
    id: number;
    sku: string;
    description: string;
    startDate: Date;
    endDate: Date;
    totalPlanned: number;
    totalProduction: number;
    status: DemandStatus;
    createdAt: Date;
    updatedAt: Date;
}
