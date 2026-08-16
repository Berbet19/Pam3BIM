
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, Platform } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function CustomSearchBar({ value, onChangeText, placeholder }: TextInputProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Pesquisar..."}
        placeholderTextColor="#888"
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 6,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
    ...Platform.select({
      web: {
        // O truque dos colchetes faz o TypeScript aceitar a propriedade CSS sem reclamar
        ['outlineStyle' as any]: 'none',
      },
    }),
  },
});
