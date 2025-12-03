// import { useEffect, useState } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
// import { Link } from "expo-router";
//
// export default function UserList() {
//     const [users, setUsers] = useState([]);
//
//     useEffect(() => {
//         fetch("http://localhost:5443/web/users")
//             .then(res => res.json())
//             .then(data => setUsers(data));
//     }, []);
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Usuarios</Text>
//
//             <FlatList
//                 data={users}
//                 keyExtractor={(u) => u.id.toString()}
//                 renderItem={({ item }) => (
//                     <Link href={`/users/${item.id}`} asChild>
//                         <TouchableOpacity style={styles.card}>
//                             <Image
//                                 source={ item.image_url ? { uri: item.image_url } : defaultImage }
//                                 style={styles.avatar}
//                             />
//
//                             <View>
//                                 <Text style={styles.name}>{item.username}</Text>
//                                 <Text style={styles.email}>{item.mail}</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </Link>
//                 )}
//             />
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
//     title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//     card: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         padding: 15,
//         marginBottom: 10,
//         borderRadius: 8,
//     },
//     avatar: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 15,
//     },
//     name: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#6200ee",
//     },
//     email: {
//         color: "#666",
//     },
// });
