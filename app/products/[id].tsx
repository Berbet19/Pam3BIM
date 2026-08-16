import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '@/data/product';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();


  const produto = products.find((item) => item.id.toString() === id);


  if (!produto) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Produto não encontrado!</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
    
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <Feather name="arrow-left" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes do Produto</Text>
          <View style={{ width: 24 }} /> 
        </View>
      </SafeAreaView>

    
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {produto.source && (
          <Image source={produto.source} style={styles.imagemProduto} />
        )}

        <View style={styles.infoCard}>
          <Text style={styles.nomeProduto}>{produto.name}</Text>
          <Text style={styles.precoProduto}>R$ {produto.price}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.descricaoTitulo}>Descrição</Text>
          <Text style={styles.descricaoTexto}>
           
            {(produto as any).description || "Produto de alta qualidade selecionado especialmente para você. Aproveite as condições especiais de entrega e garantia."}
          </Text>
        </View>
      </ScrollView>

     
      <View style={styles.footerContainer}>
        <Pressable style={styles.buyButton} onPress={() => alert('Produto adicionado ao carrinho!')}>
          <Feather name="shopping-bag" size={20} color="white" />
          <Text style={styles.buyButtonText}>Adicionar ao Carrinho</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerSafeArea: {
    backgroundColor: 'red',
  },
  headerContent: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90, // Espaço para não cobrir o botão do rodapé
  },
  imagemProduto: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  nomeProduto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  precoProduto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  descricaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  descricaoTexto: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buyButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  backButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
