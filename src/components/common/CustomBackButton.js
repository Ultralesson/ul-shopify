import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const CustomBackButton = ({ onBackPress }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={onBackPress}>
            <ChevronLeftIcon class size={30} color="black" />
        </TouchableOpacity>
    );
};

export default CustomBackButton;
