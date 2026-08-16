import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '@/data/product';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';

const COLORS = {
  primary: "#E63946",
  primaryDark: "#B5222C",
  accent: "#FF8C42",
  bg: "#F6F3EF",
  card: "#FFFFFF",
  textDark: "#2B2B2B",
  textMuted: "#8A8A8A",
};

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();

  const produto = products.find((item) => item.id.toString() === id);

  if (!produto) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Feather name="alert-circle" size={40} color={COLORS.primary} />
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
            <Feather name="arrow-left" size={22} color="white" />
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes do Produto</Text>
          <View style={styles.iconButton}>
            <Feather name="heart" size={22} color="white" />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {produto.source && (
          <View style={styles.imageWrapper}>
            <Image source={produto.source} style={styles.imagemProduto} />
          </View>
        )}

        <View style={styles.infoCard}>
          <View style={styles.tituloRow}>
            <Text style={styles.nomeProduto}>{produto.name}</Text>
            <View style={styles.badge}>
              <Feather name="star" size={12} color="white" />
              <Text style={styles.badgeText}>4.8</Text>
            </View>
          </View>

          <Text style={styles.precoProduto}>R$ {produto.price}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Feather name="clock" size={16} color={COLORS.primary} />
              <Text style={styles.infoItemText}>25-35 min</Text>
            </View>
            <View style={styles.infoItem}>
              <Feather name="truck" size={16} color={COLORS.primary} />
              <Text style={styles.infoItemText}>Entrega grátis</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.descricaoTitulo}>Descrição</Text>
          <Text style={styles.descricaoTexto}>
            {(produto as any).description ||
              "Produto de alta qualidade selecionado especialmente para você. Aproveite as condições especiais de entrega e garantia."}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.footerPriceBox}>
          <Text style={styles.footerLabel}>Preço</Text>
          <Text style={styles.footerValue}>R$ {produto.price}</Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: '800',
  },
  iconButton: {
    padding: 4,
    width: 30,
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // espaço pro botão do rodapé
  },
  imageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imagemProduto: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tituloRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  nomeProduto: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  precoProduto: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EDE8',
    marginVertical: 6,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoItemText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  descricaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  descricaoTexto: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 21,
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
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  footerPriceBox: {
    justifyContent: 'center',
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
  buyButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORS.bg,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});