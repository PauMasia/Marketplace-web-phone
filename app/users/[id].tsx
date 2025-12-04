import React, { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, Alert, Button, TouchableOpacity} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import Navbar from "@/app/components/Navbar";

export default function UserDetail() {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState(null);
    let apiUrl=process.env.EXPO_PUBLIC_LOCAL_PC_IP;

    useEffect(() => {
        fetch(`${apiUrl}/userList/${id}`)
            .then(res => res.json())
            .then(data => {
                // Esto se ha probado para no dar eror y redirigir a la tienda si no existe
                if (!data || !data.id) {
                    router.navigate("/shop");
                    return;
                }
                setUser(data);

            });
    }, [id]);
    console.log(`${apiUrl}/userList/all`," id");
    if (!user) {
        return <Text>No existe este usuario</Text>;
    }

    const deleteUser = () => {
        // Popup de confirmación del navegador
        if (typeof window !== "undefined") {
            const seguro = window.confirm("¿Seguro que quieres eliminar este usuario?");
            if (!seguro) return;
        }

        fetch(`${apiUrl}/userList/deluser/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    if (typeof window !== "undefined") {
                        window.alert("Eliminado");
                    }
                    router.push('/shop');
                }
            });
    };

    return (
        <View style={styles.page}>
            <Navbar></Navbar>
            <View style={styles.card}>
                <TouchableOpacity style={styles.remove} onPress={deleteUser}>
                    <Text>Eliminar</Text>
                </TouchableOpacity>

                <Image source={require("../../assets/images/no_image_profile.png")} style={styles.avatar}/>
                <Text style={styles.title}>{user.username}</Text>
                <View style={styles.content}>
                <Text style={styles.text}>Email: {user.mail}</Text>
                <Text style={styles.text}>País: {user.country ?? "Sin pais estableciro"}</Text>
                <Text style={styles.text}>Dirección: {user.address ?? "No definida"}</Text>
                <Text style={styles.text}>ID: {user.id}</Text>
                </View>
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
    avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 16, alignSelf: "center" },
    content: {
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        width: 400,
    },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    text: { fontSize: 16, marginBottom: 4 },
    remove: { backgroundColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginTop: 10,
        display: "flex",
    },
});
