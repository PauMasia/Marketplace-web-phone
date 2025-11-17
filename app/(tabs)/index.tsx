import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { logout } from "../utils/auth";

export default function HomeScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Página de la tienda</Text>
            <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
}
