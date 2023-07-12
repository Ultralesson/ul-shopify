import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "../stack-navigators/HomeStackNavigator";
import ProfileStackNavigator from "../stack-navigators/ProfileStackNavigator";

import {
    HOME_TAB,
    PROFILE_TAB,
    EXPLORE_TAB,
    CART_TAB,
    TRACK_ORDER_TAB,
    HOME_SCREEN,
    PROFILE_SCREEN,
} from "../../constants/screens";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    TruckIcon,
    UserCircleIcon,
} from "react-native-heroicons/outline";
import { SECONDARY_COLOR } from "../../constants/colors";
import ExploreStackNavigator from "../stack-navigators/ExploreStackNavigator";
import CartStackNavigator from "../stack-navigators/CartStackNavigator";
import TrackOrderStackNavigator from "../stack-navigators/TrackOrderStackNavigator";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarActiveTintColor: SECONDARY_COLOR,
                    tabBarInactiveBackgroundColor: "white",
                    tabBarInactiveTintColor: "gray",
                }}
            >
                <Tab.Screen
                    name={HOME_TAB}
                    component={HomeStackNavigator}
                    options={{
                        tabBarIcon: ({ size, color }) => {
                            return <HomeIcon size={size} color={color} />;
                        },
                    }}
                />
                <Tab.Screen
                    name={CART_TAB}
                    component={CartStackNavigator}
                    options={{
                        tabBarIcon: ({ size, color }) => {
                            return <ShoppingCartIcon size={size} color={color} />;
                        },
                    }}
                />
                <Tab.Screen
                    name={EXPLORE_TAB}
                    component={ExploreStackNavigator}
                    options={({ route }) => ({
                        tabBarStyle: {
                            display: getTabBarVisibility(route),
                        },
                        tabBarIcon: ({ size, color }) => {
                            return <MagnifyingGlassIcon size={size} color={color} />;
                        },
                    })}
                />
                <Tab.Screen
                    name={TRACK_ORDER_TAB}
                    component={TrackOrderStackNavigator}
                    options={{
                        tabBarIcon: ({ size, color }) => {
                            return <TruckIcon size={size} color={color} />;
                        },
                    }}
                />
                <Tab.Screen
                    name={PROFILE_TAB}
                    component={ProfileStackNavigator}
                    options={({ route }) => ({
                        tabBarStyle: {
                            display: getTabBarVisibility(route),
                        },
                        tabBarIcon: ({ size, color }) => {
                            return <UserCircleIcon size={size} color={color} />;
                        },
                    })}
                />
            </Tab.Navigator>
        </>
    );
};

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    // This is used to hide the tab navigator on default tab screen
    const excludeTabNavigatorForDefaultTabScreens = [];
    if (excludeTabNavigatorForDefaultTabScreens.includes(route.name)) {
        return "none";
    }
    console.log(route, routeName)
    const toIncludeTheTabNavigator = [HOME_SCREEN, PROFILE_SCREEN]; // Include the screens in which we need to show tab navigator
    return routeName === undefined || toIncludeTheTabNavigator.includes(routeName) ? "flex" : "none";
};

export default HomeTabNavigator;
