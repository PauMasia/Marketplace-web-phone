import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import Navbar from "@/app/components/Navbar";
import {SaleOrder} from "@/app/types/saleOrder";

export default function Orderlist() {
    const [orders, setOrders] = useState<SaleOrder[]>([]);
    let apiUrl = process.env.EXPO_PUBLIC_LOCAL_PC_IP;

    useEffect(() => {
        fetch(`${apiUrl}/orders/all`)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);
    console.log(orders);
    // console.log(`${apiUrl}/orders/all`);

    const cardOrder = ({ item }) => {
    const isPayed = item.state == "payed";
       return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/orders/${item.id}`)}
        >
            {/*Aqui este name seria un P250091 pej, en un futuro*/}
            <Text style={styles.title}>Pedido #{item.name} #{item.id}
                <Text style={isPayed ? styles.payed : styles.unpayed}>
                    {isPayed ? "  — PAGADO" : "  — NO PAGADO"}
                </Text>
            </Text>
            <Text>Estado: {item.state}</Text>
            <Text>Total: {item.amount_total ?? "Error en el precio"} €</Text>
        </TouchableOpacity>
    )};

    return (
        <View style={styles.page}>
            <Navbar />
            <View style={styles.header}>
                <Text style={styles.h1}>Pedidos</Text>
            </View>

            <FlatList data={orders} renderItem={cardOrder} />
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, padding: 20 },
    header: { marginBottom: 20 },
    h1: { fontSize: 24, fontWeight: "bold" },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 15
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    payed: {
        color: "green",
        fontWeight: "bold"
    },
    unpayed: {
        color: "red",
        fontWeight: "bold"
    }

});
