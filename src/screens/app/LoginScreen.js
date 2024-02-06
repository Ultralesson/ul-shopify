import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Keyboard, Platform } from "react-native";
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
    OTP_SCREEN,
    PROFILE_SCREEN,
    REGISTRATION_SCREEN,
} from "../../../constants/screens";
import AuthButtonSection from "../../components/app/AuthButtonSection";
import CustomBackButton from "../../components/common/CustomBackButton";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import { executeActions, selectActions } from "../../store/slices/appStateSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    changeToastModalState,
    changePasswordResetModalState,
    selectPasswordResetModalState,
} from "../../store/slices/modalsSlice";
import CustomMessageModal from "../../components/common/CustomMessageModal";
import { userModel } from "../../../utilities/asyncStorage";
import CustomToast from "../../modals/Toast";

const LoginScreen = () => {
    const navigation = useNavigation();
    const isKeyboardVisible = useKeyboardStatus();
    const dispatch = useDispatch();

    const selectPasswordResetState = useSelector(selectPasswordResetModalState);
    const actions = useSelector(selectActions);

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
            _login();
        } catch (error) {
            error.inner.forEach((err) => {
                handleErrors(err.message, err.path);
            });
        }
    };

    // Adding the underscore to differentiate from the slice action in authSlice
    const _login = async () => {
        const cachedData = await userModel("GET_USER", { email: inputs.email });
        if (cachedData.message === "EMAIL_IS_NOT_FOUND") {
            dispatch(
                executeActions({
                    actionName: "emailNotRegisteredToast",
                    actionPayload: {
                        status: true,
                        text: "Email is not registered",
                        type: "error",
                    },
                    to: "STORE",
                })
            );

            navigation.navigate(LOADING_SCREEN, { navigateTo: REGISTRATION_SCREEN });
        } else if (cachedData.message === "EMAIL_IS_FOUND") {
            if (inputs.password !== cachedData.data.password) {
                setInputs((prevState) => {
                    return { ...prevState, password: "" };
                });
                dispatch(changeToastModalState({ status: true, text: "Password is wrong", type: "error" }));

                return;
            }
            dispatch(
                executeActions({
                    actionName: "login",
                    actionPayload: {
                        status: true,
                        type: "login",
                        email: inputs.email,
                    },
                    to: "STORE",
                })
            );
            navigation.navigate(LOADING_SCREEN, { navigateTo: OTP_SCREEN, authType: "login" });
        }
    };

    const handleEmailAlreadyRegisteredToast = () => {
        if ("emailAlreadyRegisteredToast" in actions) {
            dispatch(changeToastModalState(actions["emailAlreadyRegisteredToast"]));
        }
        dispatch(
            executeActions({
                actionName: "emailAlreadyRegisteredToast",
                to: "REMOVE",
            })
        );
    };

    useEffect(() => {
        handleEmailAlreadyRegisteredToast();
    }, []);

    return (
        <SafeAreaView accessible={false}>
            <CustomToast text={"Password is wrong"} />
            {selectPasswordResetState && (
                <CustomMessageModal
                    gifOrImage={require("../../../assets/images/passwordResetSuccessful.jpg")}
                    selector={selectPasswordResetModalState}
                    resetState={changePasswordResetModalState}
                    typeOfMessage="success"
                    messages={["Your password has been reset", "Successfully"]}
                />
            )}
            <View className="p-3 h-full" accessible={false}>
                <View className="mt-5" accessible={false}>
                    <View className="flex-row" accessible={false}>
                        <View className="mr-3 flex-row items-center" accessible={false}>
                            <CustomBackButton
                                onBackPress={() => {
                                    navigation.navigate(PROFILE_SCREEN);
                                }}
                            />
                        </View>

                        <View className="flex-row items-end flex-1" accessible={false}>
                            <Text
                                accessible={true}
                                testID={
                                    Platform.OS === "android"
                                        ? "com.ultralesson.ulshopify:id/txt-login-heading"
                                        : "txt-login-heading"
                                }
                                className="font-bold text-4xl"
                            >
                                Login
                            </Text>
                            <View className="flex-row space-x-1 mb-1" accessible={false}>
                                <Text
                                    accessible={true}
                                    testID={
                                        Platform.OS === "android"
                                            ? "com.ultralesson.ulshopify:id/txt-to-subheading"
                                            : "txt-ro-subheading"
                                    }
                                    className="italic ml-2"
                                    style={{ color: QUATERNARY_COLOR }}
                                >
                                    to
                                </Text>
                                <TouchableOpacity
                                    accessible={true}
                                    testID={
                                        Platform.OS === "android"
                                            ? "com.ultralesson.ulshopify:id/btn-ulshopify"
                                            : "btn-ulshopify"
                                    }
                                    onPress={() => {
                                        navigation.navigate(HOME_TAB);
                                    }}
                                >
                                    <Text
                                        accessible={true}
                                        testID={
                                            Platform.OS === "android"
                                                ? "com.ultralesson.ulshopify:id/txt-ulshopify"
                                                : "txt-ulshopify"
                                        }
                                        className="font-bold"
                                        style={{ color: QUATERNARY_COLOR }}
                                    >
                                        Ul-Shopify
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ArrowRightOnRectangleIcon size="40" color="black" />
                    </View>
                </View>
                <View className="flex-1 justify-between" accessible={false}>
                    <ScrollView className="flex-1" accessible={false}>
                        <View className="mt-6 flex-1" showsVerticalScrollIndicator={false} accessible={false}>
                            <CustomInput
                                label="Email"
                                value={inputs.email}
                                placeholder="Enter your email"
                                Icon={EnvelopeIcon}
                                iconName={"envelop"}
                                inputName={"email"}
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
                                iconName={"lock-closed"}
                                inputName={"password"}
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
                            <View className="flex-row justify-end -mt-5" accessible={false}>
                                <TouchableOpacity
                                    accessible={true}
                                    testID={
                                        Platform.OS === "android"
                                            ? "com.ultralesson.ulshopify:id/btn-forgot-password"
                                            : "btn-forgot-password"
                                    }
                                    onPress={() => {
                                        navigation.navigate(FORGOT_PASSWORD_SCREEN);
                                    }}
                                >
                                    <Text
                                        accessible={true}
                                        testID={
                                            Platform.OS === "android"
                                                ? "com.ultralesson.ulshopify:id/txt-forgot-password"
                                                : "txt-forgot-password"
                                        }
                                        className="font-bold"
                                        style={{ color: QUATERNARY_COLOR }}
                                    >
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
