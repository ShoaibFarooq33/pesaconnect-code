import { Operator } from "./operator";
import { Organization } from "./organization";

export interface transaction {
    id: string;
    operatorExternalId: string;
    organizationId: string;
    organization?: Organization;
    operatorId: number;
    operator: Operator;
    sender: string;
    recipient: string;
    amount: number;
    timestamp: Date;
    status: "pending" | "completed" | "failed";
}