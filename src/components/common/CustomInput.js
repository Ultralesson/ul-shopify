import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { QUATERNARY_COLOR } from "../../../constants/colors";

const CustomInput = ({
    label,
    value,
    Icon,
    iconSize,
    iconColor,
    placeholder,
    error,
    password,
    mode,
    onChangeText,
    onFocus,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <View className="mb-5">
            <Text className="mb-2 font-bold" style={{ color: QUATERNARY_COLOR }}>
                {label}
            </Text>

            <View
                className={`flex-row p-3 mb-2 rounded-lg bg-gray-200 ${
                    isFocused ? "border border-solid border-black" : ""
                }`}
            >
                <Icon size={iconSize} color={iconColor} />
                <View className="ml-3 border-[0.20px] border-solid border-gray-500 border-1"></View>
                <View className="flex-1 flex-row justify-between">
                    <TextInput
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
                            activeOpacity={1}
                            onPress={() => {
                                setHidePassword(!hidePassword);
                            }}
                        >
                            {hidePassword ? (
                                <EyeIcon size={iconSize} color={iconColor} />
                            ) : (
                                <EyeSlashIcon size={iconSize} color={iconColor} />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {error && <Text className="text-red-500">{error}</Text>}
        </View>
    );
};

export default CustomInput;
