import React, { useState } from "react";
import { Product } from "../types/product";
import { StyleSheet} from "react-native";

export default function CreateProduct() {
    const [product, setProduct] = useState<Product>({
        id:0,
        name: "",
        price: 0,
        discount: 0,
        category: "",
        is_published: false,
        // url:"";
    });
    let apiUrl=process.env.EXPO_PUBLIC_LOCAL_PC_IP ?? '';

    const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
        setProduct({ ...product, [key]: value });
    };

    const handleCreate = async () => {
        const res = await fetch(`${apiUrl}/web/product`, {
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

const styles = StyleSheet.create({
 page: {
     flex: 1,
     backgroundColor: "#f3f0ff",
     paddingTop: 50,
     paddingHorizontal: 16,
 },
 header: {
     marginBottom: 16,
 },
 title: {
     fontSize: 24,
     fontWeight: "700",
     marginBottom: 12,
 },
 authButtons: {
     flexDirection: "row",
     gap: 8,
 },
 button: {
     paddingHorizontal: 14,
     paddingVertical: 8,
     borderRadius: 6,
     backgroundColor: "#6200ee",
 },
 buttonText: {
     color: "#ffffff",
     fontWeight: "600",
 },
 buttonOutline: {
     paddingHorizontal: 14,
     paddingVertical: 8,
     borderRadius: 6,
     backgroundColor: "#ffffff",
     borderWidth: 1,
     borderColor: "#6200ee",
 },
 buttonOutlineText: {
     color: "#6200ee",
     fontWeight: "600",
 },
 textMuted: {
     color: "#666666",
     fontSize: 13,
 },
 item: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
     paddingVertical: 8,
     borderBottomWidth: 1,
     borderBottomColor: "#e0e0e0",
 },
 itemName: {
     fontSize: 15,
     fontWeight: "600",
 },
 itemCategory: {
     fontSize: 13,
     color: "#777777",
 },
 itemPrice: {
     fontSize: 15,
     fontWeight: "700",
     color: "#6200ee",
 },
});
