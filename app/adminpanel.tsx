import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React, {useEffect, useState} from "react";
import Navbar from "@/app/components/Navbar";

export default function AdminPanel() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    // asyncStorage.getItem("partner_id").then(r => null)
    useEffect(() => {
        const loadPartner = async () => {
            try {
                const partnerId = await asyncStorage.getItem("partner_id");
                console.log("partner_id:", partnerId);
                if (partnerId != null) {
                    setUser(JSON.parse(partnerId))
                }
            } catch (e) {
                console.error("Error leyendo partner_id", e);
            }
        };

        loadPartner();
    }, []);

    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text style={styles.title}>Panel de Administración</Text>

            <TouchableOpacity style={styles.btn} onPress={() => router.push("/users/userlist")}>
                <Text style={styles.btnText}>👥 Gestión de Usuarios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => router.push("/orders/orderlist")}>
                <Text style={styles.btnText}>📦 Gestión de Pedidos</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 30, fontWeight: "bold", marginBottom: 30 },
    btn: {
        backgroundColor: "#6a0dad",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    btnText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    }
});
