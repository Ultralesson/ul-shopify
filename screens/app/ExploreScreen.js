import React from "react";
import { Text, TextInput, View } from "react-native";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICON_SIZE_MEDIUM } from "../../constants/sizes";
import { ICON_COLOR } from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HOME_SCREEN } from "../../constants/screens";

const ExploreScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                <View className="flex-row m-4 items-center space-x-4">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(HOME_SCREEN);
                        }}
                    >
                        <ArrowLeftIcon size={ICON_SIZE_MEDIUM} color={ICON_COLOR} />
                    </TouchableOpacity>
                    <View className="flex-row items-center flex-1 justify-between border-[0.30px] border-solid rounded-3xl p-3">
                        <TextInput className="flex-1" placeholder="explore" />
                        <TouchableOpacity>
                            <MagnifyingGlassIcon size={ICON_SIZE_MEDIUM} color={ICON_COLOR} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex justify-center items-center">
                    <Text className="font-bold text-xl">Explore Screen</Text>
                    <Text className="italic">Coming soon...</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ExploreScreen;
