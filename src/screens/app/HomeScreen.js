import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomMessageModal from "../../components/common/CustomMessageModal";
import { changeRegistrationModalState, selectRegistrationModalState } from "../../store/slices/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { EXPLORE_SCREEN, HOME_TAB, LOADING_SCREEN, WEBVIEW_SCREEN } from "../../../constants/screens";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { TERNARY_COLOR } from "../../../constants/colors";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import { ScrollView } from "react-native-gesture-handler";
import CategoryScreen from "../../components/app/CategoriesScreen";
import FeaturedRow from "../../components/app/FeaturedRow";
import newArrivals from "../../../assets/data/new-arrivals.json";
import trendingProducts from "../../../assets/data/trending-products.json";
import topRatedProducts from "../../../assets/data/top-rated-products.json";
import bestSellers from "../../../assets/data/best-sellers.json";
import { userModel } from "../../../utilities/asyncStorage";

const HomeScreen = () => {
    const navigation = useNavigation();
    const isAuthorized = useSelector(selectAuthState);
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");

    useEffect(() => {
        userModel("GET_USER", { email: isAuthorized.email }).then((response) => {
            setUsername(response.data?.fullName);
        });
        // On home screen dispatch show the tab bar, as it may have hidden due to hide tab bar dispatch in some other screen
        dispatch(showTabBar());
        navigation.navigate(HOME_TAB);
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5" accessible={false}>
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
            <View className="flex-row pb-3 items-center mx-4 space-x-2" accessible={false}>
                <TouchableOpacity
                    accessible={true}
                    testID="btn-shopping-bag"
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(LOADING_SCREEN, {
                            navigateTo: WEBVIEW_SCREEN,
                        });
                    }}
                >
                    <Image
                        accessible={true}
                        testID="img-shopping-bag"
                        source={require("../../../assets/icons/shopping-bag.png")}
                        className="h-7 w-7  p-4 rounded"
                    />
                </TouchableOpacity>
                <View className="flex-1" accessible={false}>
                    <Text accessible={true} testID="txt-browse-and-buy" className="font-bold text-gray-400 text-xs">
                        Browser & Buy!
                    </Text>
                    {!username ? (
                        <Text accessible={true} testID="txt-welcome-back" className="font-bold text-xl">
                            Welcome Back!!
                        </Text>
                    ) : (
                        <Text accessible={true} testID="txt-username" className="font-bold text-xl">
                            {username.charAt(0).toUpperCase() + username.slice(1)}
                        </Text>
                    )}
                </View>
                <View className="pr-1" accessible={false}>
                    <Image
                        accessible={true}
                        testID="img-ultralesson-logo"
                        source={require("../../../assets/icons/ultralesson-logo.png")}
                        className="h-10 w-14"
                    />
                </View>
            </View>
            <View className="flex-row items-center space-x-2 pb-2 mx-2" accessible={false}>
                <TouchableOpacity
                    accessible={true}
                    testID="btn-search"
                    className="flex-row flex-1 space-x-2 bg-gray-50 rounded-md items-center"
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(EXPLORE_SCREEN);
                    }}
                >
                    <View
                        accessible={false}
                        className="flex-row flex-1 space-x-2 bg-gray-200 p-2 rounded-md items-center"
                    >
                        <MagnifyingGlassIcon accessible={true} testID="img-search-icon" color={TERNARY_COLOR} />

                        <Text testID="txt-search-for-more" accessible={true} className="text-gray-400">
                            Search for more!!
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView
                accessible={false}
                className="bg-gray-100 mb-5"
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
                    title={trendingProducts.title}
                    description={trendingProducts.description}
                    productsList={trendingProducts.products}
                />
                <FeaturedRow
                    title={topRatedProducts.title}
                    description={topRatedProducts.description}
                    productsList={topRatedProducts.products}
                />
                <FeaturedRow
                    title={bestSellers.title}
                    description={bestSellers.description}
                    productsList={bestSellers.products}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
