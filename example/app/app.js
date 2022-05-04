import "./i18n";
import "./utils/ignore-warnings"
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { initFonts } from "./theme/fonts";
import { ErrorBoundary } from "./screens/Error/errorBoundary"
import { RootStoreProvider, setupRootStore } from "./models"
import Config from "react-native-config";
import { subject, setInit } from "react-native-module-template";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const App = ({ }) => {
    const [rootStore, setRootStore] = useState(undefined)
    const [token, setToken] = useState("")

    useEffect(() => {
        ; (async () => {
            await initFonts()
            setupRootStore().then(setRootStore)
            try {
                const initialUrl = await Linking.getInitialURL();
                if (initialUrl) {
                    console.log("initialUrl", initialUrl);
                    const data = JSON.parse(decodeURIComponent(initialUrl.replace("ubox://mini/login/", "")))
                    AsyncStorage.setItem("token", data.token)
                    // AsyncStorage.setItem("token",  )
                }
                console.log("Linking.getInitialURL()", initialUrl);

            } catch (error) {
                console.log("error", error);
            }
        })()
        setInit({ api_url: Config.API_URL, token: "token demo", project: "demo project" })

    }, [])



    const {
        initialNavigationState,
        onNavigationStateChange,
        isRestored: isNavigationStateRestored,
    } = useNavigationPersistence(NAVIGATION_PERSISTENCE_KEY)
    if (!rootStore || !isNavigationStateRestored) return null
    return (
        <RootStoreProvider value={rootStore}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <ErrorBoundary catchErrors={"always"}>
                    <AppNavigator
                        initialState={initialNavigationState}
                        onStateChange={onNavigationStateChange}
                    />
                </ErrorBoundary>
            </SafeAreaProvider>
        </RootStoreProvider>
    )
};

export default App;
