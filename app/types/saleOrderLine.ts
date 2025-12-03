import {Product} from "@/app/types/product";

export interface SaleOrderLine {
    id?: number;
    name: string;
    product: Product;
    discount: number;
    total: number;
}