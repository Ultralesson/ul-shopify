import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from "react-native";
import newArrivals from "../../../assets/data/new-arrivals.json";
import trendingProducts from "../../../assets/data/trending-products.json";
import topRatedProducts from "../../../assets/data/top-rated-products.json";
import bestSellers from "../../../assets/data/best-sellers.json";
import { useNavigation } from "@react-navigation/native";
import { LOADING_SCREEN, PRODUCT_DISPLAY_SCREEN } from "../../../constants/screens";
import { useDispatch } from "react-redux";
import { hideTabBar } from "../../store/slices/appUIStateSlice";

const CategoryCard = ({ imageUrl, title, products }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const filteredProducts = products.filter((product) => product.category === title.toLowerCase());
    return (
        <TouchableOpacity
            accessible={false}
            testID={Platform.OS === "android" ? "com.ultralesson.ulshopify:id/ele-category" : "ele-category"}
            onPress={() => {
                dispatch(hideTabBar());
                navigation.navigate(LOADING_SCREEN, {
                    navigateTo: PRODUCT_DISPLAY_SCREEN,
                    products: filteredProducts,
                });
            }}
        >
            <View className="ml-1 mr-1" accessible={false}>
                <Image
                    accessible={true}
                    testID={
                        Platform.OS === "android"
                            ? `com.ultralesson.ulshopify:id/img-category-${title}`
                            : `img-category-${title}`
                    }
                    source={imageUrl}
                    className="h-24 w-28 rounded object-cover"
                />
            </View>
            <Text
                accessible={true}
                testID={Platform.OS === "android" ? "com.ultralesson.ulshopify:id/txt-title" : "txt-title"}
                className="mt-2 bottom-1 left-1 font-medium"
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const CategoryScreen = () => {
    const allProducts = [
        ...newArrivals.products,
        ...trendingProducts.products,
        ...topRatedProducts.products,
        ...bestSellers.products,
    ];
    return (
        <ScrollView
            accessible={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <CategoryCard
                imageUrl={require("../../../assets/images/categories/clothing.jpg")}
                title={"Clothing"}
                products={allProducts}
            />
            <CategoryCard
                imageUrl={require("../../../assets/images/categories/shoes.jpg")}
                title={"Shoes"}
                products={allProducts}
            />
            <CategoryCard
                imageUrl={require("../../../assets/images/categories/furniture.jpg")}
                title={"Furniture"}
                products={allProducts}
            />
            <CategoryCard
                imageUrl={require("../../../assets/images/categories/toys.jpg")}
                title={"Toys"}
                products={allProducts}
            />
            <CategoryCard
                imageUrl={require("../../../assets/images/categories/audio-equipment.jpg")}
                title={"Audio sets"}
                products={allProducts}
            />
            <CategoryCard
                imageUrl={require("../../../assets/images/categories/books.jpg")}
                title={"Books"}
                products={allProducts}
            />
        </ScrollView>
    );
};

export default CategoryScreen;
