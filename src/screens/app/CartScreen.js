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
        <SafeAreaView className="bg-white flex-1" accessible={false}>
            {basketItems.length === 0 && (
                <View className="flex justify-center" accessible={false}>
                    <Image
                        accessible={true}
                        testID="img-empty-cart"
                        source={require("../../../assets/images/empty-cart.jpg")}
                        className="w-full h-60"
                    />
                    <Text
                        accessible={true}
                        testID="txt-empty-cart-message"
                        className="mx-auto text-gray-500 text-lg italic"
                    >
                        Your Cart is Empty!!
                    </Text>
                    <TouchableOpacity
                        accessible={true}
                        testID="btn-back"
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <Text
                            accessible={true}
                            testID="txt-continue-shopping"
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
                        accessible={true}
                        testID="btn-back"
                        className="ml-5 mt-3"
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <ArrowLeftIcon size={25} color="#000000" />
                    </TouchableOpacity>
                    <View className="text-lg" accessible={false}>
                        <Text accessible={true} testID="txt-my-cart" className="text-lg font-bold mx-auto">
                            My Cart
                        </Text>
                    </View>
                    <View className="flex-1 justify-between" accessible={false}>
                        <ScrollView accessible={false}>
                            {basketItems.map((product) => {
                                return (
                                    <View
                                        accessible={false}
                                        key={product.product_id}
                                        className="flex-row justify-between p-4 bg-gray-100 m-3 rounded-lg items-center"
                                    >
                                        <View className="flex-row space-x-2" accessible={false}>
                                            <View accessible={false}>
                                                <Image
                                                    accessible={true}
                                                    testID={`img-cart-product-${product.name
                                                        .toLowerCase()
                                                        .split(" ")
                                                        .join("-")}`}
                                                    source={{
                                                        uri: product.image_url,
                                                    }}
                                                    className="h-20 w-20 rounded-lg"
                                                />
                                            </View>
                                            <View className="flex justify-between" accessible={false}>
                                                <View accessible={false}>
                                                    <Text
                                                        accessible={true}
                                                        testID="txt-product-name"
                                                        className="font-bold"
                                                    >
                                                        {product.name}
                                                    </Text>

                                                    <Text
                                                        accessible={true}
                                                        testID="txt-product-price"
                                                        className="font-bold"
                                                        style={{ color: TERNARY_COLOR }}
                                                    >
                                                        ₹ {product.price}
                                                    </Text>
                                                </View>
                                                <View accessible={false} className="flex-row space-x-2 items-center">
                                                    <TouchableOpacity
                                                        accessible={true}
                                                        testID="btn-decrement"
                                                        className="bg-white px-4 rounded-lg"
                                                        onPress={() => {
                                                            dispatch(
                                                                decrementQuantity({
                                                                    id: product.product_id,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <Text accessible={true} testID="txt-minus" className="text-lg">
                                                            -
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <Text
                                                        accessible={true}
                                                        testID="txt-product-quantity"
                                                        className="font-bold"
                                                    >
                                                        {product.quantity}
                                                    </Text>
                                                    <TouchableOpacity
                                                        accessible={true}
                                                        testID="btn-increment"
                                                        className="bg-white px-4 rounded-lg"
                                                        onPress={() => {
                                                            dispatch(
                                                                incrementQuantity({
                                                                    id: product.product_id,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <Text accessible={true} testID="txt-plus" className="text-lg">
                                                            +
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View accessible={false}>
                                            <TouchableOpacity
                                                accessible={true}
                                                testID="btn-delete"
                                                onPress={() => {
                                                    dispatch(
                                                        deleteItem({
                                                            id: product.product_id,
                                                        })
                                                    );
                                                }}
                                            >
                                                <TrashIcon
                                                    accessible={true}
                                                    testID="icon-delete"
                                                    size={25}
                                                    color={TERNARY_COLOR}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <View className="flex-row mx-4 mb-4 justify-between" accessible={false}>
                            <View
                                accessible={false}
                                className="py-3 px-14 border rounded-xl items-center"
                                style={{
                                    borderColor: TERNARY_COLOR,
                                }}
                            >
                                <Text accessible={true} testID="txt-total-price" className="text-xs text-gray-400 mb-1">
                                    Total Price
                                </Text>
                                <Text accessible={true} testID="txt-basket-total" className="font-bold text-md">
                                    ₹ {basketTotal}
                                </Text>
                            </View>
                            <View
                                accessible={false}
                                className="px-10 rounded-xl justify-center"
                                style={{ backgroundColor: SECONDARY_COLOR }}
                            >
                                <TouchableOpacity
                                    accessible={true}
                                    testID="btn-place-order"
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
                                        accessible={true}
                                        testID="txt-place-order"
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
