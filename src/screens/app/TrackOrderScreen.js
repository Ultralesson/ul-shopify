import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { SECONDARY_COLOR } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { HOME_SCREEN, PROFILE_SCREEN } from "../../../constants/screens";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";

const OrderDetailCard = ({ order }) => {
    const formattedDate = order.date ? new Date(order.date).toLocaleDateString() : "N/A";

    return (
        <View className="mb-4 flex-row items-center bg-white rounded-xl shadow justify-center mt-5">
            <View className="">
                <Image
                    source={{ uri: order.image_url }}
                    className="h-20 w-20 rounded-xl mr-4"
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                />
            </View>
            <View className="flex-1 justify-center">
                <Text className="font-bold text-md">{order.name}</Text>
                <Text className="text-sm text-gray-600">Order ID: {order.orderID}</Text>
                <Text className="text-sm font-bold">₹ {order.price.toFixed(2)}</Text>
                <Text className="text-sm text-gray-500">Purchased On: {formattedDate}</Text>
            </View>
            <View>
                <Text
                    className="text-white font-bold px-4 py-2 rounded-lg"
                    style={{ backgroundColor: SECONDARY_COLOR }}
                >
                    {order.status}
                </Text>
            </View>
        </View>
    );
};

const TrackOrderScreen = () => {
    const isAuthorized = useSelector(selectAuthState);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [orderDetails, setOrderDetails] = useState([
        {
            product_id: "clothing123",
            name: "Elegant Suite",
            description:
                "A sophisticated and stylish suit, perfect for business or formal occasions. Tailored for a sleek fit with premium materials.",
            category: "clothing",
            brand: "Eco Fashion",
            price: 249.99,
            discounted_price: 199.99,
            stock_quantity: 30,
            image_url: "https://drive.google.com/uc?export=view&id=1i3gRGONfIgw4rtM4sODHVrqDADaCROz7",
            features: [
                {
                    id: 1,
                    description: "Premium wool blend",
                },
                {
                    id: 2,
                    description: "Slim fit design",
                },
            ],
            rating: 4.9,
            reviews_count: 75,
            seller: {
                seller_id: "sellerEco",
                seller_name: "EcoFashion Retail",
                seller_rating: 4.9,
            },
            is_featured: true,
            is_new_arrival: true,
            is_best_seller: false,
            is_discounted: true,
            is_out_of_stock: false,
            status: "placed",
            date: new Date(),
            orderID: "123",
        },
        {
            product_id: "clothing124",
            name: "Elegant Suite",
            description:
                "A sophisticated and stylish suit, perfect for business or formal occasions. Tailored for a sleek fit with premium materials.",
            category: "clothing",
            brand: "Eco Fashion",
            price: 249.99,
            discounted_price: 199.99,
            stock_quantity: 30,
            image_url: "https://drive.google.com/uc?export=view&id=1i3gRGONfIgw4rtM4sODHVrqDADaCROz7",
            features: [
                {
                    id: 1,
                    description: "Premium wool blend",
                },
                {
                    id: 2,
                    description: "Slim fit design",
                },
            ],
            rating: 4.9,
            reviews_count: 75,
            seller: {
                seller_id: "sellerEco",
                seller_name: "EcoFashion Retail",
                seller_rating: 4.9,
            },
            is_featured: true,
            is_new_arrival: true,
            is_best_seller: false,
            is_discounted: true,
            is_out_of_stock: false,
            status: "placed",
            date: new Date(),
            orderID: "123",
        },
    ]);

    useEffect(() => {
        dispatch(hideTabBar());
        console.log(isAuthorized);
    });

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="mx-3 mt-4">
                <View className="flex-row items-end">
                    <View className="items-center mr-3">
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(showTabBar());
                                navigation.navigate(HOME_SCREEN);
                            }}
                        >
                            <ArrowLeftIcon size={25} color="#000000" />
                        </TouchableOpacity>
                    </View>
                    {isAuthorized.status && (
                        <View className="">
                            <Text className="font-bold text-xl">Track Your Order</Text>
                        </View>
                    )}
                </View>
                {isAuthorized.status ? (
                    <View>
                        <View className="w-auto">
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {orderDetails.map((order) => {
                                    return <OrderDetailCard key={order.product_id} order={order} />;
                                })}
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <View className="flex justify-center items-center px-4">
                        <Image
                            source={require("../../../assets/images/order-details.jpg")} // Replace with your image path
                            style={{ width: 200, height: 200, marginBottom: 20 }}
                            resizeMode="contain"
                        />
                        <Text className="font-bold text-md">Log in to view and track your orders.</Text>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(hideTabBar());
                                navigation.navigate(PROFILE_SCREEN);
                            }}
                        >
                            <Text
                                className="text-white font-bold px-10 py-2 rounded-lg mt-10"
                                style={{ backgroundColor: SECONDARY_COLOR }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default TrackOrderScreen;
