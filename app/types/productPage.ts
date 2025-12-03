import {Product} from "@/app/types/product";

export interface productPage<T> {
    content: Product[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}