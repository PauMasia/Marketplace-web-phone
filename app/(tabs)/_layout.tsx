import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {useRouter} from "expo-router";
import {Button} from "react-native";
import Navbar from "@/app/components/Navbar";
// import "../../assets/styles/login.css";

export default function AuthScreen() { // Tal vez añadir el contexto?
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleAuth = async () => {
        if (!username || !mail || !password) {
            return Alert.alert("Error", "Rellena todos los campos");
        }

        const endpoint = isLogin ? "login" : "register";

        try {
            const res = await fetch(`http://localhost:5443/web/${endpoint}`, {
                method: "POST", // Revisar en casa con la bd, y exportar bd
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, mail, password }),
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert("Éxito", `${isLogin ? "Sesión iniciada" : "Registrado"} correctamente`);
            } else {
                Alert.alert("Error", data.message || "No te has logeado");
            }
        } catch (err) {
            Alert.alert("Error", "No se pudo conectar al servidor");
        }
    };

    return (
        <View style={styles.container}>
                <Navbar>
                </Navbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: { width: "100%", backgroundColor: "#fff", padding: 12, marginBottom: 10, borderRadius: 6 },
    button: { backgroundColor: "#6200ee", padding: 15, borderRadius: 6, width: "100%", alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    toggleText: { color: "#6200ee", marginTop: 15 },
});
// asi es mas facil en vd
