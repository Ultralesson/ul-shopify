import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    InformationCircleIcon,
    StarIcon,
    PlusIcon,
    ShoppingCartIcon,
    PlusCircleIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { QUATERNARY_COLOR, SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import {
    CART_SCREEN,
    EXPLORE_SCREEN,
    HOME_SCREEN,
    LOADING_SCREEN,
    PRODUCT_SCREEN,
    PROFILE_TAB,
} from "../../../constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import { addToBasket, selectBasketItems } from "../../store/slices/basketSlice";
import { selectAuthState } from "../../store/slices/authSlice";

const Label = ({ type, text }) => {
    return (
        <View className="flex-wrap flex-row items-center pb-2" accessible={false}>
            <Text accessible={true} className="px-4 text-gray-500">
                {type}
            </Text>
            <Text accessible={true} className="pt-2 pb-2 px-4 bg-blue-200 rounded-lg font-bold text-gray-700">
                {text}
            </Text>
        </View>
    );
};

export const ProductScreen = () => {
    const [showFeatures, setShowFeatures] = useState(false);
    const [isItemAddedToCart, setItemAddedToCart] = useState(false);
    const {
        params: { product },
    } = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const basketItems = useSelector(selectBasketItems);
    const isAuthorized = useSelector(selectAuthState);

    return (
        <SafeAreaView className="bg-white flex-1" accessible={false}>
            <View
                accessible={false}
                className={`absolute left-5 rounded-full p-2 mt-4 bg-white z-10 ${
                    Platform.OS === "ios" ? "top-16" : "top-8"
                }`}
            >
                <TouchableOpacity
                    accessible={true}
                    testID="btn-back"
                    onPress={() => {
                        dispatch(showTabBar());
                        navigation.navigate(HOME_SCREEN);
                    }}
                >
                    <ArrowLeftIcon size={25} color="#000000" />
                </TouchableOpacity>
            </View>

            <View
                className={`absolute p-2 rounded-full mt-4 bg-gray-50 z-10 ${
                    Platform.OS === "ios" ? "top-16" : "top-8"
                }`}
                style={{
                    right: 75,
                }}
                accessible={false}
            >
                <TouchableOpacity
                    accessible={true}
                    testID="btn-search"
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(EXPLORE_SCREEN, {
                            navigateBackTo: PRODUCT_SCREEN,
                            product,
                        });
                    }}
                >
                    <MagnifyingGlassIcon size={25} color="#000000" />
                </TouchableOpacity>
            </View>

            {/* Shopping Cart Button */}
            <View
                accessible={false}
                className={`absolute right-5 p-2 rounded-full mt-4 bg-gray-50 z-10 ${
                    Platform.OS === "ios" ? "top-16" : "top-8"
                }`}
            >
                <TouchableOpacity
                    accessible={true}
                    testID="btn-cart"
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(LOADING_SCREEN, {
                            navigateTo: CART_SCREEN,
                        });
                    }}
                >
                    <ShoppingCartIcon size={25} color="#000000" />
                </TouchableOpacity>
            </View>
            <View
                accessible={false}
                className={`absolute right-5 rounded-full mt-4 p-1 z-10 ${Platform.OS === "ios" ? "top-14" : "top-6"}`}
                style={{ backgroundColor: TERNARY_COLOR }}
            >
                <Text accessible={true} testID="txt-cart-count" className="font-bold text-xs text-white">
                    {basketItems.length}
                </Text>
            </View>
            <ScrollView className="mb-5" accessible={false}>
                <View className="relative" accessible={false}>
                    <Image
                        accessible={true}
                        testID="img-product"
                        className="w-full h-96 bg-gray-300"
                        source={{
                            uri: product.image_url,
                        }}
                    />

                    <View className="bg-white" accessible={false}>
                        <View className="px-4 pt-4" accessible={false}>
                            <Text accessible={true} testID="txt-product-name" className="text-2xl font-bold">
                                {product.name}
                            </Text>
                            <View accessible={false} className="flex-row items-center justify-between">
                                <View accessible={false} className="flex-row items-center space-x-1 mt-2">
                                    <StarIcon
                                        accessible={true}
                                        testID="icon-rating"
                                        size={22}
                                        opacity={0.5}
                                        color={TERNARY_COLOR}
                                        fill={TERNARY_COLOR}
                                    />
                                    <Text
                                        accessible={true}
                                        testID="txt-rating-category"
                                        className="text-xs text-gray-400 font-bold"
                                    >
                                        <Text accessible={true} className="mx-1">
                                            {product.rating}
                                        </Text>{" "}
                                        . {product.category}
                                    </Text>
                                </View>
                                <View accessible={false} className="flex-row items-end space-x-1">
                                    <Text accessible={true} testID="txt-rupee-symbol" className="mb-1">
                                        ₹
                                    </Text>
                                    <Text accessible={true} testID="txt-product-price" className="text-xl font-bold">
                                        {product.price}
                                    </Text>
                                </View>
                            </View>
                            <Text
                                testID="txt-product-description"
                                accessible={true}
                                className="text-gray-500 mt-2 pb-4 leading-5"
                            >
                                {product.description}
                            </Text>
                        </View>
                    </View>

                    <Label testID="label-product-brand" type={"brand"} text={product.brand} />
                    <Label testID="txt-product-seller-name" type={"seller"} text={product.seller.seller_name} />

                    <TouchableOpacity
                        accessible={true}
                        testID="btn-display-features"
                        className="bg-white flex-row items-center space-x-2 p-4 "
                        onPress={() => {
                            setShowFeatures(!showFeatures);
                        }}
                    >
                        <InformationCircleIcon
                            accessible={true}
                            testID="icon-information"
                            size={25}
                            color={TERNARY_COLOR}
                        />
                        <Text accessible={true} testID="txt-features" className="pl-2 flex-1 text-md font-bold">
                            Features
                        </Text>
                        {showFeatures === false ? (
                            <ChevronDownIcon accessible={true} testID="icon-down" size={25} color={TERNARY_COLOR} />
                        ) : (
                            <ChevronUpIcon accessible={true} testID="icon-up" size={25} color={TERNARY_COLOR} />
                        )}
                    </TouchableOpacity>
                    {showFeatures && (
                        <View className="bg-white pb-4 px-4" accessible={false}>
                            {product.features.map((feature) => {
                                return (
                                    <View
                                        accessible={false}
                                        key={feature.id}
                                        className="flex-row items-center pt-4 space-x-2"
                                    >
                                        <PlusIcon
                                            accessible={true}
                                            testID="icon-plus"
                                            size={15}
                                            color={QUATERNARY_COLOR}
                                        />
                                        <Text
                                            accessible={true}
                                            testID="txt-feature-description"
                                            className="italic text-gray-500"
                                        >
                                            {feature.description}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                </View>
            </ScrollView>

            <View className="mb-5" accessible={false}>
                <TouchableOpacity
                    accessible={true}
                    testID="btn-cart"
                    className="mx-5 p-3 rounded-lg flex-row"
                    style={{ backgroundColor: SECONDARY_COLOR }}
                    onPress={() => {
                        if (!isAuthorized.type) {
                            dispatch(showTabBar());
                            navigation.navigate(PROFILE_TAB);
                        } else {
                            if (!isItemAddedToCart) {
                                dispatch(
                                    addToBasket({
                                        product: {
                                            ...product,
                                            quantity: 1,
                                        },
                                    })
                                );
                                setItemAddedToCart(true);
                            } else {
                                navigation.navigate(LOADING_SCREEN, {
                                    navigateTo: CART_SCREEN,
                                });
                            }
                        }
                    }}
                >
                    {!isItemAddedToCart ? (
                        <Text
                            accessible={true}
                            testID="txt-add-to-cart"
                            className="flex-1 text-white  font-bold text-lg text-center"
                        >
                            Add To Cart
                        </Text>
                    ) : (
                        <Text
                            accessible={true}
                            testID="txt-go-to-cart"
                            className="flex-1 text-white  font-bold text-lg text-center"
                        >
                            Go To Cart
                        </Text>
                    )}

                    <PlusCircleIcon accessible={true} testID="icon-plus" size={30} color="#ffffff" opacity={0.9} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
