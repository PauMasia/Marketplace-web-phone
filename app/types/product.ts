export interface Product {
    id?: number;
    name: string;
    is_published: boolean;
    price: number;
    discount?: number;
    category: string;
}
