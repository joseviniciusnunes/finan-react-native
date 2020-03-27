import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "./pages/dashboard/Dashboard";
import AccountList from "./pages/account/AccountList";
import AccountEdit from "./pages/account/AccountEdit";

import BackButtonStack from "./components/Button/BackButtonStack";
import MenuButtonStack from "./components/Button/MenuButtonStack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DashboardScreen({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: "Dashboard",
                    headerStyle: {
                        backgroundColor: "#0B6AC9"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                    headerLeft: () => (
                        <MenuButtonStack
                            onPress={() => navigation.openDrawer()}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
}

function AccountScreen() {
    return (
        <Stack.Navigator initialRouteName="AccountList">
            <Stack.Screen
                name="AccountList"
                component={AccountList}
                options={({ navigation }) => ({
                    title: "Contas",
                    headerStyle: {
                        backgroundColor: "#0B6AC9"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                    headerLeft: () => (
                        <BackButtonStack onPress={() => navigation.goBack()} />
                    )
                })}
            />
            <Stack.Screen
                name="AccountEdit"
                component={AccountEdit}
                options={({ navigation }) => ({
                    title: "Nova Conta",
                    headerStyle: {
                        backgroundColor: "#0B6AC9"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                    headerLeft: () => (
                        <BackButtonStack onPress={() => navigation.goBack()} />
                    )
                })}
            />
        </Stack.Navigator>
    );
}

function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Dashboard">
                <Drawer.Screen name="Dashboard" component={DashboardScreen} />
                <Drawer.Screen name="Conta" component={AccountScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
