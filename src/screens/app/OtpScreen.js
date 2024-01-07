import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBackButton from "../../components/common/CustomBackButton";
import { QUATERNARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import useKeyboardStatus from "../../hooks/useKeyboardStatus";
import CustomButton from "../../components/common/CustomButton";
import { HOME_TAB, LOADING_SCREEN, OTP_SCREEN, PROFILE_SCREEN, PROFILE_TAB } from "../../../constants/screens";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
    changeToastModalState,
    changeQuitActionModal,
    changeRegistrationModalState,
} from "../../store/slices/modalsSlice";
import { getTempState, login, selectAuthState, selectTempState } from "../../store/slices/authSlice";
import { userModel } from "../../../utilities/asyncStorage";
import { executeActions, selectActions } from "../../store/slices/appStateSlice";

const OtpScreen = () => {
    const OTP_TIMEOUT = 30;

    const keyboardStatus = useKeyboardStatus();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const actionDispatched = useRef(false);
    const actions = useSelector(selectActions);
    const { params: type } = useRoute();

    const [verify, setVerify] = useState(false);
    const [counter, setCounter] = useState(OTP_TIMEOUT);

    const isAuthorized = useSelector(selectAuthState);
    const tempState = useSelector(selectTempState);

    const otpField1 = useRef("");
    const otpField2 = useRef("");
    const otpField3 = useRef("");
    const otpField4 = useRef("");

    const [otpInputs, setOtpInputs] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
    });

    const focusNextInOtpFields = (nextToFocus) => {
        nextToFocus.current.focus();
    };

    const onOtpEntering = ({ text, nextToFocus, currentValueToSet }) => {
        if (text.length === 1) {
            switch (currentValueToSet) {
                case "otp1":
                    setOtpInputs((prevState) => {
                        return { ...prevState, otp1: text };
                    });
                    focusNextInOtpFields(nextToFocus);
                    break;
                case "otp2":
                    setOtpInputs((prevState) => {
                        return { ...prevState, otp2: text };
                    });
                    focusNextInOtpFields(nextToFocus);

                    break;

                case "otp3":
                    setOtpInputs((prevState) => {
                        return { ...prevState, otp3: text };
                    });
                    focusNextInOtpFields(nextToFocus);

                    break;

                case "otp4":
                    Keyboard.dismiss();
                    setVerify(true);

                    setOtpInputs((prevState) => {
                        return { ...prevState, otp4: text };
                    });
                    break;
            }
        }
    };

    useEffect(() => {
        if (counter === 0) {
            Keyboard.dismiss();
            setOtpInputs((prevState) => {
                return {
                    otp1: "",
                    otp2: "",
                    otp3: "",
                    otp4: "",
                };
            });
            setVerify(false);
        }

        if (!actionDispatched.current) {
            actionDispatched.current = true;
        }

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
                <Text className="mt-3 ml-1 mr-1 ">We have sent an OTP code to your verified mobile number</Text>
                <View className="flex-row gap-5 mt-5">
                    <TextInput
                        value={otpInputs.otp1}
                        editable={counter === 0 ? false : true}
                        selectTextOnFocus={counter === 0 ? false : true}
                        ref={otpField1}
                        onChangeText={(text) =>
                            onOtpEntering({ text, nextToFocus: otpField2, currentValueToSet: "otp1" })
                        }
                        className={`border-[0.50px] border-solid p-3 mt rounded-xl text-center ${
                            counter === 0 ? "bg-gray-100 border-0" : ""
                        }`}
                    />
                    <TextInput
                        value={otpInputs.otp2}
                        editable={counter === 0 ? false : true}
                        selectTextOnFocus={counter === 0 ? false : true}
                        ref={otpField2}
                        onChangeText={(text) =>
                            onOtpEntering({ text, nextToFocus: otpField3, currentValueToSet: "otp2" })
                        }
                        className={`border-[0.50px] border-solid p-3 mt rounded-xl text-center ${
                            counter === 0 ? "bg-gray-100 border-0" : ""
                        }`}
                    />
                    <TextInput
                        value={otpInputs.otp3}
                        editable={counter === 0 ? false : true}
                        selectTextOnFocus={counter === 0 ? false : true}
                        ref={otpField3}
                        onChangeText={(text) =>
                            onOtpEntering({ text, nextToFocus: otpField4, currentValueToSet: "otp3" })
                        }
                        className={`border-[0.50px] border-solid p-3 mt rounded-xl text-center ${
                            counter === 0 ? "bg-gray-100 border-0" : ""
                        }`}
                    />
                    <TextInput
                        value={otpInputs.otp4}
                        editable={counter === 0 ? false : true}
                        selectTextOnFocus={counter === 0 ? false : true}
                        ref={otpField4}
                        onChangeText={(text) => onOtpEntering({ text, currentValueToSet: "otp4" })}
                        className={`border-[0.50px] border-solid p-3 mt rounded-xl text-center ${
                            counter === 0 ? "bg-gray-100 border-0" : ""
                        }`}
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
                navigateTo={async () => {
                    if (verify) {
                        if (type.authType === "register") {
                            userModel("CREATE_USER", { ...tempState, cart: [] }).then((response) => {
                                console.log(response + "ress");
                                dispatch(getTempState(null)); // Resetting the temp state after creating the account

                                if (response.message === "CREATED_USER") {
                                    dispatch(changeRegistrationModalState()); // On successful registration show the popup
                                }

                                dispatch(login(actions[type.authType]));
                                dispatch(
                                    executeActions({
                                        actionName: type.authType,
                                        to: "REMOVE",
                                    })
                                );
                                navigation.navigate(LOADING_SCREEN, { navigateTo: HOME_TAB });
                            });
                        } else if (type.authType === "login") {
                            dispatch(login(actions[type.authType]));
                            dispatch(
                                executeActions({
                                    actionName: type.authType,
                                    to: "REMOVE",
                                })
                            );
                            navigation.navigate(LOADING_SCREEN, { navigateTo: HOME_TAB });
                        }
                    } else {
                        dispatch(changeToastModalState({ status: true, text: "OTP cannot be empty", type: "error" }));
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default OtpScreen;
