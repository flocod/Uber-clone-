import { InputFieldProps } from "@/types/type";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  const style = {
    onFocus: {
      textColor: "text-primary-500",
    },
    onBlur: {
      textColor: "text-general-800",
    },
  };
  const [getStyle, setgetStyle] = useState(style.onBlur);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        onFocus={() => setgetStyle(style.onFocus)}
        onBlur={() => setgetStyle(style.onBlur)}
        onPress={Keyboard.dismiss}
      >
        <View className="my-3 w-full">
          <Text
            className={`absolute ${getStyle.textColor}  z-10 translate-x-0 bg-white text-sm -translate-y-[11px] px-4 pr-2 rounded-full font-JakartaSemiBold mb-3 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative  rounded-full border   focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px]  flex-1  ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
              placeholderTextColor={"#CECECE"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
