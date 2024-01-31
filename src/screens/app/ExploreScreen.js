import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, FlatList, Image } from "react-native";
import { ChevronLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { SECONDARY_COLOR } from "../../../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HOME_SCREEN, LOADING_SCREEN, PRODUCT_DISPLAY_SCREEN, PRODUCT_SCREEN } from "../../../constants/screens";
import { useDispatch } from "react-redux";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import newArrivals from "../../../assets/data/new-arrivals.json";
import trendingProducts from "../../../assets/data/trending-products.json";
import topRatedProducts from "../../../assets/data/top-rated-products.json";
import bestSellers from "../../../assets/data/best-sellers.json";
import { changeToastModalState } from "../../store/slices/modalsSlice";

const ProductItem = ({ product }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <TouchableOpacity
            accessible={true}
            testID="ele-auto-suggestion"
            className="p-4 flex-row items-center bg-gray-100 rounded-xl mx-3 mb-4  border-b-2 border-gray-300"
            onPress={() => {
                dispatch(hideTabBar());
                navigation.navigate(LOADING_SCREEN, {
                    navigateTo: PRODUCT_SCREEN,
                    product,
                });
            }}
        >
            <Image
                accessible={true}
                testID={`img-product-${product.name.toLowerCase().split(" ").join("-")}`}
                source={{ uri: product.image_url }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            />
            <View className="flex-1" accessible={false}>
                <Text accessible={true} testID="txt-product-name" className="text-sm font-bold">
                    {product.name}
                </Text>
                <Text
                    accessible={true}
                    testID="txt-product-description"
                    className="text-gray-600 leading-4 text-xs"
                    numberOfLines={1}
                >
                    {product.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const ExploreScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { params } = useRoute();

    const allProducts = [
        ...newArrivals.products,
        ...trendingProducts.products,
        ...bestSellers.products,
        ...topRatedProducts.products,
    ]; // Assuming newArrivals is an array of products
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [showMore, setShowMore] = useState(false);

    const displayedProducts = showMore ? filteredProducts : filteredProducts.slice(0, 3);

    useEffect(() => {
        if (searchTerm) {
            const results = allProducts.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.product_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm]);

    return (
        <SafeAreaView className="bg-white flex-1" accessible={false}>
            <View accessible={false}>
                <View
                    accessible={false}
                    className="flex-row justify-between items-center ml-3 mr-3 mt-5 mb-3 p-2 rounded-xl border-[0.30px] border-gray-400"
                >
                    <TouchableOpacity
                        accessible={true}
                        testID="btn-back"
                        className="mr-2"
                        onPress={() => {
                            if (params?.navigateBackTo) {
                                navigation.navigate(PRODUCT_SCREEN, {
                                    product: params?.product,
                                });
                                return;
                            } else {
                                dispatch(showTabBar());
                                navigation.navigate(HOME_SCREEN);
                            }
                        }}
                    >
                        <ChevronLeftIcon size={24} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        accessible={true}
                        testID="inp-search"
                        className="flex-1"
                        placeholder="Explore"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <TouchableOpacity
                        accessible={true}
                        testID="btn-search"
                        onPress={() => {
                            if (filteredProducts.length !== 0) {
                                navigation.navigate(LOADING_SCREEN, {
                                    navigateTo: PRODUCT_DISPLAY_SCREEN,
                                    products: filteredProducts,
                                    title: "Your Curated Selection!!",
                                });
                            } else {
                                dispatch(
                                    changeToastModalState({
                                        status: true,
                                        text: "Search field cannot be empty",
                                        type: "error",
                                    })
                                );
                            }
                        }}
                    >
                        <MagnifyingGlassIcon
                            testID="icon-search"
                            accessibilityLabel="icon-search"
                            nativeID="icon-search"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                {searchTerm && filteredProducts.length === 0 ? (
                    <View accessible={false}>
                        <Image
                            accessible={true}
                            testID="img-not-found"
                            className="h-56 w-full"
                            source={require("../../../assets/images/not-found.jpg")} // Update with the path to your image
                            resizeMode="contain"
                        />
                        <Text accessible={true} testID="txt-no-products-found" className="text-center text-lg">
                            No products found.
                        </Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            accessible={false}
                            data={displayedProducts}
                            keyExtractor={(item) => item.product_id}
                            renderItem={({ item }) => <ProductItem product={item} />}
                        />
                        {filteredProducts.length > 3 && !showMore && (
                            <TouchableOpacity
                                accessible={true}
                                testID="btn-more"
                                accessibilityLabel="btn-more"
                                nativeID="btn-more"
                                className="items-center justify-center p-4"
                                onPress={() => setShowMore(true)}
                            >
                                <Text
                                    accessible={true}
                                    testID="txt-more"
                                    accessibilityLabel="txt-more"
                                    nativeID="txt-more"
                                    className="text-center text-md text-white font-bold px-10 py-3 rounded-xl"
                                    style={{ backgroundColor: SECONDARY_COLOR }}
                                >
                                    More
                                </Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ExploreScreen;
