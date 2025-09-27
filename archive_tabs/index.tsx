import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import BotSettingsScreen from '../BotSettingsScreen'; // <-- kluczowa poprawka
import BotStatusScreen from './BotStatusScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Status" component={BotStatusScreen} />
        <Tab.Screen name="Ustawienia" component={BotSettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
