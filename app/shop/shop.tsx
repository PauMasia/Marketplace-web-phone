import React, { useEffect, useState } from "react";
import { Product } from "../types/product";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5443/web/shop")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Productos</h1>

            <button
                style={{ marginBottom: 20 }}
                onClick={() => (window.location.href = "/create-product")}
            >
                Crear producto
            </button>

            {products.length === 0 ? (
                <p>No hay productos.</p>
            ) : (
                <ul>
                    {products.map((p) => (
                        <li key={p.id}>
                            <strong>{p.name}</strong> — {p.price}€ — {p.category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
