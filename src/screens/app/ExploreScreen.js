import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, FlatList, Image } from "react-native";
import { ChevronLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICON_SIZE_SMALL } from "../../../constants/sizes";
import { ICON_COLOR } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import {
    EXPLORE_SCREEN,
    HOME_SCREEN,
    HOME_TAB,
    LOADING_SCREEN,
    PRODUCT_DISPLAY_SCREEN,
    PRODUCT_SCREEN,
} from "../../../constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import newArrivals from "../../../assets/data/new-arrivals.json";

const EXPLORE = {
    BACK_BUTTON: "btn-explore-back",
    SEARCH_BUTTON: "btn-explore-search",
    INPUT_FIELD: "tf-explore",
};

const ProductItem = ({ product }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <TouchableOpacity
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
                source={{ uri: product.image_url }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            />
            <View className="flex-1">
                <Text className="text-sm font-bold">{product.name}</Text>
                <Text className="text-gray-600 leading-4 text-xs" numberOfLines={1}>
                    {product.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const ExploreScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const allProducts = [...newArrivals.products]; // Assuming newArrivals is an array of products
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

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
        <SafeAreaView className="bg-white flex-1">
            <View>
                <View className="flex-row justify-between items-center ml-3 mr-3 mt-5 mb-3 p-2 rounded-xl border-[0.30px] border-gray-400">
                    <TouchableOpacity
                        className="mr-2"
                        onPress={() => {
                            dispatch(showTabBar());
                            navigation.navigate(HOME_TAB);
                        }}
                    >
                        <ChevronLeftIcon size={24} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        className="flex-1"
                        placeholder="Explore"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(LOADING_SCREEN, {
                                navigateTo: PRODUCT_DISPLAY_SCREEN,
                                products: filteredProducts,
                                title: "Your Curated Selection!!",
                            });
                        }}
                    >
                        <MagnifyingGlassIcon size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {searchTerm && filteredProducts.length === 0 ? (
                    <View className="">
                        <Image
                            className="h-56 w-full"
                            source={require("../../../assets/images/not-found.jpg")} // Update with the path to your image
                            resizeMode="contain"
                        />
                        <Text className="text-center text-lg">No products found.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.product_id}
                        renderItem={({ item }) => (
                            // Assuming you have a ProductItem component to render each item
                            <ProductItem product={item} />
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ExploreScreen;
