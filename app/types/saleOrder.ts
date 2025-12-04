import {SaleOrderLine} from "@/app/types/saleOrderLine";

export interface SaleOrder {
    id?: number;
    name: string;
    partner_id: string;
    state: string;
    amount_total: number;
    // faltaran las lineas ver como plantearlo
    lines: SaleOrderLine[];
}