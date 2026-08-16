import { products } from '@/data/product';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, Image, View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSearchBar from '@/components/searchBar';
import React, { useState, useRef, useEffect } from 'react';

const { width } = Dimensions.get("window");

const imagesData = [
  { id: "1", url: "https://unsplash.com" },
  { id: "2", url: "https://unsplash.com" },
  { id: "3", url: "https://unsplash.com" },
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
        scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setActiveIndex(index);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screenContainer}>
      {/* Header Vermelho com o componente conectado */}
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

      {/* Lista de Produtos em 2 colunas com o Banner no topo (ListHeaderComponent) */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listArea}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
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
                  <Image source={{ uri: item.url }} style={styles.bannerImage} />
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
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            {item.source && (
              <Image style={styles.imagens} source={item.source} />
            )}
            <Text style={styles.tituloProduto}>{item.name}</Text>
            <Text style={styles.preco}>R$ {item.price}</Text>
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
    padding: 12,
  },
  row: {
    justifyContent: 'space-between', 
    marginBottom: 12, 
  },
  bannerWrapper: {
    marginBottom: 14,
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
    height: 130,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  dot: {
    height: 5,
    borderRadius: 3,
  },
  activeDot: {
    width: 14,
    backgroundColor: "red",
  },
  inactiveDot: {
    width: 5,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    gap: 5,
    width: '48%', 
  },
  tituloProduto: {
    color: "red",
    fontWeight: "bold",
  },
  preco: {
    color: "green",
    fontWeight: "bold",
  },
  imagens: {
    height: 120,
    width: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
});
