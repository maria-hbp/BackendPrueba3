import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput, useTheme } from 'react-native-paper';

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleLogin = () => {
    setSubmitting(true);
    // Aquí deberías conectar a tu backend de autenticación
    setTimeout(() => {
      setSubmitting(false);
      alert('¡Bienvenido a Copper Bites!');
      // Aquí podrías navegar a la home o a otra pantalla
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