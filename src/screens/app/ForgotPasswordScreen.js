import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SCREEN } from "../../../constants/screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Keyboard, Text, View, TouchableOpacity } from "react-native";
import CustomInput from "../../components/common/CustomInput";
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import { ICON_SIZE_SMALL } from "../../../constants/sizes";
import { ICON_COLOR, QUATERNARY_COLOR } from "../../../constants/colors";
import CustomBackButton from "../../components/common/CustomBackButton";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import CustomButton from "../../components/common/CustomButton";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import { changePasswordResetModalState } from "../../store/slices/modalsSlice";
import { userModel } from "../../../utilities/asyncStorage";

const ForgotPasswordScreen = () => {
    const dispatch = useDispatch();
    const isKeyboardVisible = useKeyboardStatus();
    const navigation = useNavigation();
    const [inputs, setInputs] = useState({
        email: null,
        newPassword: null,
        confirmPassword: null,
    });
    const [hideInputs, setHideInputs] = useState({
        email: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [errors, setErrors] = useState({});
    const [displayResetButton, setResetButtonState] = useState(false);

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

    const validateEmailField = async () => {
        const validateEmailSchema = Yup.object().shape({
            email: Yup.string().required("Email field cannot be empty").email("Email format is incorrect"),
        });
        return validateEmailSchema;
    };

    const validatePasswordField = async () => {
        const newPasswordSchema = Yup.object().shape({
            newPassword: Yup.string()
                .required("Password field cannot be empty")
                .min(5, "Password should be minimum of 5 characters"),
            confirmPassword: Yup.string()
                .required("Confirm password field cannot be empty")
                .oneOf([Yup.ref("newPassword")], "Confirm password is not matched with password"),
        });
        return newPasswordSchema;
    };

    const validate = async (validateSchema) => {
        try {
            await validateSchema.validate(inputs, { abortEarly: false });
            return true;
        } catch (error) {
            error.inner.forEach((err) => {
                handleErrors(err.message, err.path);
                if (err.message === "Confirm password is not matched with password") {
                    setInputs((prevState) => {
                        return { ...prevState, confirmPassword: "" };
                    });
                }
            });

            return false;
        }
    };

    const resetStates = () => {
        setErrors({});
        setInputs({ email: null, newPassword: null, confirmPassword: null });
        setHideInputs({ email: false, newPassword: false, confirmPassword: false });
    };

    useEffect(() => {}, []);

    return (
        <SafeAreaView className="bg-white h-full flex-1" accessible={false}>
            <View className="m-3 flex-row" accessible={false}>
                <View className="absolute z-2" accessible={false}>
                    <CustomBackButton
                        onBackPress={() => {
                            // Reset the data
                            resetStates();
                            // Navigation to login screen
                            navigation.navigate(LOGIN_SCREEN);
                        }}
                    />
                </View>
            </View>

            <View accessible={false} className={`w-full h-48 -z-10  ${isKeyboardVisible ? "h-1/3" : ""}`}>
                <Image
                    accessible={true}
                    testID="img-forgot-password"
                    source={require("../../../assets/images/forgotPassword.jpg")}
                    resizeMode="contain"
                    className={`w-full h-full mb-3`}
                />
            </View>

            <View className="flex-1 m-4" accessible={false}>
                <View accessible={false}>
                    <View className="mb-3" accessible={false}>
                        <Text
                            accessible={true}
                            className="text-3xl"
                            style={{ color: QUATERNARY_COLOR }}
                            testID="txt-forgot-password"
                        >
                            Forgot <Text className="text-xl font-bold">password?</Text>
                        </Text>
                    </View>
                </View>

                <View className="flex-1 h-1/2" accessible={false}>
                    {!hideInputs.email && (
                        <View className="flex-row items-center" accessible={false}>
                            <View className="flex-1 justify-center" accessible={false}>
                                <CustomInput
                                    customStyle={"bg-gray-100"}
                                    label="Email"
                                    value={inputs.email}
                                    placeholder="Enter your email"
                                    Icon={EnvelopeIcon}
                                    iconName={"envelop"}
                                    inputName={"email"}
                                    iconSize="25"
                                    iconColor="black"
                                    mode="email"
                                    error={errors.email}
                                    onChangeText={(text) => {
                                        handleOnChangeText(text, "email");
                                    }}
                                    onFocus={() => {
                                        handleErrors(undefined, "email");
                                    }}
                                />
                            </View>
                            <TouchableOpacity
                                accessible={true}
                                testID="btn-next"
                                className={`ml-3 ${errors.email ? "-mt-4" : ""}`}
                                onPress={async () => {
                                    setResetButtonState(true);
                                    // Check for the email to be registered from storage cache if not then new password section should not appear
                                    Keyboard.dismiss();
                                    if (await validate(await validateEmailField())) {
                                        setHideInputs((prevState) => {
                                            return { ...prevState, email: true, newPassword: true };
                                        });
                                    }
                                }}
                            >
                                <ArrowRightIcon testID="icon-next" size={ICON_SIZE_SMALL} color={ICON_COLOR} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {hideInputs.newPassword && (
                        <View accessible={false}>
                            <CustomInput
                                customStyle={"bg-gray-100"}
                                password={true}
                                error={errors.newPassword}
                                label="New password"
                                value={inputs.newPassword}
                                placeholder="Enter your new password"
                                Icon={LockClosedIcon}
                                iconName={"lock-closed"}
                                inputName={"new-password"}
                                iconSize="25"
                                mode="text"
                                iconColor="black"
                                onChangeText={(text) => {
                                    handleOnChangeText(text, "newPassword");
                                }}
                                onFocus={() => {
                                    handleErrors(undefined, "newPassword");
                                }}
                            />
                            <CustomInput
                                customStyle={"bg-gray-100"}
                                password={true}
                                error={errors.confirmPassword}
                                label="Confirm password"
                                value={inputs.confirmPassword}
                                placeholder="Confirm password"
                                Icon={LockClosedIcon}
                                iconName={"lock-closed"}
                                inputName={"confirm-password"}
                                iconSize="25"
                                mode="text"
                                iconColor="black"
                                onChangeText={(text) => {
                                    handleOnChangeText(text, "confirmPassword");
                                }}
                                onFocus={() => {
                                    handleErrors(undefined, "confirmPassword");
                                }}
                            />
                        </View>
                    )}
                    {/* Do not show the reset button when email field is displayed and also when the keyboard is shown */}
                    {displayResetButton && !isKeyboardVisible && (
                        <View className="mb-1" accessible={false}>
                            <CustomButton
                                text="Reset password"
                                disabled={true}
                                navigateTo={async () => {
                                    Keyboard.dismiss();

                                    if (await validate(await validatePasswordField())) {
                                        const updatePasswordInfo = await userModel("UPDATE_PASSWORD", {
                                            email: inputs.email,
                                            newPassword: inputs.newPassword,
                                        });

                                        resetStates();
                                        dispatch(changePasswordResetModalState());
                                        navigation.navigate(LOGIN_SCREEN);
                                    }
                                }}
                            />
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
