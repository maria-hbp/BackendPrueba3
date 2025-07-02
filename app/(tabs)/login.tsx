import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

    const handleLogin = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        'http://192.168.1.6:8080/api/users/login',
        {
          email,
          password
        }
      );
      if (response.data.success) {
      const userData = response.data.data;
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      alert('¡Bienvenido a Copper Bites!');
      
    } else {
      alert(response.data.message || 'Error al iniciar sesión');
    }
  } catch (error: any) {
    if (error.response) {
      alert(error.response.data.message || 'Error al iniciar sesión');
    } else {
      alert('Error de red o servidor no disponible');
    }
  } finally {
    setSubmitting(false);
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Iniciar sesión"
            left={props => (
              <Avatar.Icon {...props} icon="lock" color={theme.colors.primary} style={{ backgroundColor: '#e3f2fd' }} />
            )}
          />
          <Card.Content>
            <Text style={styles.infoText}>
              Ingresa tus credenciales para acceder a Copper Bites.
            </Text>
            <TextInput
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="email-outline" />}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="lock-outline" />}
              secureTextEntry
            />
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={submitting}
              disabled={submitting || !email || !password}
              style={styles.button}
              icon="login"
            >
              Ingresar
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 18,
    paddingVertical: 10,
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
    marginTop: 2,
  },
  input: {
    marginVertical: 7,
    backgroundColor: '#f7fbff',
  },
  button: {
    marginTop: 14,
    borderRadius: 8,
    paddingVertical: 3,
  },
});