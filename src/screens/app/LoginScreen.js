import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { EnvelopeIcon, LockClosedIcon, ArrowRightOnRectangleIcon } from "react-native-heroicons/outline";

import CustomInput from "../../components/common/CustomInput";

import { QUATERNARY_COLOR } from "../../../constants/colors";
import {
    FORGOT_PASSWORD_SCREEN,
    HOME_TAB,
    LOADING_SCREEN,
    LOGIN_SCREEN,
    OTP_SCREEN,
    PROFILE_SCREEN,
    REGISTRATION_SCREEN,
} from "../../../constants/screens";
import AuthButtonSection from "../../components/app/AuthButtonSection";
import CustomBackButton from "../../components/common/CustomBackButton";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import { screenStack } from "../../store/slices/appStateSlice";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordResetModalState, selectPasswordResetModalState } from "../../store/slices/modalsSlice";
import CustomMessageModal from "../../components/common/CustomMessageModal";

const LoginScreen = () => {
    const navigation = useNavigation();
    const isKeyboardVisible = useKeyboardStatus();
    const dispatch = useDispatch();

    const selectPasswordResetState = useSelector(selectPasswordResetModalState);

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
            login();
        } catch (error) {
            error.inner.forEach((err) => {
                handleErrors(err.message, err.path);
            });
        }
    };

    const login = () => {
        console.log(inputs);
        // Actual authentication to be done here...

        navigation.navigate(LOADING_SCREEN, { navigateTo: OTP_SCREEN });
    };

    useEffect(() => {
        dispatch(screenStack({ screen: LOGIN_SCREEN, to: "push" }));
    }, []);

    return (
        <SafeAreaView>
            {selectPasswordResetState && (
                <CustomMessageModal
                    gifOrImage={require("../../../assets/images/passwordResetSuccessful.jpg")}
                    selector={selectPasswordResetModalState}
                    resetState={changePasswordResetModalState}
                    typeOfMessage="success"
                    messages={["Your password has been reset", "Successfully"]}
                />
            )}
            <View className="p-3 h-full">
                <View className="mt-5">
                    <View className="flex-row">
                        <View className="mr-3 flex-row items-center">
                            <CustomBackButton
                                onBackPress={() => {
                                    dispatch(screenStack({ screen: PROFILE_SCREEN, to: "push" }));
                                    navigation.navigate(PROFILE_SCREEN);
                                }}
                            />
                        </View>

                        <View className="flex-row items-end flex-1">
                            <Text className="font-bold text-4xl">Login</Text>
                            <View className="flex-row space-x-1 mb-1">
                                <Text className="italic ml-2" style={{ color: QUATERNARY_COLOR }}>
                                    to
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(HOME_TAB);
                                    }}
                                >
                                    <Text className="font-bold" style={{ color: QUATERNARY_COLOR }}>
                                        Ul-Shopify
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ArrowRightOnRectangleIcon size="40" color="black" />
                    </View>
                    <Text className="text-gray-400 text-base mt-1">Enter your details to Register</Text>
                </View>
                <View className="flex-1 justify-between">
                    <ScrollView className="flex-1">
                        <View className="mt-6 flex-1" showsVerticalScrollIndicator={false}>
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
                            <View className="flex-row justify-end -mt-5">
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(FORGOT_PASSWORD_SCREEN);
                                    }}
                                >
                                    <Text className="font-bold" style={{ color: QUATERNARY_COLOR }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {!isKeyboardVisible && (
                        <AuthButtonSection
                            buttonText="Login"
                            authQuestionText="Don't have an account?"
                            navigateToText="Register"
                            navigateTo={REGISTRATION_SCREEN}
                            validate={validate}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
