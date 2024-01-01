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
    CART_SCREEN,
    TRACK_ORDER_SCREEN,
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
import { Animated, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectScreenStack } from "../../store/slices/appStateSlice";
import { selectIsTabBarVisible } from "../../store/slices/appUIStateSlice";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    const activeScreen = useSelector(selectScreenStack);
    const isTabBarVisible = useSelector(selectIsTabBarVisible);

    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    const [tabBarSlider, setTabBarSlider] = useState(true);

    const getWidth = () => {
        const width = Dimensions.get("window").width;
        return width / 5;
    };

    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);

        // This is used to hide the tab navigator on default tab screen
        const excludeTabNavigatorForDefaultTabScreens = [EXPLORE_TAB];
        if (excludeTabNavigatorForDefaultTabScreens.includes(route.name)) {
            return "none";
        }
        const toIncludeTheTabNavigator = [HOME_SCREEN, PROFILE_SCREEN]; // Include the screens in which we need to show tab navigator

        return routeName === undefined || toIncludeTheTabNavigator.includes(routeName) ? "flex" : "none";
    };

    useEffect(() => {
        // This logic handles the display of slide bar on only tab screens
        const toIncludeSlideBar = [HOME_SCREEN, CART_SCREEN, TRACK_ORDER_SCREEN, PROFILE_SCREEN];
        if (toIncludeSlideBar.includes(activeScreen)) {
            setTabBarSlider(true);
        } else {
            setTabBarSlider(false);
        }
    }, [activeScreen]);

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
                            return <HomeIcon size={size} color={color} />;
                        },
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: 0,
                                useNativeDriver: true,
                            }).start();
                        },
                    })}
                />
                <Tab.Screen
                    name={CART_TAB}
                    component={CartStackNavigator}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarBadge: 0,
                        tabBarBadgeStyle: {
                            backgroundColor: SECONDARY_COLOR,
                            color: "gray",
                        },
                        tabBarIcon: ({ size, color }) => {
                            return <ShoppingCartIcon size={size} color={color} />;
                        },
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: getWidth(),
                                useNativeDriver: true,
                            }).start();
                        },
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
                            return <MagnifyingGlassIcon size={size} color={color} />;
                        },
                    })}
                />
                <Tab.Screen
                    name={TRACK_ORDER_TAB}
                    component={TrackOrderStackNavigator}
                    options={{
                        tabBarLabel: "Track",
                        tabBarIcon: ({ size, color }) => {
                            return <TruckIcon size={size} color={color} />;
                        },
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: getWidth() * 3,
                                useNativeDriver: true,
                            }).start();
                        },
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
                            return <UserCircleIcon size={size} color={color} />;
                        },
                    })}
                    listeners={({ navigation, route }) => ({
                        tabPress: (event) => {
                            Animated.spring(tabOffsetValue, {
                                toValue: getWidth() * 4,
                                useNativeDriver: true,
                            }).start();
                        },
                    })}
                />
            </Tab.Navigator>

            {isTabBarVisible && tabBarSlider && (
                <Animated.View
                    style={{
                        backgroundColor: SECONDARY_COLOR,
                        height: 2,
                        width: getWidth(),
                        position: "absolute",
                        bottom: 50,
                        transform: [{ translateX: tabOffsetValue }],
                    }}
                ></Animated.View>
            )}
        </>
    );
};

export default HomeTabNavigator;
