import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState(Object);

    const handleLogin = () => {
        if (!username || !mail || !password) {
            Alert.alert("Error", "Por favor rellena todos los campos");
            return;
        }

        fetch("http://localhost:5443/web/register", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username, mail: mail, password: password })})
        .then(response => response.json())
        .then(data => setResponse(data))
            .catch((error) => {console.error("Error:", error)
            setResponse(error)});
        // Alert.alert("Login correcto", `Bienvenido ${username} (${email})`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={mail}
                onChangeText={setMail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            {/* Mostrar la respuesta si existe */}
            {response && (
                <View style={{ marginTop: 20, width: "100%" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Respuesta del servidor:</Text>
                    <Text style={{ fontSize: 14, marginTop: 5 }}>
                        {typeof response === "object"
                            ? JSON.stringify(response, null, 2)
                            : String(response)}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        backgroundColor: "#6200ee",
        paddingVertical: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
