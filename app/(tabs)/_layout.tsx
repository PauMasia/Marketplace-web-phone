import React, {useEffect, useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {router, useRouter} from "expo-router";
import {Button} from "react-native";
import Navbar from "@/app/components/Navbar";
// import "../../assets/styles/login.css";

export default function AuthScreen() {
        // Tal vez añadir el contexto?
        useEffect(() => {
            requestAnimationFrame(() => {
                router.replace("/shop");
            });
        }, []);
        // router.navigate("/shop")})

    return (
        <View style={styles.container}>
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
