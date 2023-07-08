import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { EnvelopeIcon, LockClosedIcon, ArrowRightOnRectangleIcon } from "react-native-heroicons/outline";

import CustomInput from "../../components/common/CustomInput";

import { QUATERNARY, SECONDARY_COLOR } from "../../constants/colors";
import { HOME_SCREEN, LOADING_SCREEN, REGISTRATION_SCREEN } from "../../constants/screens";
import AuthButtonSection from "../../components/app/AuthButtonSection";

const LoginScreen = () => {
    const navigation = useNavigation();

    const [inputs, setInputs] = useState({
        email: null,
        password: null,
    });
    const [errors, setErrors] = useState({});

    const handleOnChangeText = (text, label) => {
        setInputs((prevState) => {
            return { ...prevState, [label]: text };
        });
    };

    const handleErrors = (errorMessage, label) => {
        setErrors((prevState) => {
            return { ...prevState, [label]: errorMessage };
        });
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email field cannot be empty").email("Email format is incorrect"),
        password: Yup.string().required("Password field cannot be empty"),
    });

    const validate = async () => {
        // Once we click on the Register button, hide the keyboard
        Keyboard.dismiss();

        try {
            await validationSchema.validate(inputs, { abortEarly: false });
            register();
        } catch (error) {
            error.inner.forEach((err) => {
                handleErrors(err.message, err.path);
            });
        }
    };

    const register = () => {
        console.log(inputs);
        // Actual authentication to be done here...

        navigation.navigate(LOADING_SCREEN, { navigateTo: HOME_SCREEN });
    };

    return (
        <SafeAreaView>
            <View className="p-3 h-full">
                <View className="mt-10">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-end">
                            <Text className="font-bold text-4xl">Login</Text>
                            <Text className="pb-1 ml-2 font-bold" style={{ color: QUATERNARY }}>
                                <Text className="italic">to</Text> Ul-Shopify
                            </Text>
                        </View>
                        <ArrowRightOnRectangleIcon size="40" color="black" />
                    </View>
                    <Text className="text-gray-400 text-base mt-1">Enter your details to Register</Text>
                </View>
                <View className="flex-1 justify-between">
                    <View className="flex-1">
                        <ScrollView className="mt-10 flex-1" showsVerticalScrollIndicator={false}>
                            <CustomInput
                                label="Email"
                                value={inputs.email}
                                placeholder="Enter your email"
                                Icon={EnvelopeIcon}
                                iconSize="25"
                                iconColor="black"
                                error={errors.email}
                                mode="email"
                                onChangeText={(text) => {
                                    handleOnChangeText(text, "email");
                                }}
                                onFocus={() => {
                                    handleErrors(undefined, "email");
                                }}
                            />
                            <CustomInput
                                label="Password"
                                value={inputs.password}
                                placeholder="Enter your password"
                                password={true}
                                Icon={LockClosedIcon}
                                iconSize="25"
                                iconColor="black"
                                error={errors.password}
                                mode="text"
                                onChangeText={(text) => {
                                    handleOnChangeText(text, "password");
                                }}
                                onFocus={() => {
                                    handleErrors(undefined, "password");
                                }}
                            />
                        </ScrollView>
                    </View>

                    <AuthButtonSection
                        buttonText="Login"
                        authQuestionText="Don't have an account?"
                        navigateToText="Register"
                        navigateTo={REGISTRATION_SCREEN}
                        validate={validate}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
