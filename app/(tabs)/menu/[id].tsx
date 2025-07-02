import { Button } from '@react-navigation/elements';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';


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
export default function DishDetailScreen() {
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

  if (loading) {
    return <Text style={{ padding: 20 }}>Cargando...</Text>;
  }

  if (error || !dish) {
    return <Text style={{ padding: 20 }}>Platillo no encontrado</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.price}>${dish.price}.00</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <Text style={styles.ingredients}>
      Ingredientes: {dish.ingredients || 'No disponibles'}
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
        Añadir al carrito
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