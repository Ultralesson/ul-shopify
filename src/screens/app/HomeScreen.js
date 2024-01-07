import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomMessageModal from "../../components/common/CustomMessageModal";
import { changeRegistrationModalState, selectRegistrationModalState } from "../../store/slices/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { EXPLORE_SCREEN, HOME_TAB } from "../../../constants/screens";
import { ChevronDownIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { TERNARY_COLOR } from "../../../constants/colors";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import { ScrollView } from "react-native-gesture-handler";
import CategoryScreen from "../../components/app/CategoriesScreen";
import FeaturedRow from "../../components/app/FeaturedRow";
import newArrivals from "../../../assets/data/new-arrivals.json";

const HomeScreen = () => {
    const navigation = useNavigation();
    const isAuthorized = useSelector(selectAuthState);
    const dispatch = useDispatch();

    useEffect(() => {
        // On home screen dispatch show the tab bar, as it may have hidden due to hide tab bar dispatch in some other screen
        dispatch(showTabBar());
        navigation.navigate(HOME_TAB);
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5">
            {/* Keeping the modals on the very top, as they don't effect other page components */}
            {isAuthorized.type === "register" && (
                <CustomMessageModal
                    gifOrImage={require("../../../assets/gifs/success.gif")}
                    selector={selectRegistrationModalState}
                    resetState={changeRegistrationModalState}
                    typeOfMessage="success"
                    messages={["Registration is successful", "Welcome to Ul-Shopify"]}
                />
            )}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image source={require("../../../assets/icons/shopping-bag.png")} className="h-7 w-7  p-4 rounded" />
                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Browser & Buy!</Text>
                    <Text className="font-bold text-xl">
                        Current Location <ChevronDownIcon size={20} color={TERNARY_COLOR} />
                    </Text>
                </View>
                <View className="pr-1">
                    <Image source={require("../../../assets/icons/ultralesson-logo.png")} className="h-10 w-14" />
                </View>
            </View>
            <View className="flex-row items-center space-x-2 pb-2 mx-2">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2 rounded-md items-center">
                    <MagnifyingGlassIcon color={TERNARY_COLOR} />
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(hideTabBar());
                            navigation.navigate(EXPLORE_SCREEN);
                        }}
                    >
                        <Text className="text-gray-400">Search for more!!</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                <CategoryScreen />
                <FeaturedRow
                    title={newArrivals.title}
                    description={newArrivals.description}
                    productsList={newArrivals.products}
                />
                <FeaturedRow
                    title={"Trending Products"}
                    description={"High demand among users"}
                    productsList={newArrivals.products}
                />
                <FeaturedRow
                    title={"Top-Rated Products"}
                    description={"Products with the highest customer ratings and positive reviews"}
                    productsList={newArrivals.products}
                />
                <FeaturedRow
                    title={"Best Sellers"}
                    description={"Top-Selling Products"}
                    productsList={newArrivals.products}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
