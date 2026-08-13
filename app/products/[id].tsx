import { products } from '@/data/product';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    return (
      <View>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
    </View>
  );
}