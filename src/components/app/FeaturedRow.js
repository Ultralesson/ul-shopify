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
            accessible={true}
            testID="ele-featured-row-card"
            accessibilityLabel="ele-featured-row-card"
            nativeID="ele-featured-row-card"
            className="bg-white w-60 mr-3 shadow"
            onPress={() => {
                dispatch(hideTabBar());
                navigation.navigate(LOADING_SCREEN, { navigateTo: PRODUCT_SCREEN, product });
            }}
        >
            <Image
                accessible={true}
                source={{
                    uri: imgUrl,
                }}
                testID={`img-featured-row-${title.toLowerCase().split(" ").join("-")}`}
                accessibilityLabel={`img-featured-row-${title.toLowerCase().split(" ").join("-")}`}
                nativeID={`img-featured-row-${title.toLowerCase().split(" ").join("-")}`}
                className="h-40 w-full rounded-sm"
            />
            <View accessible={false} className="px-3 pb-4">
                <Text
                    accessible={true}
                    testID="txt-product-title"
                    accessibilityLabel="txt-product-title"
                    nativeID="txt-product-title"
                    className="font-bold text-md pt-2"
                >
                    {title}
                </Text>
                <Text
                    accessible={true}
                    testID="txt-product-description"
                    accessibilityLabel="txt-product-description"
                    nativeID="txt-product-description"
                    numberOfLines={1}
                    className="pb-2 text-xs"
                >
                    {description}
                </Text>
                <View accessible={false} className="flex-row space-x-2">
                    <StarIcon
                        accessible={true}
                        testID="icon-rating"
                        accessibilityLabel="icon-rating"
                        nativeID="icon-rating"
                        fill={TERNARY_COLOR}
                        color={TERNARY_COLOR}
                        opacity={0.5}
                        size={22}
                    />
                    <Text
                        accessible={true}
                        testID="txt-rating-category"
                        accessibilityLabel="txt-rating-category"
                        nativeID="txt-rating-category"
                        className="text-xs pt-1 text-gray-500"
                    >
                        {rating} . {category}
                    </Text>
                </View>
                <View accessible={false} className="flex-row items-end mt-1">
                    <Text
                        accessible={true}
                        testID="txt-rupee-symbol"
                        accessibilityLabel="txt-rupee-symbol"
                        nativeID="txt-rupee-symbol"
                        className="text-xs mr-1 italic"
                    >
                        ₹
                    </Text>
                    <Text
                        accessible={true}
                        testID="txt-product-price"
                        accessibilityLabel="txt-product-price"
                        nativeID="txt-product-price"
                        className="font-bold"
                    >
                        {price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const FeaturedRow = ({ title, description, productsList }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const products = fetchRandomElements([...productsList], 3);
    return (
        <View accessible={false}>
            <View className="mt-4 flex-row items-center justify-between px-4" accessible={false}>
                <Text
                    accessible={true}
                    testID="txt-featured-row-title"
                    accessibilityLabel="txt-featured-row-title"
                    nativeID="txt-featured-row-title"
                    className="font-bold text-lg"
                >
                    {title}
                </Text>
                <TouchableOpacity
                    accessible={true}
                    testID="btn-next"
                    accessibilityLabel="btn-next"
                    nativeID="btn-next"
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(LOADING_SCREEN, {
                            navigateTo: PRODUCT_DISPLAY_SCREEN,
                            products: productsList,
                        });
                    }}
                >
                    <ArrowRightIcon
                        testID="icon-next"
                        accessibilityLabel="icon-next"
                        nativeID="icon-next"
                        size={22}
                        color={QUATERNARY_COLOR}
                    />
                </TouchableOpacity>
            </View>
            <Text
                testID="txt-featured-row-description"
                accessibilityLabel="txt-featured-row-description"
                nativeID="txt-featured-row-description"
                className="text-xs text-gray-500 px-4"
            >
                {description}
            </Text>

            <ScrollView
                accessible={false}
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {products.map((product) => {
                    return <FeatureRowCard key={product.product_id} product={product} />;
                })}
                <TouchableOpacity
                    accessible={true}
                    testID="ele-explore-more"
                    accessibilityLabel="ele-explore-more"
                    nativeID="ele-explore-more"
                    className="flex-1 justify-center ml-8 mr-4 items-center"
                    onPress={() => {
                        dispatch(hideTabBar());
                        navigation.navigate(LOADING_SCREEN, {
                            navigateTo: PRODUCT_DISPLAY_SCREEN,
                            products: productsList,
                        });
                    }}
                >
                    <Text
                        accessible={true}
                        testID="txt-explore-more"
                        accessibilityLabel="txt-explore-more"
                        nativeID="txt-explore-more"
                        className="text-md text-gray-500 text-bold mb-2 italic"
                    >
                        Explore More
                    </Text>
                    <PlusCircleIcon
                        accessible={true}
                        testID="icon-plus-circle"
                        accessibilityLabel="icon-plus-circle"
                        nativeID="icon-plus-circle"
                        color={TERNARY_COLOR}
                        size={40}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;
