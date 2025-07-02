import * as React from 'react';
import { KeyboardAvoidingView, Linking, Platform, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput, useTheme } from 'react-native-paper';

export default function ContactScreen() {
  const theme = useTheme();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSend = () => {
    setSubmitting(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitting(false);
      alert('¡Mensaje enviado! Te responderemos pronto.');
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
            title="Contáctanos"
            left={props => (
              <Avatar.Icon {...props} icon="email" color={theme.colors.primary} style={{ backgroundColor: '#e3f2fd' }} />
            )}
          />
          <Card.Content>
            <Text style={styles.infoText}>
              ¿Tienes dudas, sugerencias o necesitas ayuda? Completa el formulario o escríbenos a:{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('mailto:contacto@copperbites.cl')}
              >
                contacto@copperbites.cl
              </Text>
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
              label="Mensaje"
              value={message}
              onChangeText={setMessage}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={4}
              left={<TextInput.Icon icon="message-text-outline" />}
            />
            <Button
              mode="contained"
              onPress={handleSend}
              loading={submitting}
              disabled={submitting || !name || !email || !message}
              style={styles.button}
              icon="send"
            >
              Enviar mensaje
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
  link: {
    color: '#1976D2',
    textDecorationLine: 'underline',
  },
  input: {
    marginVertical: 7,
    backgroundColor: '#f7fbff',
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 3,
  },
});