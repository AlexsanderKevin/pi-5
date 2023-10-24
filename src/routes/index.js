import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../pages/Login';
import Home from '../pages/Home';
import EquipmentForm from '../pages/EquipmentForm';
import Details from "../pages/Details";
import QrCode from "../pages/QrCode";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
            <Stack.Screen name="EquipmentForm" component={EquipmentForm} options={{title: 'Adicionar'}} />
            <Stack.Screen name="Equipamento" component={Details} options={{title: 'Adicionar'}} />
            <Stack.Screen name="QrCode" component={QrCode} options={{title: 'QR Code'}} />
        </Stack.Navigator>
    )
}