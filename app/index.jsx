import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import Screen from "../components/Screen";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const listOfNumberKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "0",
  "%"
];

let interval, i, val;

const Home = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleButtonPress = key => {
    if (key === "=") {
      try {
        if (value.replaceAll("×", "*") == val) {
          return;
        }
        clearInterval(interval)
        setResult("");
        i = 0;
        val = value.replaceAll("×", "*");
        let res = eval(val).toString();
        interval = setInterval(() => {
          setResult(prevRes => prevRes + res[i]);
          if (i == res.length - 1) {
            clearInterval(interval);
            i = 0;
          }
          i += 1;
        }, 50);
      } catch (err) {
        Alert.alert("invaild");
      }
    } else if (key === "C") {
      i = 0;
      clearInterval(interval);
      setValue("");
      setResult("");
    } else {
      setValue(prevKey => prevKey + key);
    }
  };

  const handleBackspace = () => {
    let newValue = value.slice(0, value.length - 1);
    setValue(newValue);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            padding: 16
          }}
        >
          <View>
            <Screen inputValue={value} resultValue={result} />
          </View>
          <View className="flex-row w-full justify-start p-7">
            <Pressable
              onPress={handleBackspace}
              className="p-2 w-fit h-fit rounded-full flex items-center justify-center ml-2 overflow-hidden"
              android_ripple={{
                color: "#929292f0",
                radius: 24,
                borderless: true
              }}
            >
              <Ionicons name="backspace-outline" size={24} color="white" />
            </Pressable>
          </View>

          <View className="flex flex-row w-full justify-center items-stretch border-t border-gray-300/20 py-2">
            <View className="flex-row flex-wrap justify-evenly w-3/4 ">
              {listOfNumberKeys.map(e => (
                <CustomButton
                  title={e}
                  key={e}
                  containerStyle={{
                    margin: 2
                  }}
                  onClick={handleButtonPress}
                />
              ))}
            </View>
            <View className="flex flex-col justify-between">
              {["/", "×", "-", "+"].map((op, index) => (
                <CustomButton
                  title={op}
                  key={op}
                  containerStyle={{
                    margin: 2
                  }}
                  textStyle={{
                    color: "#44f082",
                    transform: "scale(1.3)"
                  }}
                  onClick={handleButtonPress}
                />
              ))}
            </View>
          </View>

          <View className="flex flex-row w-full justify-center">
            <CustomButton
              title="C"
              containerStyle={{
                backgroundColor: "#fb4d4d",
                margin: 2
              }}
              textStyle={{
                color: "white",
                transform: "scale(1.4)"
              }}
              rippleColor="#e6e6e6f1"
              onClick={handleButtonPress}
            />
            <CustomButton
              title="="
              containerStyle={{
                width: "70%",
                backgroundColor: "#f7ac52",
                margin: 2
              }}
              textStyle={{
                color: "white",
                transform: "scale(1.7)"
              }}
              rippleColor="#e6e6e6f1"
              onClick={handleButtonPress}
            />
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
