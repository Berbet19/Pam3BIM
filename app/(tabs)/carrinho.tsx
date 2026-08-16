import { products } from '@/data/product';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSearchBar from '@/components/searchBar';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

const COLORS = {
  primary: "#E63946",
  primaryDark: "#B5222C",
  accent: "#FF8C42",
  bg: "#F6F3EF",
  card: "#FFFFFF",
  textDark: "#2B2B2B",
  textMuted: "#8A8A8A",
};

export default function Produtos() {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🛒 Meu Carrinho</Text>
          <Text style={styles.headerSubtitle}>Revise seus itens antes de finalizar</Text>
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
        ListHeaderComponent={
          filteredProducts.length > 0 ? (
            <Text style={styles.sectionTitle}>Itens selecionados</Text>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="shopping-bag" size={40} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            {/* 1. Imagem do Produto */}
            {item.source && (
              <View style={styles.imageWrapper}>
                <Image style={styles.imagens} source={item.source} />
              </View>
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
              <Pressable style={styles.quantityButton}>
                <Feather name="minus" size={16} color={COLORS.primary} />
              </Pressable>

              <Text style={styles.quantityText}>1</Text>

              <Pressable style={[styles.quantityButton, styles.quantityButtonAdd]}>
                <Feather name="plus" size={16} color="white" />
              </Pressable>
            </View>
          </Pressable>
        )}
      />

      {/* Rodapé fixo com o total, mesmo padrão visual da tela de detalhe */}
      {filteredProducts.length > 0 && (
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.footerLabel}>Total estimado</Text>
            <Text style={styles.footerValue}>
              R$ {filteredProducts.reduce((acc, p) => acc + Number(p.price), 0).toFixed(2)}
            </Text>
          </View>
          <Pressable style={styles.checkoutButton} onPress={() => alert('Ir para pagamento!')}>
            <Text style={styles.checkoutButtonText}>Finalizar pedido</Text>
            <Feather name="arrow-right" size={18} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  headerSafeArea: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 2,
  },
  headerContent: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: -4,
  },
  listArea: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.bg,
    padding: 16,
    paddingBottom: 110, // espaço pro footer fixo
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagens: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 80,
    paddingVertical: 4,
  },
  tituloProduto: {
    color: COLORS.textDark,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 20,
  },
  preco: {
    color: COLORS.accent,
    fontWeight: "800",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 6,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  quantityButtonAdd: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    minWidth: 16,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    gap: 10,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  footerLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  footerValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 46,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});