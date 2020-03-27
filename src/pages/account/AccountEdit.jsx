import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import KeyboardMoney from "../../components/Modal/KeyboardMoney";

import { OutlinedTextField } from "react-native-material-textfield";
import { formatToMoney } from "../../utils/Number";
import { storeAccount, deleteAccount } from "../../model/Account";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function AccountEdit({ route, navigation }) {
    const [modal, setModal] = useState(null);

    const elName = useRef(null);
    const elInitialValue = useRef(null);

    useEffect(() => {
        const { params } = route;
        if (params) {
            elName.current.setValue(params.name);
            elInitialValue.current.setValue(formatToMoney(params.initialValue));
        }
    }, []);

    function handleEditInitialValue() {
        setModal({
            label: "Saldo Inicial",
            startValue: elInitialValue.current.value(),
            ok: val => elInitialValue.current.setValue(val),
            close: () => setModal(null)
        });
    }

    async function handleSaveAccount() {
        const name = elName.current.value();
        const initialValue = parseFloat(
            elInitialValue.current
                .value()
                .replace(/\./g, "")
                .replace(/,/g, ".")
        );
        if (name === "") {
            Alert.alert(null, "Informe o nome da conta");
            return;
        }
        if (route.params) {
            const { id } = route.params;
            await storeAccount({
                id,
                name,
                initialValue
            });
        } else {
            await storeAccount({
                name,
                initialValue
            });
        }
        navigation.goBack();
    }

    function handleDeleteAccount() {
        Alert.alert(null, "Deseja realmente excluir está conta?", [
            { text: "Não", onPress: () => {} },
            {
                text: "Sim",
                onPress: async () => {
                    const { id } = route.params;
                    await deleteAccount(id);
                    navigation.goBack();
                }
            }
        ]);
    }

    return (
        <View style={styles.viewRoot}>
            <View style={styles.viewInputName}>
                <OutlinedTextField
                    label="Nome"
                    animationDuration={100}
                    fontSize={19}
                    ref={elName}
                />
            </View>
            <View style={styles.viewInputInitialValue}>
                <TouchableOpacity onPress={handleEditInitialValue}>
                    <OutlinedTextField
                        label="Saldo Inicial"
                        prefix="R$"
                        fontSize={19}
                        editable={false}
                        ref={elInitialValue}
                        value="0,00"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.viewButton}>
                {route.params && (
                    <View style={styles.viewButtonDelete}>
                        <TouchableOpacity
                            onPress={handleDeleteAccount}
                            style={styles.button}
                        >
                            <MaterialIcons
                                name="delete"
                                size={55}
                                color="#C30000"
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.viewButtonSave}>
                    <TouchableOpacity
                        onPress={handleSaveAccount}
                        style={styles.button}
                    >
                        <Ionicons name="ios-save" size={55} color="#6200ee" />
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardMoney props={modal} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewRoot: {
        backgroundColor: "#FFF",
        height: "100%"
    },
    viewInputName: {
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15
    },
    viewInputInitialValue: {
        padding: 10,
        marginTop: 5
    },
    viewButton: {
        marginTop: 50,
        flexDirection: "row"
    },
    viewButtonDelete: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    viewButtonSave: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});
