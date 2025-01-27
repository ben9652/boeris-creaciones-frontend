import { Category } from "./category.entities";

export interface ItemPurchaseSummary {
    raw_material_id: number;
    category: Category;
    name: string;
    quantity: number;
    unit_price: number;
}

export interface PurchaseSummary {
    id_purchase: number;
    date: Date;
    items: ItemPurchaseSummary[];
    total: number;
}