import { Button } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

const dishes = {
  '1': {
    name: 'Double Angus & Bacon',
    price: 15,
    image: require('@/assets/images/baconcheeseburger.webp'),
    description: 'A double Angus patty with crispy bacon and cheddar cheese.',
    category: 'main course',
    ingredients: ['Angus beef', 'bacon', 'cheddar cheese', 'lettuce', 'tomato', 'onion', 'burger bun'],
    preparationTime: '25 minutes',
  },
  '2': {
    name: 'Spicy Angus Burger',
    price: 13,
    image: require('@/assets/images/spicyburger.webp'),
    description: 'Juicy Angus beef with spicy jalapeños and chipotle mayo.',
    category: 'main course',
    ingredients: ['Angus beef', 'jalapeños', 'chipotle mayo', 'lettuce', 'tomato', 'onion', 'burger bun'],
    preparationTime: '20 minutes',
  },
  '3': {
    name: 'Smokey BBQ Angus',
    price: 19,
    image: require('@/assets/images/smokedburger.jpg'),
    description: 'Smoked BBQ sauce, grilled onions, and Angus beef patty.',
    category: 'main course',
    ingredients: ['Angus beef', 'BBQ sauce', 'grilled onions', 'cheddar cheese', 'pickles', 'burger bun'],
    preparationTime: '30 minutes',
  },
  '4': {
    name: 'Coca Cola',
    price: 3,
    image: require('@/assets/images/cocacola.webp'),
    description: 'Refreshing and classic Coca-Cola to accompany your meal.',
    category: 'drink',
    ingredients: ['carbonated water', 'sugar', 'caramel color', 'caffeine'],
  },
  '5': {
    name: 'Sprite',
    price: 3,
    image: require('@/assets/images/sprite.jpg'),
    description: 'Lemon-lime sparkling flavor, light and refreshing.',
    category: 'drink',
    ingredients: ['carbonated water', 'sugar', 'natural flavors'],
  },
  '6': {
    name: 'Fanta',
    price: 3,
    image: require('@/assets/images/fanta.jpg'),
    description: 'Fun and flavorful orange Fanta.',
    category: 'drink',
    ingredients: ['carbonated water', 'sugar', 'orange flavor'],
  },
  '7': {
    name: 'Chocolate Cake',
    price: 5,
    image: require('@/assets/images/chocolatecake.jpg'),
    description: 'Rich and moist chocolate cake with creamy frosting.',
    category: 'dessert',
    ingredients: ['flour', 'cocoa powder', 'sugar', 'eggs', 'butter', 'milk'],
  },
};

export default function DishDetailScreen() {
  const { id } = useLocalSearchParams();
  const dish = dishes[id as string];

  if (!dish) {
    return <Text style={{ padding: 20 }}>Platillo no encontrado</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={dish.image} style={styles.image} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.price}>${dish.price}.00</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <Text style={styles.ingredients}>
        Ingredients: {dish.ingredients ? dish.ingredients.join(', ') : 'No disponibles'}
      </Text>
      {dish.preparationTime && (
        <Text style={styles.ingredients}>
          Preparation Time: {dish.preparationTime}
        </Text>
      )}
      <Button
        onPress={() => alert('Platillo agregado al carrito')}
        color="#e74c3c"
      >
        Add to Cart
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#e74c3c',
    marginVertical: 10,
  },
  description: {
    padding: 10,
    fontSize: 16
  },
  ingredients: {
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
    fontStyle: 'italic',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
  },
});