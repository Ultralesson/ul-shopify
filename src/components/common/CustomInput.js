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
        <View className="mb-5" accessible={false}>
            <Text
                accessible={true}
                testID={`label-${label.toLowerCase().split(" ").join("-")}`}
                className="mb-2 font-bold"
                style={{ color: QUATERNARY_COLOR }}
            >
                {label}
            </Text>

            <View
                accessible={false}
                className={`flex-row p-3 mb-2 rounded-lg bg-gray-200 ${
                    isFocused ? "border-[0.23px] border-solid border-gray-600" : ""
                } ${customStyle ? customStyle : ""} `}
            >
                <Icon accessible={true} testID={`icon-${iconName}`} size={iconSize} color={iconColor} />
                <View accessible={true} className="ml-3 border-[0.20px] border-solid border-gray-500 border-1"></View>
                <View className="flex-1 flex-row justify-between" accessible={false}>
                    <TextInput
                        accessible={true}
                        testID={`inp-${inputName.toLowerCase().split(" ").join("-")}`}
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
                            accessible={true}
                            testID="btn-display-hide-password"
                            activeOpacity={1}
                            onPress={() => {
                                setHidePassword(!hidePassword);
                            }}
                        >
                            {hidePassword ? (
                                <EyeIcon accessible={true} testID="icon-eye" size={iconSize} color={iconColor} />
                            ) : (
                                <EyeSlashIcon
                                    testID="icon-eye-slash"
                                    accessible={true}
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
                    accessible={true}
                    testID={`txt-${error.toLowerCase().split(" ").join("-")}`}
                    className="text-red-500"
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

export default CustomInput;
