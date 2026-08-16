import { products } from '@/data/product';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, Image, View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSearchBar from '@/components/searchBar';
import React, { useState, useRef, useEffect } from 'react';

const { width } = Dimensions.get("window");

const imagesData = [
  { id: "1", source: require("@/assets/images/burguer.jpg") },
  { id: "2", source: require("@/assets/images/pizza.jpg") },
  { id: "3", source: require("@/assets/images/lasanha.jpg") },
];

export default function Produtos() {
  const [search, setSearch] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay para o banner de fotos do topo
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1;
        scrollRef.current?.scrollTo({ x: nextIndex * (width - 24), animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (width - 24));
    setActiveIndex(index);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screenContainer}>
      {/* Header maior, com título, busca e banner tudo dentro */}
      <SafeAreaView style={styles.headerSafeArea} edges={['top']}>
        <View style={styles.headerContent}>
          <View style={styles.headerTopRow}>
            <Text style={styles.headerTitle}>🍔 DeliveryApp</Text>
            <Text style={styles.headerSubtitle}>Peça já o seu prato favorito!</Text>
          </View>

          <CustomSearchBar
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Buscar produtos..."
          />

          {/* Banner agora vive dentro do header */}
          <View style={styles.bannerWrapper}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              contentContainerStyle={styles.scrollContainer}
            >
              {imagesData.map((item) => (
                <View key={item.id} style={styles.slide}>
                  <Image source={item.source} style={styles.bannerImage} />
                  <View style={styles.bannerOverlay} />
                </View>
              ))}
            </ScrollView>

            <View style={styles.paginationContainer}>
              {imagesData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeIndex === index ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Lista de Produtos em 2 colunas */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listArea}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Mais pedidos</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            {item.source && (
              <View style={styles.imageWrapper}>
                <Image style={styles.imagens} source={item.source} />
              </View>
            )}
            <Text style={styles.tituloProduto} numberOfLines={1}>{item.name}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.preco}>R$ {item.price}</Text>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const COLORS = {
  primary: "#E63946",     // vermelho principal
  primaryDark: "#B5222C",
  accent: "#FF8C42",      // laranja de destaque (preço/CTA)
  bg: "#F6F3EF",          // fundo levemente quente
  card: "#FFFFFF",
  textDark: "#2B2B2B",
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  headerSafeArea: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    // sombra pra destacar o header do resto da tela
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
    paddingBottom: 18,
    paddingTop: 8,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTopRow: {
    marginBottom: 12,
    alignItems: 'center',
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
    marginTop: 2,
    textAlign: 'center',
  },
  listArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingTop: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textDark,
    marginVertical: 14,
  },
  bannerWrapper: {
    marginTop: 14,
    alignItems: 'center',
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  slide: {
    width: width - 24,
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  dot: {
    height: 5,
    borderRadius: 3,
  },
  activeDot: {
    width: 16,
    backgroundColor: "white",
  },
  inactiveDot: {
    width: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 10,
    gap: 6,
    width: '48%',
    shadowColor: "#000",
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
    height: 110,
    width: '100%',
    resizeMode: 'cover',
  },
  tituloProduto: {
    color: COLORS.textDark,
    fontWeight: "700",
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  preco: {
    color: COLORS.accent,
    fontWeight: "800",
    fontSize: 15,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
    marginTop: -2,
  },
});