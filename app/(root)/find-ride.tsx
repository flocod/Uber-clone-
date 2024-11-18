import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <View className=" pt-2">
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="border-[2px] border-neutral-200"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setUserLocation(location)}
        />
        <View className="absolute left-3 -top-1 z-1080 px-2 pl-2 bg-white">
          <Text className="text-sm text-neutral-400 font-JakartaSemiBold">
            From
          </Text>
        </View>
      </View>
      <View>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="border-[2px] border-neutral-200"
          textInputBackgroundColor="text-neutral-400"
          handlePress={(location) => setDestinationLocation(location)}
        />
        <View className="absolute left-3 -top-3 z-1080 px-2 pl-2 bg-white">
          <Text className="text-sm text-neutral-400 font-JakartaSemiBold">
            To
          </Text>
        </View>
      </View>

      <CustomButton
        title="Find now"
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mb-10"
      />
    </RideLayout>
  );
};

const styles = StyleSheet.create({});

export default FindRide;
