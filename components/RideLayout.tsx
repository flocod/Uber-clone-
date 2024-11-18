import { icons } from "@/constants";
import { router } from "expo-router";
import React, { useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Map from "./Map";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-1 flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-10 items-center justify-start px-5  gap-1 rounded-r-full">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="p-2 bg-white rounded-full">
                <Image
                  resizeMode="contain"
                  className="w-6 h-6"
                  source={icons.backArrow}
                />
              </View>
            </TouchableOpacity>
            <View className="bg-white px-5 h-10 items-center flex justify-center  rounded-full leading-[0px]">
              <Text className="text-xl  font-JakartaSemiBold ml-0">
                {title || "Go Back"}
              </Text>
            </View>
          </View>

          <Map />

          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints || ["65%", "70%"]}
            index={0}
          >
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetView>
          </BottomSheet>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default RideLayout;
