import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBackButton from "../../components/common/CustomBackButton";
import { QUATERNARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import CustomButton from "../../components/common/CustomButton";
import { HOME_TAB, LOADING_SCREEN, PROFILE_SCREEN } from "../../../constants/screens";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { changeQuitActionModal } from "../../store/slices/modalsSlice";

const OtpScreen = () => {
    const OTP_TIMEOUT = 5;

    const keyboardStatus = useKeyboardStatus();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [verify, setVerify] = useState(false);
    const [counter, setCounter] = useState(OTP_TIMEOUT);

    const otpField1 = useRef(null);
    const otpField2 = useRef(null);
    const otpField3 = useRef(null);
    const otpField4 = useRef(null);

    const focusNextInOtpFields = (nextToFocus) => {
        nextToFocus.current.focus();
    };
    const onOtpEntering = (text, nextToFocus) => {
        if (text.length === 1) {
            focusNextInOtpFields(nextToFocus);
        }
    };

    const activateVerifyButton = () => {
        // Actual verification of OTP

        Keyboard.dismiss();
        setVerify(true);
    };

    useEffect(() => {
        const timer =
            counter > 0 &&
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [counter]);

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="mt-5 ml-3 z-10">
                <CustomBackButton
                    onBackPress={() => {
                        dispatch(
                            changeQuitActionModal({
                                question: "Do you want to quit ?",
                                status: true,
                                screen: PROFILE_SCREEN,
                            })
                        );
                    }}
                />
            </View>
            <View className="flex justify-center items-center">
                <Image
                    source={require("../../../assets/images/otp.jpg")}
                    className={`w-full object-resize ${!keyboardStatus ? "h-1/2" : "h-1/2 mb-2"}`}
                />
                <View className="flex-row items-end mr-5">
                    <Text className="text-2xl font-bold" style={{ color: QUATERNARY_COLOR }}>
                        Ul-Shopify
                    </Text>
                    <Text className="italic ml-2 font-bold">secure verifier</Text>
                </View>
                <Text className="mt-3 ml-1 mr-1 ">We have sent an OTP code to verify your mobile number</Text>
                <View className="flex-row gap-5 mt-5">
                    <TextInput
                        ref={otpField1}
                        onChangeText={(text) => onOtpEntering(text, otpField2)}
                        className="border-[0.50px] border-solid p-3 mt rounded-xl text-center"
                    />
                    <TextInput
                        ref={otpField2}
                        onChangeText={(text) => onOtpEntering(text, otpField3)}
                        className="border-[0.50px] border-solid p-3 mt rounded-xl text-center"
                    />
                    <TextInput
                        ref={otpField3}
                        onChangeText={(text) => onOtpEntering(text, otpField4)}
                        className="border-[0.50px] border-solid p-3 mt rounded-xl text-center"
                    />
                    <TextInput
                        ref={otpField4}
                        onChangeText={activateVerifyButton}
                        className="border-[0.50px] border-solid p-3 mt rounded-xl text-center"
                    />
                </View>
                <View className="flex-row gap-2 mt-5">
                    <Text>Didn't receive OTP?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (counter === 0) {
                                setCounter(OTP_TIMEOUT);
                            }
                        }}
                    >
                        <Text
                            className="font-bold underline italic"
                            style={{ color: counter === 0 ? QUATERNARY_COLOR : SECONDARY_COLOR }}
                        >
                            Resend again
                        </Text>
                    </TouchableOpacity>
                    <Text className={`${counter === 0 ? "opacity-0" : ""}`}>
                        {parseInt(counter / 60)
                            .toString()
                            .padStart(2, "0")}
                        :
                        {parseInt(counter % 60)
                            .toString()
                            .padStart(2, "0")}
                    </Text>
                </View>
            </View>
            <CustomButton
                text="Verify"
                disabled={verify}
                navigateTo={() => {
                    // Handle if the OTP is incorrect issue then we should not navigate to home tab screen
                    navigation.navigate(LOADING_SCREEN, { navigateTo: HOME_TAB });
                }}
            />
        </SafeAreaView>
    );
};

export default OtpScreen;
