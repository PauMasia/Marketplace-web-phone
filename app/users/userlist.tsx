import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import Navbar from "@/app/components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Product} from "@/app/types/product";
import {ResPartner} from "@/app/types/resPartner";

export default function UserList() {
    const [users, setUsers] = useState<ResPartner[]>([]);
    let apiUrl = process.env.EXPO_PUBLIC_LOCAL_PC_IP;

    useEffect(() => {
        fetch(`${apiUrl}/userList/all`)
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    console.log(users);
    console.log(`${apiUrl}/userList/all`);

    const cardUser = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/users/${item.id}`)}
        >
            <Image
                source={require("../../assets/images/no_image_profile.png")}
                style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <Text style={styles.userName}>{item.username}</Text>
            <Text style={styles.userMail}>{item.mail}</Text>
        </TouchableOpacity>
    );
    // if (!user || user.shared) {}
    return (
        <View style={styles.page}>
            <Navbar />

            <View style={styles.header}>
                <Text style={styles.title}>Usuarios</Text>
            </View>

            <FlatList data={users} renderItem={cardUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, padding: 20 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    title: { fontSize: 24, fontWeight: "bold" },
    card: { marginBottom: 20 },
    userName: { fontSize: 18, fontWeight: "500" },
    userMail: { color: "gray" }
});
