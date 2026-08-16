import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width * 0.92;

const imagesData = [
  {
    id: "1",
    source: require("@/assets/images/burguer.jpg"),
  },
  {
    id: "2",
    source: require("@/assets/images/pizza.jpg"),
  },
  {
    id: "3",
    source: require("@/assets/images/lasanha.jpg"),
  },
];

export default function ImageSlider() {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex =
          prevIndex === imagesData.length - 1 ? 0 : prevIndex + 1;

        scrollRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });

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

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {imagesData.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image source={item.source} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {imagesData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index
                ? styles.activeDot
                : styles.inactiveDot,
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
    alignItems: "center",
  },

  slide: {
    width: width,
    alignItems: "center",
  },

  image: {
    width: BANNER_WIDTH,
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
  },

  paginationContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  dot: {
    height: 6,
    borderRadius: 3,
  },

  activeDot: {
    width: 18,
    backgroundColor: "red",
  },

  inactiveDot: {
    width: 6,
    backgroundColor: "gray",
  },
});