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
import { userModel } from "../../../utilities/asyncStorage";

const OrderDetailCard = ({ order }) => {
    const formattedDate = order.date ? new Date(order.date).toLocaleDateString() : "N/A";

    return (
        <View className="mb-4 flex-row rounded-xl bg-gray-100 p-4  justify-center mt-5">
            <View className="">
                <Image
                    source={{ uri: order.image_url }}
                    className="h-20 w-20 rounded-xl mr-4"
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                />
            </View>
            <View className="flex-1">
                <Text className="font-bold text-md mb-2">{order.name}</Text>
                <Text className="text-sm font-bold">
                    ₹ {order.price.toFixed(2)}{" "}
                    <Text className="text-xs font-light italic text-gray-500">x {order.quantity}</Text>
                </Text>
                <Text className="text-sm text-gray-500">Purchased On: {formattedDate}</Text>
            </View>
            <View className="ml-1 justify-center">
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
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        userModel("GET_USER", {
            email: isAuthorized.email,
        }).then((response) => {
            setOrderDetails(response.data?.cart);
            dispatch(hideTabBar());
        });
    }, []);

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
                                {orderDetails?.length === 0 ? (
                                    <View className="h-full">
                                        <Image
                                            source={require("../../../assets/images/empty.png")}
                                            resizeMode="contain"
                                            className="w-full"
                                        />
                                        <Text className="text-center font-bold text-xl">Your order list empty!!</Text>
                                    </View>
                                ) : (
                                    orderDetails.map((order) => (
                                        <OrderDetailCard key={order.product_id} order={order} />
                                    ))
                                )}
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
                                className="text-white font-bold px-10 py-4 rounded-lg mt-10"
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
