import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import ContactScreen from './(tabs)/contact';
import HomeScreen from './(tabs)/index';
import LoginScreen from './(tabs)/login';
import MenuScreen from './(tabs)/menu';
import SignupScreen from './signup';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  index: undefined;
  login: undefined;
  menu: undefined;
  contact: undefined;
  signup: undefined;
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="index" component={HomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="menu" component={MenuScreen} />
        <Stack.Screen name="contact" component={ContactScreen} />
        <Stack.Screen name="signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
