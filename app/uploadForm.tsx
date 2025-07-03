import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { ActivityIndicator, Button, Card, Provider as PaperProvider, TextInput } from 'react-native-paper';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnevu2z9i/image/upload';
const CLOUDINARY_PRESET = 'prueba3';

export default function CreateDishScreen() {
  const [fields, setFields] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    ingredients: '',
    image: '',
  });
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      setLocalImage(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (uri: string) => {
    setUploading(true);
    const data = new FormData();
    data.append('file', {
      uri,
      name: 'dish.jpg',
      type: 'image/jpeg',
    } as any);
    data.append('upload_preset', CLOUDINARY_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploading(false);
      return res.data.secure_url;
    } catch (e) {
      setUploading(false);
      alert('Error subiendo la imagen');
      throw e;
    }
  };

  const handleSubmit = async () => {
    if (
      !fields.name ||
      !fields.description ||
      !fields.price ||
      !fields.category ||
      !fields.ingredients ||
      !localImage
    ) {
      alert('Completa todos los campos y selecciona una imagen.');
      return;
    }
    try {
      setUploading(true);
      const imageUrl = await uploadToCloudinary(localImage);
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        
        'http://192.168.1.6:8080/api/dishes',
        {
          ...fields,
          price: parseFloat(fields.price),
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Platillo creado con éxito');
      // Limpiar formulario y estado de imagen local
      setFields({
        name: '',
        description: '',
        price: '',
        category: '',
        ingredients: '',
        image: '',
      });
      setLocalImage(null);
    } catch (err) {
      alert('Error al crear platillo');
      console.log('fields', fields);
      // If you want to log the token, retrieve it here
      AsyncStorage.getItem('userToken').then(token => {
        console.log('token', token);
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <PaperProvider>
      <Card style={{ margin: 20, padding: 20 }}>
        <TextInput
          label="Nombre"
          value={fields.name}
          onChangeText={v => setFields(f => ({ ...f, name: v }))}
          style={{ marginBottom: 10 }}
          mode="outlined"
          disabled={uploading}
        />
        <TextInput
          label="Descripción"
          value={fields.description}
          onChangeText={v => setFields(f => ({ ...f, description: v }))}
          multiline
          style={{ marginBottom: 10 }}
          mode="outlined"
          disabled={uploading}
        />
        <TextInput
          label="Precio"
          value={fields.price}
          keyboardType="numeric"
          onChangeText={v => setFields(f => ({ ...f, price: v }))}
          style={{ marginBottom: 10 }}
          mode="outlined"
          disabled={uploading}
        />
        <TextInput
          label="Categoría (entree, main course, dessert, beverage, snack)"
          value={fields.category}
          onChangeText={v => setFields(f => ({ ...f, category: v }))}
          style={{ marginBottom: 10 }}
          mode="outlined"
          disabled={uploading}
        />
        <TextInput
          label="Ingredientes"
          value={fields.ingredients}
          onChangeText={v => setFields(f => ({ ...f, ingredients: v }))}
          multiline
          style={{ marginBottom: 10 }}
          mode="outlined"
          disabled={uploading}
        />
        <Button
          mode="contained"
          onPress={pickImage}
          disabled={uploading}
          style={{ marginBottom: 10 }}
        >
          Seleccionar Imagen
        </Button>
        {localImage && (
          <Image
            source={{ uri: localImage }}
            style={{ width: 200, height: 120, marginVertical: 10, alignSelf: 'center' }}
          />
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={uploading}
          loading={uploading}
        >
          {uploading ? 'Subiendo...' : 'Crear Platillo'}
        </Button>
        {uploading && <ActivityIndicator animating={true} size="large" style={{ marginTop: 10 }} />}
      </Card>
    </PaperProvider>
  );
}