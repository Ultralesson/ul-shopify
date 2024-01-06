import React, { useEffect } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { CART_SCREEN, HOME_SCREEN, HOME_TAB, PREPARING_ORDER_SCREEN } from "../../../constants/screens";
import basketSlice, {
    decrementQuantity,
    deleteItem,
    incrementQuantity,
    selectBasketItems,
    selectBasketTotal,
} from "../../store/slices/basketSlice";
import { QUATERNARY_COLOR, SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import { ArrowLeftIcon, TrashIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export const CartScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const basketItems = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    useEffect(() => {
        dispatch(hideTabBar());
    }, []);

    return (
        <SafeAreaView className="bg-white flex-1">
            {basketItems.length === 0 && (
                <View className="flex justify-center">
                    <Image source={require("../../../assets/images/empty-cart.jpg")} className="w-full h-60" />
                    <Text className="mx-auto text-gray-500 text-lg italic">Your Cart is Empty!!</Text>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <Text
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
                        className="ml-5 mt-3"
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <ArrowLeftIcon size={25} color="#000000" />
                    </TouchableOpacity>
                    <View className="text-lg">
                        <Text className="text-lg font-bold mx-auto">My Cart</Text>
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
                                                    source={{
                                                        uri: product.image_url,
                                                    }}
                                                    className="h-20 w-20 rounded-lg"
                                                />
                                            </View>
                                            <View className="flex justify-between">
                                                <View>
                                                    <Text className="font-bold">{product.name}</Text>

                                                    <Text className="font-bold" style={{ color: TERNARY_COLOR }}>
                                                        ₹ {product.price}
                                                    </Text>
                                                </View>
                                                <View className="flex-row space-x-2 items-center">
                                                    <TouchableOpacity
                                                        className="bg-white px-4 rounded-lg"
                                                        onPress={() => {
                                                            dispatch(
                                                                decrementQuantity({
                                                                    id: product.product_id,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <Text className="text-lg">-</Text>
                                                    </TouchableOpacity>
                                                    <Text className="font-bold">{product.quantity}</Text>
                                                    <TouchableOpacity
                                                        className="bg-white px-4 rounded-lg"
                                                        onPress={() => {
                                                            dispatch(
                                                                incrementQuantity({
                                                                    id: product.product_id,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <Text className="text-lg">+</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    dispatch(
                                                        deleteItem({
                                                            id: product.product_id,
                                                        })
                                                    );
                                                }}
                                            >
                                                <TrashIcon size={25} color={TERNARY_COLOR} />
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
                                <Text className="text-xs text-gray-400 mb-1">Total Price</Text>
                                <Text className="font-bold text-md">₹ {basketTotal}</Text>
                            </View>
                            <View
                                className="px-10 rounded-xl justify-center"
                                style={{ backgroundColor: SECONDARY_COLOR }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(PREPARING_ORDER_SCREEN);
                                    }}
                                >
                                    <Text className="text-lg font-bold text-white">Place Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};
