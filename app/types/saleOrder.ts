import {SaleOrderLine} from "@/app/types/saleOrderLine";

export interface Order {
    id?: number;
    name: string;
    partnerName: string;
    status: string;
    total: number;
    // faltaran las lineas ver como plantearlo
    lines: SaleOrderLine[];
}