//-Path: "TeaChoco-Hospital/client/App.tsx"
import './global.css';
import Home from './src/pages/Home';
import Signin from './src/pages/Signin';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type RootStackParamList = {
    Home: undefined;
    Signin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Signin" component={Signin} />
                </Stack.Navigator>
                <StatusBar style="auto" />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
