import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width * 0.92; // Ocupa a largura ideal parecida com o iFood

const imagesData = [
  { id: "1", url: "https://unsplash.com" },
  { id: "2", url: "https://unsplash.com" },
  { id: "3", url: "https://unsplash.com" },
];

export default function ImageSlider() {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Efeito para o autoplay automático igualzinho ao carrossel antigo
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1;
        scrollRef.current?.scrollTo({ x: nextIndex * BANNER_WIDTH, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Atualiza a bolinha ao arrastar o dedo manualmente
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / BANNER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrapper}>
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
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      {/* Paginação de bolinhas moderna e nativa */}
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
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
  },
  image: {
    width: BANNER_WIDTH,
    height: 150, // Altura perfeita para banners de topo de app
    borderRadius: 12,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: "red", // Bolinha ativa vermelha combinando com seu header
  },
  inactiveDot: {
    width: 6,
    backgroundColor: "gray",
  },
});
