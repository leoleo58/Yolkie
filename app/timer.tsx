import { router, useLocalSearchParams } from "expo-router"; 
import { useCallback, useEffect, useMemo, useRef, useState } from "react"; 
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";

export default function Timer() {
    // Get the egg type from selected menu
    const { type } = useLocalSearchParams();

    // State management
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Reference to the timer interval
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Egg data
    const eggType = useMemo(() => ({
        half: "Half Boiled",    
        soft: "Soft Boiled",     
        hard: "Hard Boiled",  
    }), []);

    const eggTime = useMemo(() => ({
        half: 3.5 * 60,    
        soft: 8 * 60,      
        hard: 10 * 60, 
    }), []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const eggDescription = useMemo(() => ({
        half: "Runny yolk, Slightly runny white",    
        soft: "Slightly runny yolk",     
        hard: "Firm yolk, soft center",  
    }), []);
    
    // Navigate back to menu
    const handleBack = useCallback(() => {
        router.back();
    }, []);

    // Start or stop timer
    const toggleTimer = () => {
        if (isRunning){
            setIsRunning(false)
        } else {
            setIsRunning(true);
            setIsFinished(false);
        }
    };

    // Reset timer back to default
    const resetTimer = useCallback( () =>{
        if (type && eggTime[type as keyof typeof eggTime]){
            setTimeLeft(eggTime[type as keyof typeof eggTime]);
            setIsRunning(false);
            setIsFinished(false);
            setShowAlert(false); 
        }
    }, [type, eggTime])

    // Alert and vibrate when timer is finished
    const timerFinish = useCallback( async() => {
        setShowAlert(true);
        Vibration.vibrate([0, 500, 200, 500]); 
    }, [])

    // Different color for timer state
    const getColor = () => {
        if (isFinished) return "#fe84adff"; 
        if (isRunning) return "#fd0f72d1";
        return "#ff8800ff";
    };

    useEffect(() => {
        if (type && eggTime[type as keyof typeof eggTime]) {
        setTimeLeft(eggTime[type as keyof typeof eggTime]);
        }
    }, [type, eggTime]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
            if (prev <= 1) {
                setIsRunning(false);
                setIsFinished(true);
                timerFinish();
                return 0;
            }
            return prev - 1;
            });
        }, 1000);
        } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
        }

        return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        };
    }, [isRunning, timeLeft, timerFinish]);

    return (
        <View style={styles.container}>
            {!isRunning && (
                <Pressable style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}> ← </Text>
                </Pressable> 
            )}
            
            <Text style={styles.title}> {eggType[type as keyof typeof eggType]} </Text>
            <Text style={styles.eggDescription}> {eggDescription[type as keyof typeof eggType]} </Text>

            <View style={styles.timerContainer}>
                <Text style={[styles.timerText, {color: getColor()}]}>
                    {formatTime(timeLeft)}
                </Text>
                <Text style={[styles.timerText, {color: getColor()}]}>
                    {isFinished ? "Ready! ✨" : isRunning ? "Cooking... 🔥" : "Waiting to start ⏰"}
                </Text>
            </View>
            
            { isRunning ? (
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.stopResetButton} onPress={toggleTimer}>
                        <Text style={styles.stopResetButtonText}> Stop </Text>
                    </Pressable>
                    </View>
                ):(
                    <View style={styles.buttonContainer}>
                    <Pressable style={styles.startButton} onPress={toggleTimer}>
                        <Text style={styles.startButtonText}> Start </Text>
                    </Pressable>
                    <Pressable style={styles.stopResetButton} onPress={resetTimer}>
                        <Text style={styles.stopResetButtonText}> Reset </Text>
                    </Pressable>
                    </View>
                )}     

            <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                    Start timer when water is boiling
                </Text>
            </View>

            {showAlert && (
                <View style={styles.alertOverlay}>
                <View style={styles.alertContainer}>
                    <Text style={styles.alertTitel}>
                        Your egg is ready!
                    </Text>
                    <Text style={styles.alertText}>
                        Your {eggType[type as keyof typeof eggType]} is perfectly cooked! ✨
                    </Text>
                    <Pressable 
                    style={styles.alertButton} 
                    onPress={() => {
                        setShowAlert(false);
                        resetTimer();
                    }}
                    >
                    <Text style={styles.alertButtonText}>OK</Text>
                    </Pressable>
                </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF1B8",
        padding: 20,
    },

    backButton: {
        position: "absolute",
        top: 30,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#FFE69C",
        justifyContent: "center",
        alignItems: "center",
    },

    backButtonText: {
        fontSize: 25,
        color: "#ff8a0eff",
        fontWeight: "bold",
    },  

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ff8a0eff",
        marginBottom: 20,
        textAlign: "center",
    },

    eggDescription: {
        fontSize: 20,
        color: "#f9ad5bff",
        marginBottom: 20,
        textAlign: "center",
    },

    timerContainer: {
        alignItems: "center",
    },

    timer: {
        width: 100,
        height: 100,
        backgroundColor: "#ff8a0eff",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },

    timerText: {
        fontSize: 24,
        fontWeight: "bold",
        alignItems: "center",
        color: "#ff6600ff"
    }, 

    buttonContainer:{
        flexDirection: "row",
        padding: 20,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        
    },

    startButton:{
        width: 100,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ffdb6dff",
        justifyContent: "center",
        alignItems: "center",
    },

    startButtonText:{
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        color: "#ff8a0eff"
    },

    stopResetButton:{
        width: 100,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ffdeb0ff",
        justifyContent: "center",
        alignItems: "center",
    },

    stopResetButtonText:{
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        color: "rgba(255, 123, 0, 1)"
    },

    instructionContainer: {
        padding: 20,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fecc35ff",
        borderRadius: 20
    },

    instructionText: {
        fontSize: 20,
        alignItems: "center",
        color: "#fff9e2ff"
    },

    alertOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(97, 84, 45, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    }, 
    
    alertContainer: {
        padding: 20,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffedb9ff",
        borderRadius: 20,
        borderColor: "#f6cc50ff",
        borderWidth: 5
    },

    alertTitel: {
        fontSize: 30,
        alignItems: "center",
        color: "#e87a05ff"
    },

    alertText: {
        fontSize: 20,
        alignItems: "center",
        color: "#fb9527ff"
    },

    alertButton: {
        width: 100,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#ff990aff",
        justifyContent: "center",
        alignItems: "center",
    },
    
    alertButtonText: {
        fontSize: 20,
        alignItems: "center",
        color: "#fbf4c8ff"
    }

});