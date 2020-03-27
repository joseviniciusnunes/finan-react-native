import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getAccount } from "../../model/Account";

import { formatToMoneyReal } from "../../utils/Number";

const data = [
    { id: 1, name: "Carteira", initialValue: 50 },
    { id: 2, name: "Conta Corrente BB", initialValue: 2565 },
    { id: 3, name: "Cartão Crédito", initialValue: 5464 }
];

export default function AccountList({ navigation }) {
    const [accounts, setAccounts] = useState([]);

    async function loadingAccounts() {
        setAccounts(await getAccount());
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            loadingAccounts();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.viewRoot}>
            <TouchableOpacity
                style={styles.buttonFloat}
                onPress={() => navigation.push("AccountEdit")}
            >
                <Ionicons name="ios-add" size={30} color="white" />
            </TouchableOpacity>
            <FlatList
                data={accounts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={props => (
                    <ItemAccount {...props} navigation={navigation} />
                )}
            />
        </View>
    );
}

function ItemAccount({ item, navigation }) {
    return (
        <TouchableOpacity
            style={styles.viewItemAccount}
            onPress={() => navigation.push("AccountEdit", item)}
        >
            <View style={styles.viewItemName}>
                <Text style={styles.textLabel}>Nome</Text>
                <Text style={styles.textName}>{item.name}</Text>
            </View>
            <View style={styles.viewItemInitialValue}>
                <Text style={styles.textLabel}>Saldo Inicial</Text>
                <Text style={styles.textInitialValue}>
                    {formatToMoneyReal(item.initialValue)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewRoot: {
        backgroundColor: "#FFF",
        height: "100%"
    },
    viewItemAccount: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        margin: 5,
        elevation: 5,
        borderBottomWidth: 0,
        borderRadius: 8,
        backgroundColor: "#FFF"
    },
    viewItemName: {
        flex: 1
    },
    viewItemInitialValue: {
        flex: 1,
        alignItems: "center"
    },
    textName: {
        fontSize: 15
    },
    textLabel: {
        fontSize: 10
    },
    textInitialValue: {
        fontSize: 16,
        color: "#153265"
    },
    buttonFloat: {
        zIndex: 1,
        position: "absolute",
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        right: 21,
        bottom: 21,
        backgroundColor: "#6200EE",
        borderRadius: 50,
        elevation: 10,
        borderBottomWidth: 0
    }
});
