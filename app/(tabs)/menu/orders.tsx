import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Order = {
  id: string;
  description: string;
  status: "pending" | "completed" | "cancelled";
};

const statusColors = {
  pending: "#f0ad4e",
  completed: "#5cb85c",
  cancelled: "#d9534f",
};

const statusIcons = {
  pending: "hourglass-empty",
  completed: "check-circle",
  cancelled: "cancel",
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchOrders();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  }

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        alert("No token found, please login again.");
        setLoading(false);
        return;
      }
      const response = await axios.get("http://192.168.1.6:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetch orders response:", response);
      setOrders(response.data.data ?? response.data ?? []);
    } catch (error: any) {
      console.log("Fetch orders error:", error);
      alert(error.response?.data?.message ?? "Error fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const changeOrderStatus = async (id: string) => {
    try {
      const order = orders.find((o) => o.id === id);
      if (!order) return;

      let newStatus: Order["status"];
      if (order.status === "pending") newStatus = "completed";
      else if (order.status === "completed") newStatus = "cancelled";
      else newStatus = "pending";

      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        alert("No token found, please login again.");
        return;
      }

      const response = await axios.put(
        `http://192.168.1.6:8080/api/orders/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Change order status response:", response);

      Notifications.scheduleNotificationAsync({
        content: {
          title: "Order Status Updated",
          body: `Order "${order.description}" is now ${newStatus}.`,
          sound: true,
        },
        trigger: null,
      });

      fetchOrders();
    } catch (error: any) {
      console.log("Change order status error:", error);
      alert(error.response?.data?.message ?? "Error updating order status.");
    }
  };

  const renderItem = ({ item }: { item: Order }) => (
    <View style={[styles.orderItem, { borderColor: statusColors[item.status] }]}>
      <MaterialIcons
         name={statusIcons[item.status] as any}
        size={24}
        color={statusColors[item.status]}
        style={{ marginRight: 8 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.orderDescription}>{item.description}</Text>
        <Text style={{ color: statusColors[item.status], fontWeight: "bold" }}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: statusColors[item.status] }]}
        onPress={() => changeOrderStatus(item.id)}
      >
        <Text style={styles.buttonText}>Change Status</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Cargando órdenes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders List</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  orderDescription: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
