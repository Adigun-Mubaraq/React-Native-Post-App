import "core-js/full/symbol/async-iterator";
import Amplify from '@aws-amplify/core';
import awsConfig from './src/aws-exports';
Amplify.configure(awsConfig);


import { ThemeProvider } from "react-native-magnus";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from './src/Screens/HomeScreen';
import CreatePostScreen from "./src/Screens/CreatePostScreen";
import ManagePostScreen from "./src/Screens/ManagePostScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Add Post" component={CreatePostScreen} />
          <Stack.Screen name="Manage Posts" component={ManagePostScreen} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
