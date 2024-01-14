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
    SPLASH_SCREEN,
} from "../../../constants/screens";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    TruckIcon,
    UserCircleIcon,
} from "react-native-heroicons/outline";
import { SECONDARY_COLOR } from "../../../constants/colors";
import ExploreStackNavigator from "../stack-navigators/ExploreStackNavigator";
import CartStackNavigator from "../stack-navigators/CartStackNavigator";
import TrackOrderStackNavigator from "../stack-navigators/TrackOrderStackNavigator";
import { useSelector } from "react-redux";
import { selectIsTabBarVisible } from "../../store/slices/appUIStateSlice";
import { selectBasketItems } from "../../store/slices/basketSlice";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    const isTabBarVisible = useSelector(selectIsTabBarVisible);
    const basketItems = useSelector(selectBasketItems);

    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);

        // This is used to hide the tab navigator on default tab screen
        const excludeTabNavigatorForDefaultTabScreens = [EXPLORE_TAB, PROFILE_TAB];
        if (excludeTabNavigatorForDefaultTabScreens.includes(route.name)) {
            return "none";
        }
        const toIncludeTheTabNavigator = [HOME_SCREEN, PROFILE_SCREEN]; // Include the screens in which we need to show tab navigator

        return routeName === undefined || toIncludeTheTabNavigator.includes(routeName) ? "flex" : "none";
    };

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarActiveTintColor: SECONDARY_COLOR,
                    tabBarInactiveBackgroundColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        shadowRadius: 10,
                        shadowColor: "gray",
                        // Sometimes when we want to hide the tab navigator by performing some actions in the screen
                        // Then we set the state isTabBarVisible to false for not to display and true to be displayed
                        display: isTabBarVisible === true ? "flex" : "none",
                    },
                }}
            >
                <Tab.Screen
                    name={HOME_TAB}
                    component={HomeStackNavigator}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ size, color }) => {
                            return (
                                <HomeIcon
                                    testID="icon-home"
                                    accessibilityLabel="icon-home"
                                    nativeID="icon-home"
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {},
                    })}
                />
                <Tab.Screen
                    name={CART_TAB}
                    component={CartStackNavigator}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarBadge: basketItems.length,
                        tabBarBadgeStyle: {
                            backgroundColor: SECONDARY_COLOR,
                            color: "gray",
                        },
                        tabBarIcon: ({ size, color }) => {
                            return (
                                <ShoppingCartIcon
                                    testID="icon-cart"
                                    accessibilityLabel="icon-cart"
                                    nativeID="icon-cart"
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {},
                    })}
                />
                <Tab.Screen
                    name={EXPLORE_TAB}
                    component={ExploreStackNavigator}
                    options={({ route }) => ({
                        tabBarLabel: "Explore",
                        tabBarStyle: {
                            display: getTabBarVisibility(route),
                        },
                        tabBarIcon: ({ size, color }) => {
                            return (
                                <MagnifyingGlassIcon
                                    testID="icon-explore"
                                    accessibilityLabel="icon-explore"
                                    nativeID="icon-explore"
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    })}
                />
                <Tab.Screen
                    name={TRACK_ORDER_TAB}
                    component={TrackOrderStackNavigator}
                    options={{
                        tabBarLabel: "Track",
                        tabBarIcon: ({ size, color }) => {
                            return (
                                <TruckIcon
                                    testID="icon-track-order"
                                    accessibilityLabel="icon-track-order"
                                    nativeID="icon-track-order"
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {},
                    })}
                />
                <Tab.Screen
                    name={PROFILE_TAB}
                    component={ProfileStackNavigator}
                    options={({ route }) => ({
                        tabBarLabel: "Profile",
                        tabBarStyle: {
                            display: getTabBarVisibility(route),
                        },
                        tabBarIcon: ({ size, color }) => {
                            return (
                                <UserCircleIcon
                                    testID="icon-profile"
                                    accessibilityLabel="icon-profile"
                                    nativeID="icon-profile"
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    })}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {},
                    })}
                />
            </Tab.Navigator>
        </>
    );
};

export default HomeTabNavigator;
