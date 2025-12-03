import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {Image} from "expo-image";

export default function Navbar() {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("partner_id") || "null");


    const logout = () => {
        localStorage.removeItem("partner_id");
        router.push("/login");
    };

    return (
        <View style={styles.navbar}>
            <View style={styles.left}>
                <TouchableOpacity onPress={() => router.push("/shop")}>
                    <Image source={require("../../assets/images/logo.png")}
                           style={{width: 60, height: 60}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/shop")} style={styles.btn}>
                    <Text style={styles.btnText}>Shop</Text>
                </TouchableOpacity>

                {user && (
                    <><TouchableOpacity onPress={() => router.push("/cart")} style={styles.btn}>
                        <Text style={styles.btnText}>Mi carrito</Text>
                    </TouchableOpacity><TouchableOpacity onPress={() => router.push(`/myuser`)} style={styles.btn}>
                        <Text style={styles.btnText}>Mi usuario</Text>
                    </TouchableOpacity></>
                )}

                {user?.shared && (
                    <TouchableOpacity onPress={() => router.push("/adminpanel")} style={styles.btn}>
                        <Text style={styles.btnText}>Panel de aministrador</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.right}>
                {!user && (

                    <><TouchableOpacity onPress={() => router.push("/login")} style={styles.btn}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity><TouchableOpacity onPress={() => router.push("/register")} style={styles.btn}>
                        <Text style={styles.btnText}>Registro</Text>
                    </TouchableOpacity></>
                )}

                {user && (
                    <TouchableOpacity onPress={logout} style={styles.btn}>
                        <Text style={styles.btnText}>Salir</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        // backgroundColor: "#2d024e",
        backgroundColor:"#6d3783",
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
    },
    btn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#6a0dad",
        borderRadius: 8,
        marginRight: 10,
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
    }
});
