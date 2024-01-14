import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { QUATERNARY_COLOR } from "../../../constants/colors";

const CustomInput = ({
    label,
    value,
    Icon,
    iconName,
    inputName,
    iconSize,
    iconColor,
    placeholder,
    error,
    password,
    mode,
    onChangeText,
    onFocus,
    customStyle,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <View className="mb-5">
            <Text
                testID={`label-${label.toLowerCase().split(" ").join("-")}`}
                accessibilityLabel={`label-${label.toLowerCase().split(" ").join("-")}`}
                nativeID={`label-${label.toLowerCase().split(" ").join("-")}`}
                className="mb-2 font-bold"
                style={{ color: QUATERNARY_COLOR }}
            >
                {label}
            </Text>

            <View
                className={`flex-row p-3 mb-2 rounded-lg bg-gray-200 ${
                    isFocused ? "border-[0.23px] border-solid border-gray-600" : ""
                } ${customStyle ? customStyle : ""} `}
            >
                <Icon
                    testID={`icon-${iconName}`}
                    accessibilityLabel={`icon-${iconName}`}
                    nativeID={`icon-${iconName}`}
                    size={iconSize}
                    color={iconColor}
                />
                <View className="ml-3 border-[0.20px] border-solid border-gray-500 border-1"></View>
                <View className="flex-1 flex-row justify-between">
                    <TextInput
                        testID={`inp-${inputName.toLowerCase().split(" ").join("-")}`}
                        accessibilityLabel={`inp-${inputName.toLowerCase().split(" ").join("-")}`}
                        nativeID={`inp-${inputName.toLowerCase().split(" ").join("-")}`}
                        className="ml-2 flex-1"
                        value={value}
                        placeholder={placeholder}
                        inputMode={mode}
                        secureTextEntry={password ? hidePassword : false}
                        autoCorrect={false}
                        onFocus={() => {
                            onFocus();
                            setIsFocused(true);
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                        }}
                        onChangeText={onChangeText}
                    />
                    {password && (
                        <TouchableOpacity
                            testID="btn-display-hide-password"
                            accessibilityLabel="btn-display-hide-password"
                            nativeID="btn-display-hide-password"
                            activeOpacity={1}
                            onPress={() => {
                                setHidePassword(!hidePassword);
                            }}
                        >
                            {hidePassword ? (
                                <EyeIcon
                                    testID="icon-eye"
                                    accessibilityLabel="icon-eye"
                                    nativeID="icon-eye"
                                    size={iconSize}
                                    color={iconColor}
                                />
                            ) : (
                                <EyeSlashIcon
                                    testID="icon-eye-slash"
                                    accessibilityLabel="icon-eye-slash"
                                    nativeID="icon-eye-slash"
                                    size={iconSize}
                                    color={iconColor}
                                />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {error && (
                <Text
                    testID={`txt-${error.toLowerCase().split(" ").join("-")}`}
                    accessibilityLabel={`txt-${error.toLowerCase().split(" ").join("-")}`}
                    nativeID={`txt-${error.toLowerCase().split(" ").join("-")}`}
                    className="text-red-500"
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

export default CustomInput;
