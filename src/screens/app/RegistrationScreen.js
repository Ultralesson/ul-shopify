import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Keyboard, TouchableOpacity } from "react-native";
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

import { QUATERNARY_COLOR } from "../../../constants/colors";
import { HOME_TAB, LOADING_SCREEN, LOGIN_SCREEN, OTP_SCREEN, PROFILE_SCREEN } from "../../../constants/screens";
import AuthButtonSection from "../../components/app/AuthButtonSection";
import { useDispatch, useSelector } from "react-redux";
import { getTempState, login } from "../../store/slices/authSlice";
import { changeToastModalState } from "../../store/slices/modalsSlice";
import CustomBackButton from "../../components/common/CustomBackButton";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import { executeActions, selectActions } from "../../store/slices/appStateSlice";
import { userModel } from "../../../utilities/asyncStorage";
import { hideTabBar } from "../../store/slices/appUIStateSlice";

const RegistrationScreen = () => {
    useEffect(() => {
        dispatch(hideTabBar());
    });

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isKeyboardVisible = useKeyboardStatus();
    const actions = useSelector(selectActions);

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
        userModel("GET_USER", { email: inputs.email }).then((response) => {
            if (response.message === "EMAIL_IS_FOUND") {
                dispatch(
                    executeActions({
                        actionName: "emailAlreadyRegisteredToast",
                        actionPayload: { status: true, text: "Email already registered", type: "error" },
                        to: "STORE",
                    })
                );
                navigation.navigate(LOADING_SCREEN, { navigateTo: LOGIN_SCREEN });
            } else {
                dispatch(
                    executeActions({
                        actionName: "register",
                        actionPayload: {
                            status: true,
                            type: "register",
                            email: inputs.email,
                        },
                        to: "STORE",
                    })
                );
                dispatch(getTempState({ ...inputs }));
                navigation.navigate(LOADING_SCREEN, { navigateTo: OTP_SCREEN, authType: "register" });
            }
        });
    };

    const handleEmailNotRegisteredToast = () => {
        if ("emailNotRegisteredToast" in actions) {
            dispatch(changeToastModalState(actions["emailNotRegisteredToast"]));
        }
        dispatch(
            executeActions({
                actionName: "emailNotRegisteredToast",
                to: "REMOVE",
            })
        );
    };

    useEffect(() => {
        handleEmailNotRegisteredToast();
    }, []);

    return (
        <SafeAreaView accessible={false}>
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

                        <View className="flex-row items-center justify-between flex-1" accessible={false}>
                            <View className="flex-row items-end" accessible={false}>
                                <Text testID="txt-register-heading" accessible={true} className="font-bold text-4xl">
                                    Register
                                </Text>
                                <View className="flex-row space-x-1 mb-1" accessible={false}>
                                    <Text
                                        accessible={true}
                                        testID="txt-to-subheading"
                                        className="italic ml-2"
                                        style={{ color: QUATERNARY_COLOR }}
                                    >
                                        to
                                    </Text>
                                    <TouchableOpacity
                                        accessible={true}
                                        testID="btn-ulshopify"
                                        onPress={() => {
                                            navigation.navigate(HOME_TAB);
                                        }}
                                    >
                                        <Text
                                            accessible={true}
                                            testID="txt-ulshopify"
                                            className="font-bold"
                                            style={{ color: QUATERNARY_COLOR }}
                                        >
                                            Ul-Shopify
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <UserPlusIcon accessible={true} testID="icon-user-plus" size="40" color="black" />
                        </View>
                    </View>
                </View>
                <View className="flex-1 justify-between" accessible={false}>
                    <View className="flex-1" accessible={false}>
                        <ScrollView className="mt-6 flex-1" showsVerticalScrollIndicator={false} accessible={false}>
                            <CustomInput
                                label="Full Name"
                                value={inputs.fullName}
                                placeholder="Enter your full name"
                                Icon={UserIcon}
                                iconName={"user"}
                                inputName={"fullname"}
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
                            <CustomInput
                                label="Confirm password"
                                value={inputs.confirmPassword}
                                placeholder="Confirm your password"
                                password={true}
                                Icon={ShieldCheckIcon}
                                iconName={"shield-check"}
                                inputName={"confirm-password"}
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
                                iconName={"mobile"}
                                inputName={"mobile-number"}
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

                    {!isKeyboardVisible && (
                        <AuthButtonSection
                            buttonText="Register"
                            authQuestionText="Already have an account?"
                            navigateToText="Login"
                            navigateTo={LOGIN_SCREEN}
                            validate={validate}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegistrationScreen;
