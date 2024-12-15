import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Add() {
    return (
        <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
          <Text>Add Page</Text>
          <Link href="../">Home</Link>
    </View>
    )
}