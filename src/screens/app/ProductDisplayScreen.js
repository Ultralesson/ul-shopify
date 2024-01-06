import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/outline";
import { HOME_SCREEN, HOME_TAB, LOADING_SCREEN, PRODUCT_SCREEN } from "../../../constants/screens";
import { TERNARY_COLOR } from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";

const FeatureGridRowCards = ({ product }) => {
    const { name: title, description, category, rating, image_url: imgUrl, price } = product;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <>
            <TouchableOpacity
                className="bg-white mb-3 border-b-2 border-gray-300" // Adjusted for two-column grid
                onPress={() => {
                    dispatch(hideTabBar());
                    navigation.navigate(LOADING_SCREEN, { navigateTo: PRODUCT_SCREEN, product });
                }}
            >
                <View className="h-40 w-96 rounded-sm overflow-hidden">
                    <Image source={{ uri: imgUrl }} className="h-full w-full" resizeMode="cover" />
                </View>
                <View className="px-2 pb-4">
                    <Text className="font-bold text-md pt-2">{title}</Text>
                    <Text numberOfLines={1} className="pb-2 text-xs">
                        {description}
                    </Text>
                    <View className="flex-row space-x-2">
                        <StarIcon fill={TERNARY_COLOR} color={TERNARY_COLOR} opacity={0.5} size={22} />
                        <Text className="text-xs pt-1 text-gray-500">
                            {rating} . {category}
                        </Text>
                    </View>
                    <View className="flex-row items-end mt-1">
                        <Text className="text-xs mr-1 italic">₹</Text>
                        <Text className="font-bold">{price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

export const ProductDisplayScreen = () => {
    const {
        params: { products },
    } = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <View className="flex-row items-center">
                <View className="mx-2">
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <ArrowLeftIcon size={25} color="#000000" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="font-bold pt-2 text-xl pb-3">Explore More!!</Text>
                </View>
            </View>
            <ScrollView className="mb-16">
                <View className="px-4">
                    <View className="flex-row flex-wrap justify-between">
                        {products.map((product) => (
                            <FeatureGridRowCards key={product.product_id} product={product} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
