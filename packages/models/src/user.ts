import { Organization } from "./organization";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    organizations?: Organization[];
}