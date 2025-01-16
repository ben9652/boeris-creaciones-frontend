import { BranchBase } from "./branch.entities";

export interface ReceptionObject {
    branch: BranchBase;
    invoice: File | null;
}