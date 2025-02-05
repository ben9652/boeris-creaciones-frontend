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

export function createPurchase(
    id: number,
    requester_partner: User,
    provider: Provider,
    description: string,
    raw_materials: (ItemPurchaseSummary)[],
    order_date: Date,
    reception_date: Date | null,
    cancel_date: Date | null,
    currency: string,
    payment_type: string,
    reception_mode: string,
    budget: number,
    state: string,
    final_price: number | null,
    additional_amount_reason: string | null,
    reception_branch: Branch | null,
    invoice: string | null
) {
    return {
        id,
        requester_partner,
        provider,
        description,
        raw_materials,
        order_date,
        reception_date,
        cancel_date,
        currency,
        payment_type,
        reception_mode,
        budget,
        state,
        final_price,
        additional_amount_reason,
        reception_branch,
        invoice
    }
}

export class NewPurchase {
    private raw_materials: ItemPurchaseSummary[];
    private provider: Provider;
    private partner: User;
    private currency: string;
    private payment_type: 'T' | 'E';
    private reception_mode: 'B' | 'E';
    private description: string;

    constructor(
        raw_materials: ItemPurchaseSummary[],
        provider: Provider,
        partner: User,
        currency: string,
        payment_type: 'T' | 'E',
        reception_mode: 'B' | 'E',
        description: string
    ) {
        this.raw_materials = raw_materials;
        this.provider = provider;
        this.partner = partner;
        this.currency = currency;
        this.payment_type = payment_type;
        this.reception_mode = reception_mode;
        this.description = description;
    }
}