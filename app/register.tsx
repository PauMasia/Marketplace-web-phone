import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { login } from "./utils/auth";

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        if (!username || !mail || !password) {
            return Alert.alert("Error", "Rellena todos los campos");
        }

        try {
            const res = await fetch("http://localhost:5443/web/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, mail, password }),
            });

            const data = await res.json();

            if (res.ok) {
                await login(data.token || "token_demo");
                Alert.alert("Éxito", "Registrado correctamente");
                router.replace("/(tabs)");
            } else {
                Alert.alert("Error", data.message || "Error al registrarte");
            }
        } catch (err) {
            Alert.alert("Error", "No se pudo conectar al servidor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>

            <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Email" value={mail} onChangeText={setMail} />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.toggleText}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
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
