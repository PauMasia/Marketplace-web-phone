import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { isLoggedIn } from "./utils/auth";

export default function RootLayout() {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            const loggedIn = await isLoggedIn();
            setLogged(loggedIn);
            setLoading(false);
        };
        checkLogin();
    }, []);

    useEffect(() => {
        if (!loading) {
            if (logged) router.replace("/(tabs)");
            else router.replace("/login");
        }
    }, [loading, logged]);

    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}
