import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Platform } from 'react-native';

const COLORS = {
  primary: "#E63946",
  textMuted: "#B0AAA4",
  card: "#FFFFFF",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: -2,
        },
        tabBarItemStyle: {
          paddingTop: 6,
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          backgroundColor: COLORS.card,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTopWidth: 0,
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="menu" size={26} color={color} style={{ opacity: focused ? 1 : 0.8 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="shopping-cart" size={26} color={color} style={{ opacity: focused ? 1 : 0.8 }} />
          ),
        }}
      />
    </Tabs>
  );
}