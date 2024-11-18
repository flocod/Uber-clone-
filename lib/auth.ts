import * as SecureStore from "expo-secure-store";
import { useAuth } from "@clerk/clerk-expo";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
  async deleteToken(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
      console.error("SecureStore deleted");
    } catch (err) {
      console.error("delete SecureStore Failed");
      return;
    }
  },
};

export const SignOut = async () => {
  const { signOut } = useAuth();
  try {
    await signOut();
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
