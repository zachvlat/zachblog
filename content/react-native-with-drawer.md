---
title: "React Native with drawer"
date: "2025-06-19"
slug: "react-native-with-drawer"
---

```bash
#!/bin/bash

set -e  # Exit immediately on error

APP_NAME="MyExpressiveAppDrawer"

echo "🚀 Creating Expo app: $APP_NAME"
npx create-expo-app "$APP_NAME" --template blank || {
  echo "❌ Failed to create Expo app. Check your network and try again."
  exit 1
}

cd "$APP_NAME" || exit

echo "📦 Installing dependencies..."
if ! npx expo install \
  react-native-paper \
  react-native-vector-icons \
  react-native-safe-area-context \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-screens \
  @react-navigation/native \
  @react-navigation/native-stack \
  @react-navigation/drawer \
  @expo-google-fonts/roboto \
  expo-font \
  react-dom \
  react-native-web \
  @expo/metro-runtime; then

  echo "⚠️ 'expo install' failed, trying 'npm install' instead..."
  npm install \
    react-native-paper \
    react-native-vector-icons \
    react-native-safe-area-context \
    react-native-gesture-handler \
    react-native-reanimated \
    react-native-screens \
    @react-navigation/native \
    @react-navigation/native-stack \
    @react-navigation/drawer \
    @expo-google-fonts/roboto \
    expo-font \
    react-dom \
    react-native-web \
    @expo/metro-runtime
fi

echo "⚙️ Adding Reanimated Babel plugin..."
cat <<EOL > babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
EOL

echo "📁 Creating folder structure..."
mkdir screens
touch screens/HomeScreen.js screens/DetailScreen.js theme.js

echo "📄 Creating theme.js (Material 3 Expressive colors)..."
cat <<EOL > theme.js
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const expressiveTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6750A4',
    secondary: '#625B71',
    tertiary: '#7D5260',
    surface: '#FFFBFE',
    background: '#F4EFF4',
    elevation: {
      level1: '#EADDFF',
    },
  },
  roundness: 24,
};
EOL

echo "📄 Setting up App.js with Drawer Navigation + theme..."
cat <<EOL > App.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { expressiveTheme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider theme={expressiveTheme}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: expressiveTheme.colors.primary },
            headerTintColor: '#fff',
            drawerActiveTintColor: expressiveTheme.colors.primary,
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Details" component={DetailScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
EOL

echo "📄 Creating HomeScreen.js..."
cat <<EOL > screens/HomeScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Button,
  Card,
  Dialog,
  Portal,
  useTheme,
} from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>
        Material 3 Expressive
      </Text>

      <Card style={[styles.card, { backgroundColor: colors.elevation.level1 }]}>
        <Card.Title title="Expressive Card" />
        <Card.Content>
          <Text>This card uses elevated surfaces and rounded corners.</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        buttonColor={colors.primary}
        style={styles.button}
        onPress={() => setVisible(true)}
      >
        Show Dialog
      </Button>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('Details')}
      >
        Go to Details
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Expressive Dialog</Dialog.Title>
          <Dialog.Content>
            <Text>This is a colorful, expressive dialog.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
    borderRadius: 24,
  },
  button: {
    marginVertical: 8,
    borderRadius: 24,
  },
});
EOL

echo "📄 Creating DetailScreen.js..."
cat <<EOL > screens/DetailScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
EOL

echo "📄 Creating .gitignore..."
cat <<EOL > .gitignore
node_modules
.expo
dist
npm-debug.log*
.expo-shared
.DS_Store
.env
EOL

echo "🧹 Checking for deprecated npm configs..."
if grep -qE 'globalignorefile|python' ~/.npmrc 2>/dev/null; then
  echo "⚠️ Warning: Your ~/.npmrc contains deprecated settings (globalignorefile or python). Consider removing them."
fi

echo "✅ All set! Run your app with: cd $APP_NAME && npx expo start"

read -p "👉 Do you want to start Expo now? (y/n): " startExpo
if [[ $startExpo == "y" ]]; then
  npx expo start
fi
