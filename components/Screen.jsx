import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Animated
} from "react-native";

const Screen = ({ inputValue, resultValue }) => {
  const animation = useRef(new Animated.Value(1)).current; // Initialize with 1 to ensure visibility at start
  const [localInputValue, setLocalInputValue] = useState(inputValue);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });

  useEffect(() => {
    if (inputValue !== localInputValue) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true
      }).start(() => {
        setLocalInputValue(inputValue);
        animation.setValue(1); // Reset animation value for next change
        Animated.timing(animation, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true
        }).start();
      });
    }
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView1}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity,
              transform: [{ translateY }]
            }
          ]}
        >
          <TextInput
            style={styles.textInput1}
            value={inputValue}
            onChangeText={setLocalInputValue}
            placeholder={"00"}
            placeholderTextColor="#888"
            editable={false}
            showSoftInputOnFocus={false}
            multiline
            numberOfLines={4}
            onFocus={()=>null}
          />
        </Animated.View>
      </ScrollView>
      <ScrollView style={styles.scrollView2}>
        <TextInput
          style={styles.textInput2}
          value={resultValue}
          placeholderTextColor="#888"
          editable={false}
          showSoftInputOnFocus={false}
          multiline
          numberOfLines={2}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  scrollView1: {
    maxHeight: 180
  },
  animatedContainer: {
    width: "100%"
  },
  textInput1: {
    width: "100%",
    fontSize: 30,
    color: "white",
    textAlign: "right",
    padding: 16,
    letterSpacing:1.2
  },
  scrollView2: {
    maxHeight: 100
  },
  textInput2: {
    width: "100%",
    fontSize: 30,
    color: "#5ceda1",
    textAlign: "right",
    padding: 16,
    letterSpacing:1.2
  }
});

export default Screen;
