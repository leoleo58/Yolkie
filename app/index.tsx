
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Landing page
export default function Landing() {

  // Auto navigate to menu in 3 seconds
  useEffect(() => {
    const time = setTimeout (() => {
      router.replace("/menu");
    }, 3000);
    return () => clearTimeout(time);
    },[]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icon.png")}
        style={styles.icon}
        resizeMode = "contain"
      />
      <Text style={styles.text}>
        Perfect eggs every time! ✨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E7",
    padding: 20
  },

  icon: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: "contain"
  },

  text: {
    fontSize: 23,
    color: "#FDBA10FF",
    textAlign: "center"
  }
})