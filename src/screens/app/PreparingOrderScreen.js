import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { PRIMARY_COLOR, TERNARY_COLOR } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { THANKYOU_SCREEN } from "../../../constants/screens";

export const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Random time between, say, 2 to 5 seconds
        const randomTime = Math.random() * (5000 - 2000) + 2000;

        const timer = setTimeout(() => {
            navigation.navigate(THANKYOU_SCREEN); // Replace 'ThankYouScreen' with your screen name
        }, randomTime);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [navigation]);

    return (
        <SafeAreaView
            accessible={false}
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: PRIMARY_COLOR }}
        >
            <Animatable.Image
                accessible={true}
                testID="img-preparing-order"
                source={require("../../../assets/gifs/preparing-order.gif")}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-full"
            />
            <Animatable.Text
                accessible={true}
                testID="txt-preparing-order-wait-message"
                animation="slideInUp"
                iterationCount={1}
                className="text-lg my-2 text-center mb-6"
            >
                Hang tight! We're wrapping up your order...
            </Animatable.Text>
            <Progress.Circle
                accessible={true}
                testID="img-progress"
                size={60}
                indeterminate={true}
                color={TERNARY_COLOR}
            />
        </SafeAreaView>
    );
};
