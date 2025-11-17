import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(token: string) {
    await AsyncStorage.setItem("userToken", token);
}

export async function logout() {
    await AsyncStorage.clear();
}

export async function isLoggedIn() {
    const token = await AsyncStorage.getItem("userToken");
    return !!token;
}
