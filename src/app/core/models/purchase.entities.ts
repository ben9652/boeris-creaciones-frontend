import { Branch } from "./branch.entities";
import { Provider } from "./provider.entities";
import { ItemPurchaseSummary } from "./purchaseSummary.entities";
import { User } from "./user.entities";

export interface Purchase {
    id: number;
    description: string;
    requester_partner: User
    provider: Provider;
    raw_materials: ItemPurchaseSummary[];
    order_date: Date;
    reception_date: Date | null;
    canceled_date: Date | null;
    currency: string;
    payment_type: string;
    reception_mode: string;
    reception_branch: Branch | null;
    status: string;
    price: number | null;
    invoice: string | null;
}