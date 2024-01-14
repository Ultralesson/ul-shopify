import React, { useEffect } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { HOME_SCREEN, PREPARING_ORDER_SCREEN } from "../../../constants/screens";
import {
    decrementQuantity,
    deleteItem,
    emptyBasket,
    incrementQuantity,
    selectBasketItems,
    selectBasketTotal,
} from "../../store/slices/basketSlice";
import { SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import { ArrowLeftIcon, TrashIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { userModel } from "../../../utilities/asyncStorage";
import { selectAuthState } from "../../store/slices/authSlice";

export const CartScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const basketItems = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const isAuthorized = useSelector(selectAuthState);

    useEffect(() => {
        dispatch(hideTabBar());
    }, []);

    return (
        <SafeAreaView className="bg-white flex-1">
            {basketItems.length === 0 && (
                <View className="flex justify-center">
                    <Image
                        testID="img-empty-cart"
                        accessibilityLabel="img-empty-cart"
                        nativeID="img-empty-cart"
                        source={require("../../../assets/images/empty-cart.jpg")}
                        className="w-full h-60"
                    />
                    <Text
                        testID="txt-empty-cart-message"
                        accessibilityLabel="txt-empty-cart-message"
                        nativeID="txt-empty-cart-message"
                        className="mx-auto text-gray-500 text-lg italic"
                    >
                        Your Cart is Empty!!
                    </Text>
                    <TouchableOpacity
                        testID="btn-back"
                        accessibilityLabel="btn-back"
                        nativeID="btn-back"
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <Text
                            testID="txt-continue-shopping"
                            accessibilityLabel="txt-continue-shopping"
                            nativeID="txt-continue-shopping"
                            className="mx-auto px-6 py-3 mt-3 text-white font-bold rounded-lg"
                            style={{ backgroundColor: SECONDARY_COLOR }}
                        >
                            Continue Shopping
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {basketItems.length > 0 && (
                <>
                    <TouchableOpacity
                        testID="btn-back"
                        accessibilityLabel="btn-back"
                        nativeID="btn-back"
                        className="ml-5 mt-3"
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <ArrowLeftIcon size={25} color="#000000" />
                    </TouchableOpacity>
                    <View className="text-lg">
                        <Text
                            testID="txt-my-cart"
                            accessibilityLabel="txt-my-cart"
                            nativeID="txt-my-cart"
                            className="text-lg font-bold mx-auto"
                        >
                            My Cart
                        </Text>
                    </View>
                    <View className="flex-1 justify-between">
                        <ScrollView>
                            {basketItems.map((product) => {
                                return (
                                    <View
                                        key={product.product_id}
                                        className="flex-row justify-between p-4 bg-gray-100 m-3 rounded-lg items-center"
                                    >
                                        <View className="flex-row space-x-2">
                                            <View>
                                                <Image
                                                    testID={`img-cart-product-${product.name
                                                        .toLowerCase()
                                                        .split(" ")
                                                        .join("-")}`}
                                                    accessibilityLabel={`img-cart-product-${product.name
                                                        .toLowerCase()
                                                        .split(" ")
                                                        .join("-")}`}
                                                    nativeID={`img-cart-product-${product.name
                                                        .toLowerCase()
                                                        .split(" ")
                                                        .join("-")}`}
                                                    source={{
                                                        uri: product.image_url,
                                                    }}
                                                    className="h-20 w-20 rounded-lg"
                                                />
                                            </View>
                                            <View className="flex justify-between">
                                                <View>
                                                    <Text
                                                        testID="txt-product-name"
                                                        accessibilityLabel="txt-product-name"
                                                        nativeID="txt-product-name"
                                                        className="font-bold"
                                                    >
                                                        {product.name}
                                                    </Text>

                                                    <Text
                                                        testID="txt-product-price"
                                                        accessibilityLabel="txt-product-price"
                                                        nativeID="txt-product-price"
                                                        className="font-bold"
                                                        style={{ color: TERNARY_COLOR }}
                                                    >
                                                        ₹ {product.price}
                                                    </Text>
                                                </View>
                                                <View className="flex-row space-x-2 items-center">
                                                    <TouchableOpacity
                                                        testID="btn-decrement"
                                                        accessibilityLabel="btn-decrement"
                                                        nativeID="btn-decrement"
                                                        className="bg-white px-4 rounded-lg"
                                                        onPress={() => {
                                                            dispatch(
                                                                decrementQuantity({
                                                                    id: product.product_id,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <Text
                                                            testID="txt-minus"
                                                            accessibilityLabel="txt-minus"
                                                            nativeID="txt-minus"
                                                            className="text-lg"
                                                        >
                                                            -
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <Text
                                                        testID="txt-product-quantity"
                                                        accessibilityLabel="txt-product-quantity"
                                                        nativeID="txt-product-quantity"
                                                        className="font-bold"
                                                    >
                                                        {product.quantity}
                                                    </Text>
                                                    <TouchableOpacity
                                                        testID="btn-increment"
                                                        accessibilityLabel="btn-increment"
                                                        nativeID="btn-increment"
                                                        className="bg-white px-4 rounded-lg"
                                                        onPress={() => {
                                                            dispatch(
                                                                incrementQuantity({
                                                                    id: product.product_id,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <Text
                                                            testID="txt-plus"
                                                            accessibilityLabel="txt-plus"
                                                            nativeID="txt-plus"
                                                            className="text-lg"
                                                        >
                                                            +
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                testID="btn-delete"
                                                accessibilityLabel="btn-delete"
                                                nativeID="btn-delete"
                                                onPress={() => {
                                                    dispatch(
                                                        deleteItem({
                                                            id: product.product_id,
                                                        })
                                                    );
                                                }}
                                            >
                                                <TrashIcon
                                                    testID="icon-delete"
                                                    accessibilityLabel="icon-delete"
                                                    nativeID="icon-delete"
                                                    size={25}
                                                    color={TERNARY_COLOR}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <View className="flex-row mx-4 mb-4 justify-between">
                            <View
                                className="py-3 px-14 border rounded-xl items-center"
                                style={{
                                    borderColor: TERNARY_COLOR,
                                }}
                            >
                                <Text
                                    testID="txt-total-price"
                                    accessibilityLabel="txt-total-price"
                                    nativeID="txt-total-price"
                                    className="text-xs text-gray-400 mb-1"
                                >
                                    Total Price
                                </Text>
                                <Text
                                    testID="txt-basket-total"
                                    accessibilityLabel="txt-basket-total"
                                    nativeID="txt-basket-total"
                                    className="font-bold text-md"
                                >
                                    ₹ {basketTotal}
                                </Text>
                            </View>
                            <View
                                className="px-10 rounded-xl justify-center"
                                style={{ backgroundColor: SECONDARY_COLOR }}
                            >
                                <TouchableOpacity
                                    testID="btn-place-order"
                                    accessibilityLabel="btn-place-order"
                                    nativeID="btn-place-order"
                                    onPress={() => {
                                        userModel("ADD_ORDER_DETAILS", {
                                            email: isAuthorized.email,
                                            cartItems: basketItems,
                                        }).then((data) => {
                                            dispatch(emptyBasket());
                                            navigation.navigate(PREPARING_ORDER_SCREEN);
                                        });
                                    }}
                                >
                                    <Text
                                        testID="txt-place-order"
                                        accessibilityLabel="txt-place-order"
                                        nativeID="txt-place-order"
                                        className="text-lg font-bold text-white"
                                    >
                                        Place Order
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};
