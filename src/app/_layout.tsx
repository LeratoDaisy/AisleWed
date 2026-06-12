import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { WeddingProvider } from '../context/WeddingContext';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <WeddingProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#F8F5F0',
            borderTopColor: '#EAE2D6',
          },
          tabBarActiveTintColor: '#2F2F2F',
          tabBarInactiveTintColor: '#7A7A7A',
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="budget" options={{ title: 'Budget' }} />
        <Tabs.Screen name="guests" options={{ title: 'Guests' }} />
        <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
        <Tabs.Screen name="vendors" options={{ title: 'Vendors' }} />
      </Tabs>
    </WeddingProvider>
  );
}