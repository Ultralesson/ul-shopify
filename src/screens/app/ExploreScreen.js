import React, { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { ChevronLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICON_SIZE_SMALL } from "../../../constants/sizes";
import { ICON_COLOR } from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { EXPLORE_SCREEN } from "../../../constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { screenStack, selectNavigateBackScreen } from "../../store/slices/appStateSlice";
import { selectIsTabBarVisible, showTabBar } from "../../store/slices/appUIStateSlice";

const EXPLORE = {
    BACK_BUTTON: "btn-explore-back",
    SEARCH_BUTTON: "btn-explore-search",
    INPUT_FIELD: "tf-explore",
};

const ExploreScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const navigateBackScreen = useSelector(selectNavigateBackScreen);
    const isTabBarVisible = useSelector(selectIsTabBarVisible);

    useEffect(() => {
        dispatch(screenStack({ screen: EXPLORE_SCREEN, to: "push" }));
    }, []);

    return (
        <SafeAreaView>
            <View>
                <View className="flex-row justify-between items-center ml-3 mr-3 mt-5 mb-3 p-2 rounded-xl border-[0.30px] border-gray-400">
                    <TouchableOpacity
                        testID={EXPLORE.BACK_BUTTON}
                        accessibilityLabel={EXPLORE.BACK_BUTTON}
                        className="mr-2"
                        onPress={() => {
                            // If the navigation is happening within the screen then we will operate on screen
                            let NAVIGATE_BACK_TO = null;
                            // isTabBarVisible is used to get the state of visibility of tab bar,
                            // As it's false indicates we have modified within the screen else we have navigated to explore screen via tabs
                            if (isTabBarVisible === false) {
                                NAVIGATE_BACK_TO = navigateBackScreen;
                            } else {
                                NAVIGATE_BACK_TO = navigateBackScreen.split("-screen")[0] + "-tab";
                            }
                            dispatch(screenStack({ to: "pop" })); // Once navigated pop-off the earlier screen
                            dispatch(showTabBar());
                            navigation.navigate(NAVIGATE_BACK_TO);
                        }}
                    >
                        <ChevronLeftIcon size={ICON_SIZE_SMALL} color={ICON_COLOR} />
                    </TouchableOpacity>
                    <TextInput
                        testID={EXPLORE.INPUT_FIELD}
                        accessibilityLabel={EXPLORE.INPUT_FIELD}
                        className="flex-1"
                        placeholder="explore"
                    />
                    <TouchableOpacity testID={EXPLORE.SEARCH_BUTTON} accessibilityLabel={EXPLORE.SEARCH_BUTTON}>
                        <MagnifyingGlassIcon size={ICON_SIZE_SMALL} color={ICON_COLOR} />
                    </TouchableOpacity>
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
