import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import { observer } from "mobx-react-lite"
import SplashScreen from 'react-native-splash-screen'
import { useStores } from '../../models';
import AsyncStorage from "@react-native-async-storage/async-storage"
const HomeScreen = observer(({
    navigation
}) => {
    const { demoStore } = useStores()
    const [xToken, setToken] = useState("")
    useEffect(() => {
        SplashScreen.hide();
        getData()
        Linking.addEventListener("url", handleLinking)
    }, [])
    getData = async () => {
        const token = await AsyncStorage.getItem("token")
        console.log("token", token);
        setToken(token)
    }
    const data = {
        type: "login",
        returnUrl: "ubox://mini"
    }
    const handleLinking = (event) => {
        const data = JSON.parse(decodeURIComponent(event.url.replace("ubox://mini/login/", "")))
        AsyncStorage.setItem("token", data.token)
        setToken(data.token)
    }
    return (
        <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", flex: 1, padding: 24 }}>
            <Text>Home Demo Mini App</Text>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate("demo")}>
                <Text>Go to Demo Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => Linking.canOpenURL('ubox://main/login')
                .then(res => {
                    Linking.openURL('ubox://main/login/' + encodeURIComponent(JSON.stringify(data)))
                }).catch(err => {
                    console.log("err", err)
                })
            }>
                <Text>Login Deep Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={async () => {
                AsyncStorage.removeItem("token")
                setToken("")
            }
            }>
                <Text>Remove Token</Text>
            </TouchableOpacity>
            {!!xToken && <Text style={{ marginTop: 20 }}>
                Token : {xToken}
            </Text>}
        </View>
    )
});

export default HomeScreen;
