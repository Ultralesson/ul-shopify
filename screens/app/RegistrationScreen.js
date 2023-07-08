import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Keyboard, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import {
    EnvelopeIcon,
    LockClosedIcon,
    PhoneArrowDownLeftIcon,
    ShieldCheckIcon,
    UserIcon,
    UserPlusIcon,
} from "react-native-heroicons/outline";

import CustomInput from "../../components/common/CustomInput";

import { QUATERNARY, SECONDARY_COLOR } from "../../constants/colors";
import { HOME_SCREEN, LOADING_SCREEN, LOGIN_SCREEN } from "../../constants/screens";
import AuthButtonSection from "../../components/app/AuthButtonSection";

const RegistrationScreen = () => {
    const navigation = useNavigation();

    const [inputs, setInputs] = useState({
        fullName: null,
        email: null,
        password: null,
        confirmPassword: null,
        mobileNumber: null,
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
        fullName: Yup.string().required("Full name cannot be empty"),
        email: Yup.string().required("Email field cannot be empty").email("Email format is incorrect"),
        password: Yup.string()
            .required("Password field cannot be empty")
            .min(5, "Password should be minimum of 5 characters"),
        confirmPassword: Yup.string()
            .required("Confirm password field cannot be empty")
            .oneOf([Yup.ref("password")], "Confirm password is not matched with password"),
        mobileNumber: Yup.string()
            .required("Mobile number cannot be empty")
            .test("is-numeric", "Mobile number must contain only digits", (value) => /^\d+$/.test(value))
            .min(10, "Mobile number should be 10 digits")
            .max(10, "Mobile number should be 10 digits"),
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
                if (err.message === "Confirm password is not matched with password") {
                    setInputs((prevState) => {
                        return { ...prevState, confirmPassword: "" };
                    });
                }
            });
        }
    };

    const register = () => {
        console.log(inputs);
        // Store the data here...

        navigation.navigate(LOADING_SCREEN, { navigateTo: HOME_SCREEN });
    };

    return (
        <SafeAreaView>
            <View className="p-3 h-full">
                <View className="mt-10">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-end">
                            <Text className="font-bold text-4xl">Register</Text>
                            <Text className="pb-1 ml-2 font-bold" style={{ color: QUATERNARY }}>
                                <Text className="italic">to</Text> Ul-Shopify
                            </Text>
                        </View>
                        <UserPlusIcon size="40" color="black" />
                    </View>
                    <Text className="text-gray-400 text-base mt-1">Enter your details to Register</Text>
                </View>
                <View className="flex-1 justify-between">
                    <View className="flex-1">
                        <ScrollView className="mt-10 flex-1" showsVerticalScrollIndicator={false}>
                            <CustomInput
                                label="Full Name"
                                value={inputs.fullName}
                                placeholder="Enter your full name"
                                Icon={UserIcon}
                                iconSize="25"
                                iconColor="black"
                                error={errors.fullName}
                                mode="text"
                                onChangeText={(text) => {
                                    handleOnChangeText(text, "fullName");
                                }}
                                onFocus={() => {
                                    handleErrors(undefined, "fullName");
                                }}
                            />
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
                            <CustomInput
                                label="Confirm password"
                                value={inputs.confirmPassword}
                                placeholder="Confirm your password"
                                password={true}
                                Icon={ShieldCheckIcon}
                                iconSize="25"
                                iconColor="black"
                                error={errors.confirmPassword}
                                mode="text"
                                onChangeText={(text) => {
                                    handleOnChangeText(text, "confirmPassword");
                                }}
                                onFocus={() => {
                                    handleErrors(undefined, "confirmPassword");
                                }}
                            />
                            <CustomInput
                                label="Mobile number"
                                value={inputs.mobileNumber}
                                placeholder="Enter your mobile number"
                                Icon={PhoneArrowDownLeftIcon}
                                iconSize="25"
                                iconColor="black"
                                error={errors.mobileNumber}
                                mode="numeric"
                                onChangeText={(text) => {
                                    handleOnChangeText(text, "mobileNumber");
                                }}
                                onFocus={() => {
                                    handleErrors(undefined, "mobileNumber");
                                }}
                            />
                        </ScrollView>
                    </View>

                    <AuthButtonSection
                        buttonText="Register"
                        authQuestionText="Already have an account?"
                        navigateToText="Login"
                        navigateTo={LOGIN_SCREEN}
                        validate={validate}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegistrationScreen;