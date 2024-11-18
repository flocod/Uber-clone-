import RideLayout from "@/components/RideLayout";
import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { drivers } from "@/lib/maps";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  console.log({ text: "drivers", drivers });
  return (
    <RideLayout title="Choose a driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            key={item.id}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id))}
            item={item}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            ></CustomButton>
          </View>
        )}
      />
    </RideLayout>
  );
};

const styles = StyleSheet.create({});

export default ConfirmRide;
