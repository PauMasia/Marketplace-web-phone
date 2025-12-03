import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { isLoggedIn } from "./utils/auth";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="shop/shop" />
            <Stack.Screen name="shop/createProduct" />
        </Stack>
    );
}
