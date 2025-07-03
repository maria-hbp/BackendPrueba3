import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Card, Provider as PaperProvider, Text } from "react-native-paper";

interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

const categoriesOrder = ['entree', 'main course', 'dessert', 'beverage', 'snack'];

function MenuContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dishesByCategory, setDishesByCategory] = useState<Record<string, Dish[]>>({});

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://192.168.1.6:8080/api/dishes");
        const dishes = response.data.data;

        const grouped: Record<string, Dish[]> = {};
        categoriesOrder.forEach(cat => {
          grouped[cat] = [];
        });

        dishes.forEach((dish : Dish) => {
          const categoryKey = dish.category.toLowerCase();
          if (categoriesOrder.includes(categoryKey)) {
            grouped[categoryKey].push(dish);
          }
        });

        setDishesByCategory(grouped);
      } catch (error) {
        setDishesByCategory({});
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 10 }}>Cargando platillos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categoriesOrder.map((category) => {
        const dishes = dishesByCategory[category];
        if (!dishes || dishes.length === 0) return null;

        return (
          <View key={category} style={{ width: "100%", marginBottom: 20 }}>
            <Text variant="titleLarge" style={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            <FlatList
              data={dishes}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/menu/${item.id}`)}
                >
                  <Card style={styles.card}>
                    <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
                    <Card.Content style={{ alignItems: "center" }}>
                      <Text style={styles.cardName}>{item.name}</Text>
                      <Text style={styles.cardPrice}>${item.price}.00</Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

export default function MenuScreen() {
  return (
    <PaperProvider>
      <MenuContent />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  categoryTitle: {
    marginBottom: 10,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  card: {
    borderRadius: 15,
    marginRight: 15,
    width: 150,
  },
  cardImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 120,
  },
  cardName: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: 4,
  },
});
