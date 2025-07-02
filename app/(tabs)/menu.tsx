import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const dishes = [
  {
    id: "1",
    name: "Double Angus & Bacon",
    price: 15,
    image: require("@/assets/images/baconcheeseburger.webp"),
  },
  {
    id: "2",
    name: "Spicy Angus Burger",
    price: 13,
    image: require("@/assets/images/spicyburger.webp"),
  },
  {
    id: "3",
    name: "Smokey BBQ Angus",
    price: 19,
    image: require("@/assets/images/smokedburger.jpg"),
  },
  // Puedes agregar más platillos aquí
];

const drinks = [
  {
    id: "4",
    name: "Coca Cola",
    price: 3,
    image: require("@/assets/images/cocacola.webp"),
  },
  {
    id: "5",
    name: "Sprite",
    price: 3,
    image: require("@/assets/images/sprite.jpg"),
  },
  {
    id: "6",
    name: "Fanta",
    price: 3,
    image: require("@/assets/images/fanta.jpg"),
  },
  // Puedes agregar más bebidas aquí
];

const desserts = [
  {
    id: "7",
    name: "Chocolate Cake",
    price: 5,
    image: require("@/assets/images/chocolatecake.jpg"),
  },
  // Puedes agregar más postres aquí
];

export default function MenuScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/menu/${item.id}`)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}.00</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Special Burgers</Text>
      <FlatList
        data={dishes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <Text style={styles.header}>Special Drinks</Text>
      <FlatList
        data={drinks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 15,
    alignSelf: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#cccccc",
    margin: 5,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  image: {
    height: 100,
    width: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: 5,
  },
});
