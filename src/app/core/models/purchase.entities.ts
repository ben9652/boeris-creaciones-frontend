import { Branch } from "./branch.entities";
import { Provider } from "./provider.entities";
import { ItemPurchaseSummary } from "./purchaseSummary.entities";
import { User } from "./user.entities";

export interface Purchase {
    id: number;
    requester_partner: User
    provider: Provider;
    description: string;
    raw_materials: ItemPurchaseSummary[];
    order_date: Date;
    reception_date: Date | null;
    cancel_date: Date | null;
    currency: string;
    payment_type: string;
    reception_mode: string;
    budget: number;
    state: string;
    final_price: number | null;
    additional_amount_reason: string | null;
    reception_branch: Branch | null;
    invoice: string | null;
}