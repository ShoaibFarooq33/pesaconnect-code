import { User } from "./user";

export interface Organization {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    users?: User[];
}