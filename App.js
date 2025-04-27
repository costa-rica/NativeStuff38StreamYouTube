import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens_core/Home";
import WelcomeScreen from "./screens/WelcomeScreen";
import StreamYouTube01 from "./screens/StreamYouTube01";
import ReviewVideo from "./screens/ReviewVideo";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="StreamYouTube01" component={StreamYouTube01} />
        <Stack.Screen name="ReviewVideo" component={ReviewVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
