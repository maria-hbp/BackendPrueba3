import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import type { RootStackParamList } from '../App'; // Ajusta path según tu estructura


export default function SignupScreen() {
  const theme = useTheme();

const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSignup = () => {
    if (!name || !email || !password || password !== confirmPassword) {
      alert('Completa todos los campos y asegúrate que las contraseñas coincidan.');
      return;
    }
    setSubmitting(true);
    // Aquí conectarías a tu backend
    setTimeout(() => {
      setSubmitting(false);
      alert('¡Registro exitoso!');
      navigation.navigate('login');
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Crear cuenta"
            left={props => (
              <Avatar.Icon {...props} icon="account-plus" color={theme.colors.primary} style={{ backgroundColor: '#e3f2fd' }} />
            )}
          />
          <Card.Content>
            <Text style={styles.infoText}>
              Ingresa tus datos para crear una cuenta en Copper Bites.
            </Text>
            <TextInput
              label="Nombre"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />
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
            <TextInput
              label="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="lock-outline" />}
              secureTextEntry
            />
            <Button
              mode="contained"
              onPress={handleSignup}
              loading={submitting}
              disabled={submitting}
              style={styles.button}
              icon="account-plus"
            >
              Crear cuenta
            </Button>
            <Button
              mode="text"
              style={{ marginTop: 12 }}
              onPress={() => navigation.navigate('login')}
            >
              ¿Ya tienes cuenta? Inicia sesión
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