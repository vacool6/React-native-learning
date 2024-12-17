import { Alert, Button, Platform, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  // Push Notification

  async function sendPushNotification() {
    try {
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "ExponentPushToken[HAVING TROUBLE GETTING THIS TOKEN :( ]",
          title: "Title",
          body: "This is the body",
        }),
      });
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  useEffect(() => {
    async function configurePushNotification() {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (finalStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert(
            "Permission required.",
            "You need to give the permission."
          );
          return;
        }

        // Additional setup for Android
        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "Default",
            importance: Notifications.AndroidImportance.DEFAULT,
          });
        }

        const pushTokenData = await Notifications.getExpoPushTokenAsync();
        console.log("Use this token above", pushTokenData);
      } catch (err) {
        console.log("ERROR", err);
      }
    }

    configurePushNotification();
  }, []);

  // Local Notification

  function pressHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "This is a title",
        body: "Contents of a body",
        data: { Key: "VAL" },
      },
      trigger: {
        seconds: 4,
      },
    });
  }

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Logs when notification popups", notification);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (res) => {
        console.log("Logs when user taps on notification", res);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Gimme a notification" onPress={pressHandler} />
      <Button
        title="Gimme a push notification"
        onPress={sendPushNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
