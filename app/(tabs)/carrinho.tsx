import { products } from '@/data/product';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSearchBar from '@/components/searchBar';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

export default function Produtos() {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Meu Header Red</Text>
          <CustomSearchBar
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Buscar produtos..."
          />
        </View>
      </SafeAreaView>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listArea}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            {/* 1. Imagem do Produto */}
            {item.source && (
              <Image style={styles.imagens} source={item.source} />
            )}

            {/* 2. Informações do Produto (Centro) */}
            <View style={styles.infoContainer}>
              <Text style={styles.tituloProduto} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.preco}>R$ {item.price}</Text>
            </View>

            {/* 3. Controles Estáticos (Apenas Visual) */}
            <View style={styles.quantityContainer}>
              <View style={styles.quantityButton}>
                <Feather name="minus" size={16} color="#333" />
              </View>
              
              <Text style={styles.quantityText}>1</Text>
              
              <View style={styles.quantityButton}>
                <Feather name="plus" size={16} color="#333" />
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "grey",
  },
  headerSafeArea: {
    backgroundColor: "red",
  },
  headerContent: {
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  listArea: {
    flex: 1,
  },
  container: {
    backgroundColor: "grey",
    padding: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagens: {
    height: 90,
    width: 90,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 80,
    paddingVertical: 4,
  },
  tituloProduto: {
    color: "#222",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
  },
  preco: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 2,
    minWidth: 16,
    textAlign: 'center',
  },
});
