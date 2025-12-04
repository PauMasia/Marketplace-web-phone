import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Navbar from "@/app/components/Navbar";

export default function OrderDetail() {
    const { id } = useLocalSearchParams();
    const [order, setOrder] = useState(null);
    let apiUrl = process.env.EXPO_PUBLIC_LOCAL_PC_IP;
    const [isPayed, setIsPayed] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/orders/${id}`)
            .then(res => res.json())
            .then(data => {
                // if (!data || !data.id) {
                //     router.navigate("/shop");
                //     return;
                // }
                setIsPayed(data.state === "payed");
                setOrder(data);
            })
    }, [id]);
    console.log(order)

    const payOrder = () => {
        Alert.alert("Pagar pedido", "¿Seguro?", [
            {
                text: "Sí",
                onPress: () => {
                    fetch(`${apiUrl}/orders/${id}/pay`, {
                        method: "POST"
                    }).then(res => {
                        if (res.ok) {
                            Alert.alert("Pedido pagado");
                            router.back();
                        }
                    });
                }
            },
            { text: "No" }
        ]);
    };

    if (!order) return <Text>Cargando...</Text>;

    return (
        <View style={styles.page}>
            <Navbar />

            <View style={styles.card}>
                <Text style={styles.title}>Pedido #{order.id}</Text>

                <View style={styles.infoBox}>
                    <Text>Estado: {order.state}</Text>
                    <Text>Total: {order.amount_total ?? "?"} €</Text>
                    <Text>Cliente: {order.partner?.username ?? "?"}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.unpayed, isPayed && styles.payed]}
                    onPress={isPayed ? null : payOrder}
                    disabled={isPayed}
                >
                    <Text style={{ color: "white" }}>
                        {isPayed ? "Already Payed" : "Pagar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: { padding: 20 },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        marginTop: 30,
    },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    infoBox: {
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ddd"
    },
    unpayed: {
        backgroundColor: "green",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginTop: 10,
    },
    payed: {
        backgroundColor: "gray",
    }
});
