import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    InformationCircleIcon,
    StarIcon,
    PlusIcon,
    ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { QUATERNARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { CART_SCREEN, HOME_SCREEN, LOADING_SCREEN } from "../../../constants/screens";
import { useDispatch } from "react-redux";
import { hideTabBar } from "../../store/slices/appUIStateSlice";

const Label = ({ type, text }) => {
    return (
        <View className="flex-wrap flex-row items-center pb-2">
            <Text className="px-4 text-gray-500">{type}</Text>
            <Text className="pt-2 pb-2 px-4 bg-blue-200 rounded-lg font-bold text-gray-700">{text}</Text>
        </View>
    );
};

export const ProductScreen = () => {
    const [showFeatures, setShowFeatures] = useState(false);
    const {
        params: { product },
    } = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hideTabBar());
    });

    return (
        <SafeAreaView className="bg-white flex-1">
            <ScrollView>
                <View className="relative pb-5">
                    <Image
                        className="w-full h-96 bg-gray-300"
                        source={{
                            uri: product.image_url,
                        }}
                    />
                    <View className="absolute top-8 left-5 rounded-full p-2 bg-white">
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(HOME_SCREEN);
                            }}
                        >
                            <ArrowLeftIcon size={25} color="#000000" />
                        </TouchableOpacity>
                    </View>

                    <View className="absolute top-8 right-5 p-2 rounded-full bg-gray-50">
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(hideTabBar());
                                navigation.navigate(LOADING_SCREEN, {
                                    navigateTo: CART_SCREEN,
                                });
                            }}
                        >
                            <ShoppingCartIcon size={40} color="#000000" />
                        </TouchableOpacity>
                    </View>

                    <View
                        className="absolute top-5 right-4 rounded-full p-1"
                        style={{ backgroundColor: TERNARY_COLOR }}
                    >
                        <Text className="font-bold text-white">10</Text>
                    </View>

                    <View className="bg-white">
                        <View className="px-4 pt-4">
                            <Text className="text-2xl font-bold">{product.name}</Text>
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center space-x-1 mt-2">
                                    <StarIcon size={22} opacity={0.5} color={TERNARY_COLOR} fill={TERNARY_COLOR} />
                                    <Text className="text-xs text-gray-400 font-bold">
                                        <Text className="mx-1">{product.rating}</Text> . {product.category}
                                    </Text>
                                </View>
                                <View className="flex-row items-end space-x-1">
                                    <Text className="mb-1">₹</Text>
                                    <Text className="text-xl font-bold">{product.price}</Text>
                                </View>
                            </View>
                            <Text className="text-gray-500 mt-2 pb-4 leading-5">{product.description}</Text>
                        </View>
                    </View>

                    <Label type={"brand"} text={product.brand} />
                    <Label type={"seller"} text={product.seller.seller_name} />

                    <TouchableOpacity
                        className="bg-white flex-row items-center space-x-2 p-4 border-b border-gray-300"
                        onPress={() => {
                            setShowFeatures(!showFeatures);
                        }}
                    >
                        <InformationCircleIcon size={25} color={TERNARY_COLOR} />
                        <Text className="pl-2 flex-1 text-md font-bold">Features</Text>
                        {showFeatures === false ? (
                            <ChevronDownIcon size={25} color={TERNARY_COLOR} />
                        ) : (
                            <ChevronUpIcon size={25} color={TERNARY_COLOR} />
                        )}
                    </TouchableOpacity>
                    {showFeatures && (
                        <View className="bg-white pb-4 px-4">
                            {product.features.map((feature) => {
                                return (
                                    <View className="flex-row items-center pt-4 space-x-2">
                                        <PlusIcon size={15} color={TERNARY_COLOR} />
                                        <Text className="italic text-gray-500" key={feature.id}>
                                            {feature}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
