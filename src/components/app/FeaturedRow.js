import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ArrowRightIcon, PlusCircleIcon, StarIcon } from "react-native-heroicons/outline";
import { QUATERNARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { fetchRandomElements } from "../../../utilities/arrayHelpers";
import { useNavigation } from "@react-navigation/native";
import { LOADING_SCREEN, PRODUCT_DISPLAY_SCREEN, PRODUCT_SCREEN } from "../../../constants/screens";
import { useDispatch } from "react-redux";
import { hideTabBar } from "../../store/slices/appUIStateSlice";

export const FeatureRowCard = ({ product }) => {
    const { name: title, description, category, rating, image_url: imgUrl, price } = product;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            className="bg-white w-60 mr-3 shadow"
            onPress={() => {
                dispatch(hideTabBar());
                navigation.navigate(LOADING_SCREEN, { navigateTo: PRODUCT_SCREEN, product });
            }}
        >
            <Image
                source={{
                    uri: imgUrl,
                }}
                className="h-40 w-full rounded-sm"
            />
            <View className="px-3 pb-4">
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
    );
};

const FeaturedRow = ({ title, description, productsList }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    productsList = fetchRandomElements(productsList, 3);
    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(LOADING_SCREEN, {
                            navigateTo: PRODUCT_DISPLAY_SCREEN,
                            products: productsList,
                        });
                    }}
                >
                    <ArrowRightIcon size={22} color={QUATERNARY_COLOR} />
                </TouchableOpacity>
            </View>
            <Text className="text-xs text-gray-500 px-4">{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {productsList.map((product) => {
                    return <FeatureRowCard key={product.product_id} product={product} />;
                })}
                <TouchableOpacity
                    className="flex-1 justify-center ml-8 mr-4 items-center"
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(LOADING_SCREEN, {
                            navigateTo: PRODUCT_DISPLAY_SCREEN,
                            products: productsList,
                        });
                    }}
                >
                    <Text className="text-md text-gray-500 text-bold mb-2 italic">Explore More</Text>
                    <PlusCircleIcon color={TERNARY_COLOR} size={40} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;
