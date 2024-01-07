import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AdjustmentsVerticalIcon, ArrowLeftIcon, StarIcon } from "react-native-heroicons/outline";
import { HOME_SCREEN, LOADING_SCREEN, PRODUCT_SCREEN } from "../../../constants/screens";
import { QUATERNARY_COLOR, SECONDARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { hideTabBar, showTabBar } from "../../store/slices/appUIStateSlice";
import CheckBox from "expo-checkbox";

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
        params: { products, title },
    } = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isFilterDrawerVisible, setFilterDrawerVisible] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);

    const [brandFilters, setBrandFilters] = useState([]);
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: null, max: null });
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];
    const uniqueCategories = [...new Set(products.map((product) => product.category))];

    // Function to apply filters
    const applyFilters = (brandFilters, categoryFilters, priceRange) => {
        let filtered = products;
        // Apply brand filter
        if (brandFilters.length > 0) {
            filtered = filtered.filter((product) => brandFilters.includes(product.brand));
        }
        // Apply category filter
        if (categoryFilters.length > 0) {
            filtered = filtered.filter((product) => categoryFilters.includes(product.category));
        }
        // Apply price range filter
        if (priceRange.min != null) {
            filtered = filtered.filter((product) => product.price >= priceRange.min);
        }
        if (priceRange.max != null) {
            filtered = filtered.filter((product) => product.price <= priceRange.max);
        }
        setFilteredProducts(filtered);
        setFiltersActive(true);
    };

    const clearFilters = () => {
        setBrandFilters([]);
        setCategoryFilters([]);
        setPriceRange({ min: null, max: null });
        setFilteredProducts(products);
        setFiltersActive(false);
    };

    // Function to update brand filter state
    const toggleBrandFilter = (brand) => {
        setBrandFilters((prevState) =>
            prevState.includes(brand) ? prevState.filter((b) => b !== brand) : [...prevState, brand]
        );
    };

    // Function to update category filter state
    const toggleCategoryFilter = (category) => {
        setCategoryFilters((prevState) =>
            prevState.includes(category) ? prevState.filter((c) => c !== category) : [...prevState, category]
        );
    };

    // Function to handle price input change
    const handlePriceChange = (type, value) => {
        setPriceRange((prevState) => ({
            ...prevState,
            [type]: value ? parseInt(value, 10) : null,
        }));
    };

    // Render the filter drawer
    const renderFilterDrawer = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isFilterDrawerVisible}
            onRequestClose={() => {
                setFilterDrawerVisible(!isFilterDrawerVisible);
            }}
        >
            <View style={{ flex: 1 }}>
                <ScrollView className="bg-white p-4">
                    <Text className="text-center font-bold text-xl">Filters</Text>
                    {/* Brand Filters */}
                    <Text className="text-lg font-bold mb-2">Brand</Text>
                    {/* Replace this with actual brand names */}
                    {uniqueBrands.map((brand) => (
                        <TouchableOpacity
                            key={brand}
                            className="flex-row items-center mb-2"
                            onPress={() => toggleBrandFilter(brand)}
                        >
                            <CheckBox
                                style={{
                                    borderColor: QUATERNARY_COLOR,
                                    borderWidth: 1,
                                }}
                                value={brandFilters.includes(brand)}
                                onValueChange={() => toggleBrandFilter(brand)}
                            />
                            <Text className="ml-2 text-gray-500">{brand}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Category Filters */}
                    <Text className="text-lg font-bold mb-2">Category</Text>
                    {/* Replace this with actual category names */}
                    {uniqueCategories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            className="flex-row items-center mb-2"
                            onPress={() => toggleCategoryFilter(category)}
                        >
                            <CheckBox
                                style={{
                                    borderColor: QUATERNARY_COLOR,
                                    borderWidth: 1,
                                }}
                                value={categoryFilters.includes(category)}
                                onValueChange={() => toggleCategoryFilter(category)}
                            />
                            <Text className="ml-2 text-gray-500">{category}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Price Range Filters */}
                    <View className="flex-row justify-between mt-3">
                        <TextInput
                            className="p-2 rounded"
                            style={{
                                borderColor: TERNARY_COLOR,
                                borderWidth: 1,
                            }}
                            placeholder="Min Price"
                            keyboardType="numeric"
                            value={priceRange.min ? priceRange.min.toString() : ""}
                            onChangeText={(value) => handlePriceChange("min", value)}
                        />
                        <TextInput
                            className="p-2 rounded"
                            style={{
                                borderColor: TERNARY_COLOR,
                                borderWidth: 1,
                            }}
                            placeholder="Max Price"
                            keyboardType="numeric"
                            value={priceRange.max ? priceRange.max.toString() : ""}
                            onChangeText={(value) => handlePriceChange("max", value)}
                        />
                    </View>

                    {/* Apply Button */}
                    <TouchableOpacity
                        className="mt-4 p-2 rounded"
                        style={{
                            backgroundColor: SECONDARY_COLOR,
                        }}
                        onPress={() => {
                            applyFilters(brandFilters, categoryFilters, priceRange);
                            setFilterDrawerVisible(false);
                        }}
                    >
                        <Text className="text-center text-white font-bold my-1">Apply Filters</Text>
                    </TouchableOpacity>

                    {/* Close Button */}
                    <TouchableOpacity className="mt-2 p-2 rounded" onPress={() => setFilterDrawerVisible(false)}>
                        <Text className="text-center text-gray-500 text-md">Close</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView className="mb-16">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="mx-3">
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
                        <Text className="font-bold pt-2 text-xl pb-3">{title ? title : "Explore More!!"}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setFilterDrawerVisible(true)} className="pr-2">
                    <AdjustmentsVerticalIcon size={25} color={TERNARY_COLOR} />
                </TouchableOpacity>
            </View>
            {filtersActive && ( // Only display the "Clear Filters" button if filters are active
                <TouchableOpacity onPress={clearFilters} className="items-end mb-3 mr-3">
                    <Text
                        className="text-center px-8 py-2 rounded-xl font-bold text-white"
                        style={{ backgroundColor: SECONDARY_COLOR }}
                    >
                        Clear Filters
                    </Text>
                </TouchableOpacity>
            )}
            {renderFilterDrawer()}
            <ScrollView className="mb">
                <View className="px-4">
                    <View className="flex-row flex-wrap justify-between">
                        {filteredProducts.map((product) => (
                            <FeatureGridRowCards key={product.product_id} product={product} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
