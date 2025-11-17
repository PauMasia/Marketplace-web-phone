import React, { useState } from "react";
import { Product } from "../types/product";

export default function CreateProduct() {
    const [product, setProduct] = useState<Product>({
        name: "",
        price: 0,
        discount: 0,
        category: "",
        is_published: false,
    });

    const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
        setProduct({ ...product, [key]: value });
    };

    const handleCreate = async () => {
        const res = await fetch("http://localhost:5443/web/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (res.ok) {
            alert("Producto creado!");
            window.location.href = "/shop";
        } else {
            alert("Error al crear el producto");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Crear producto</h1>

            <input
                placeholder="Nombre"
                value={product.name}
                onChange={(e) => updateField("name", e.target.value)}
            /><br />

            <input
                type="number"
                placeholder="Precio"
                value={product.price}
                onChange={(e) => updateField("price", parseFloat(e.target.value))}
            /><br />

            <input
                type="number"
                placeholder="Descuento"
                value={product.discount}
                onChange={(e) => updateField("discount", parseInt(e.target.value))}
            /><br />

            <input
                placeholder="Categoría"
                value={product.category}
                onChange={(e) => updateField("category", e.target.value)}
            /><br />

            <label style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <input
                    type="checkbox"
                    checked={product.is_published}
                    onChange={(e) => updateField("is_published", e.target.checked)}
                />
                Publicado
            </label>

            <br /><br />

            <button onClick={handleCreate}>Guardar</button>
        </div>
    );
}
