import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { store } from '../../models';

// interface demoScreenProps { }

const DemoScreen = observer(() => {
    const { initStore } = store


    React.useEffect(() => {
        console.log('====================================');
        console.log("demoStore", initStore);
        console.log('====================================');
    }, [])
    return (
        <View style={styles.container}>
            <View>
                <Text>Hello Demo Mini App Data</Text>
                <View style={{ marginTop: 20, flexDirection: "column", justifyContent: "flex-start" }}>
                    <Text>Api: {initStore.api_url}</Text>
                    <Text>Project: {initStore.project}</Text>
                    <Text>Token: {initStore.token}</Text>
                </View>
            </View>

        </View>
    );
});

export default DemoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
});
