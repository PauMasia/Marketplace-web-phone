import React, { useEffect, useState } from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Product } from "../types/product";
import "../../assets/styles/products_css.css";
import {router} from "expo-router";
import {Image} from "expo-image";
import Navbar from "@/app/components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const asyncStorage = AsyncStorage;
    let apiUrl=process.env.EXPO_PUBLIC_LOCAL_PC_IP ?? '';
    // asyncStorage.getItem("partner_id").then(r => null)
    // console.log(apiUrl,"Url");


    useEffect(() => {
        const loadPartner = async () => {
            try {
                const partnerId = await asyncStorage.getItem("partner_id");
                console.log("partner_id:", partnerId);
                // aquí haces lo que quieras con eso
                // apiUrl =

                console.log(apiUrl,"Url");

            } catch (e) {
                console.error("Error leyendo partner_id", e);
            }
        };

        loadPartner();
    }, []);


    useEffect(() => {
        fetch(`${apiUrl}/shop`)
            .then((res) => res.json())
            .then((data) => setProducts(data.content)); // de momento no tendremos en cuenta el paginate
    }, []);
    console.log(products);

    const cardList = ({ item }: { item: Product }) => (
        <TouchableOpacity
            // style={styles.card}
            // onPress={() => router.push(`/product/${item.id}`)}
        >
            {
            //     (item?.url &&
            //     <Image source={require(item?.url)}
            //            style={{width: 60, height: 60}}/>
            // )
            // ||
                <Image source={require("../../assets/images/no_image_product.png")}
                       style={{width: 60, height: 60}}/>}
            <Image source={{}}></Image>
            <Text
                style={styles.productName}
            >{item.name}</Text>
            <Text
                style={styles.productPrice}
            >{item.price} €</Text>
            <Text
                style={styles.productCategory}
            >{item.category}</Text>
        </TouchableOpacity>
    );

    return (
        <View
            style={styles.page}
        >
            <Navbar></Navbar>
            <View
                style={styles.header}
            >
                <Text
                    style={styles.title}
                >Productos</Text>
                <TouchableOpacity>
                    <Text style={styles.btn}
                    >Añadir producto</Text>
                </TouchableOpacity>
            </View>

            <FlatList data={products} renderItem={cardList}></FlatList>
        </View>
    );
}
const styles = StyleSheet.create({
    page: { flex: 1, padding: 20 },
    header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold" },
    btn: { color: "blue" },
    card: { marginBottom: 20 },
    productName: { fontSize: 18, fontWeight: "500" },
    productPrice: { color: "green" },
    productCategory: { color: "gray" }
});