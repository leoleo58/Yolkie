import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Menu() {
    return (
        <View style={styles.container}>
            <Text  style={styles.text}>
                Pick the perfect egg ✨
            </Text>

            <View style={styles.cardContainer}>
                {/* Pressable card to enable navigation to timer page */}
                <Link href={{ pathname: "/timer", params: { type: "half" }}} asChild>
                    <Pressable style={styles.card}>
                        <Image source={require("../assets/half.png")} style={styles.icon}/>
                    </Pressable>
                </Link>

                <Link href={{ pathname: "/timer", params: { type: "soft" }}} asChild>
                    <Pressable style={styles.card}>
                        <Image source={require("../assets/soft.png")} style={styles.icon}/>
                    </Pressable>
                </Link>

                <Link href={{ pathname: "/timer", params: { type: "hard" }}} asChild>
                    <Pressable style={styles.card}>
                        <Image source={require("../assets/hard.png")} style={styles.icon}/>
                    </Pressable>
                </Link>
            </View>

            <View style={styles.tipContainer}>
                <Text style={styles.titel}>
                    💡Cooking Times: 
                </Text>
                <Text style={styles.tip}>
                    Half: 3,5 minutes - Runny white + yolk
                </Text>
                <Text style={styles.tip}>
                    Soft: 8 minutes - Runny yolk
                </Text>
                <Text style={styles.tip}>
                    Hard: 10 minutes - Firm yolk
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF1B8",
        padding: 20,
        paddingHorizontal: 25,
    },

    text: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#ffaa01ff",
        textAlign: "center",
        marginBottom: 30
    },

    cardContainer: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        marginBottom: 30,
        gap: 0,
    },

    card: {
        backgroundColor: "#FFF1B8",
        borderRadius: 15,
        width: 115,
        height: 180,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,

    },

    icon: {
        width: 115,
        height:180,
        resizeMode: "contain"
    },

    tipContainer: {
        backgroundColor: "#fff6d4ff",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#ffaa01ff",
        padding: 10,
    },
    
    titel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fca210ff",
        marginBottom: 10,
        textAlign: "center"
    },

    tip: {
        fontSize: 14,
        color: "#997205d5",
        marginBottom: 7

    }
})