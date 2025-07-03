import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, Button, Card, Provider as PaperProvider, Paragraph } from 'react-native-paper';

type Dish = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  aviable: boolean;
  ingredients: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  preparationTime?: string;
};

function DishDetailScreen() {
  const { id } = useLocalSearchParams();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    axios.get(`http://192.168.1.6:8080/api/dishes/${id}`)
      .then(response => {
        setDish(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (!dish) return;
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        alert('No se encontró el usuario. Por favor, inicia sesión.');
        return;
      }
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      alert('No se encontró el token de autenticación. Por favor, inicia sesión.');
      return;
    }
    await axios.post('http://192.168.1.6:8080/api/orders', {
        userId,
        totalPrice: Number(dish.price),
        dishes: [Number(dish.id)],
        quantity: 1,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    alert(`Platillo ${dish.name} agregado al carrito`);
    } catch (err) {
      alert(dish.id);
      alert('Error al agregar el platillo al carrito');
    }
  };
  if (loading) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 10 }}>Cargando...</Text>
      </ScrollView>
    );
  }

  if (error || !dish) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ padding: 20 }}>Platillo no encontrado</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: dish.image }} style={styles.image} />
        <Card.Title title={dish.name} subtitle={`$${dish.price}.00`} titleStyle={styles.title} subtitleStyle={styles.price} />
        <Card.Content>
          <Paragraph style={styles.description}>{dish.description}</Paragraph>
          <Paragraph style={styles.ingredients}>
            Ingredientes: {dish.ingredients || 'No disponibles'}
          </Paragraph>
          {dish.preparationTime && (
            <Paragraph style={styles.ingredients}>
              Preparation Time: {dish.preparationTime}
            </Paragraph>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleAddToCart} buttonColor="#e74c3c">
            Añadir al carrito
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

export default function WrappedDishDetailScreen() {
  return (
    <PaperProvider>
      <DishDetailScreen />
    </PaperProvider>
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
  card: {
    width: 300,
  },
  image: {
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#e74c3c',
  },
  description: {
    paddingVertical: 10,
    fontSize: 16,
  },
  ingredients: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
});