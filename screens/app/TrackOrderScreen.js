import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TrackOrderScreen = () => {
    return (
        <SafeAreaView>
            <View className="flex h-full justify-center items-center">
                <Text className="font-bold text-xl">Track Order Screen</Text>
                <Text className="italic">Coming soon...</Text>
            </View>
        </SafeAreaView>
    );
};

export default TrackOrderScreen;
