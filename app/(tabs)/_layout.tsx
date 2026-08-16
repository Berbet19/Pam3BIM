import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        headerShown: false, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <Feather name="menu" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}
