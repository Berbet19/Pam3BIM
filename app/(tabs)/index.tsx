import { products } from '@/data/product';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, Image, StyleSheet } from 'react-native';

export default function Produtos() {
  return (
    <ScrollView>
      {products.map((product) => (
        <Pressable
          key={product.id}
          onPress={() => router.push(`/products/${product.id}`)}
        >
          <Image></Image>
          <Text style={styles.tituloProduto}>{product.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

 const styles = StyleSheet.create({
    tituloProduto: {
      color: "red",

    },
  })