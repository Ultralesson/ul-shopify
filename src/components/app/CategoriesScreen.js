import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const CategoryCard = ({ imageUrl, title }) => {
    return (
        <TouchableOpacity>
            <View className="ml-1 mr-1">
                <Image source={imageUrl} className="h-24 w-28 rounded object-cover" />
            </View>
            <Text className="mt-2 bottom-1 left-1 font-medium">{title}</Text>
        </TouchableOpacity>
    );
};

const CategoryScreen = () => {
    return (
        <ScrollView
            className
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <CategoryCard imageUrl={require("../../../assets/images/categories/clothing.jpg")} title={"Clothing"} />
            <CategoryCard imageUrl={require("../../../assets/images/categories/shoes.jpg")} title={"Shoes"} />
            <CategoryCard imageUrl={require("../../../assets/images/categories/furniture.jpg")} title={"Furniture"} />
            <CategoryCard imageUrl={require("../../../assets/images/categories/toys.jpg")} title={"Toys"} />
            <CategoryCard
                imageUrl={require("../../../assets/images/categories/audio-equipment.jpg")}
                title={"Audio sets"}
            />
            <CategoryCard imageUrl={require("../../../assets/images/categories/books.jpg")} title={"Books"} />
        </ScrollView>
    );
};

export default CategoryScreen;
