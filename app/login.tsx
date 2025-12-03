import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { login } from "./utils/auth";
import {Image} from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useState("");
    const router = useRouter();
    const asyncStorage = AsyncStorage;
    asyncStorage.getItem("partner_id",)

    const handleLogin = async () => {

        if (!mail || !password) {
            return Alert.alert("Error", "Rellena todos los campos");
        }

        try {
            const res = await fetch("http://localhost:5443/web/login", {
                method: "POST",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mail, password}),
            });
            console.log(res.body);
            const data = await res.json();
            await AsyncStorage.setItem("partner_id", JSON.stringify(data.partner_id) || JSON.stringify(data.data));
            // localStorage
            // Esto servira para hacer que aparezca el mensaje de que esta mal puesto el usuario o no
            // if (res.ok) {
            //     await login(data.token || "token_demo");
            //     Alert.alert("Éxito", "Sesión iniciada correctamente");
            router.replace("/(tabs)");
            // } else {
            //     Alert.alert("Error", data.message || "Credenciales incorrectas");
            // }
        } catch (err) {
            Alert.alert("Error", "No se pudo conectar al servidor");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/logo.png")}
                   style={{width: 120, height: 120}}/>
            <Text style={styles.title}>Iniciar sesión</Text>

            <TextInput style={styles.input} placeholder="Email" value={mail} onChangeText={setMail} />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.toggleText}>¿No tienes cuenta? Regístrate</Text>
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
