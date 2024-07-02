import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { Text } from "../Text";
import {
    ProductContainer,
    ProductImage,
    ProductDetails,
    Separator,
    AddToCartButton
  } from "./styles";
import { formatCurrency } from "../../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { useState } from "react";
import { Product } from "../../types/product";

interface MenuProps{
  onAddToCart: (product: Product) => void;
}

export function Menu({onAddToCart}: MenuProps){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product){
    setIsModalVisible(true)
    setSelectedProduct(product)
  }

  return(
  <>
      <FlatList
      data={products}
      style={{marginTop: 32}}
      contentContainerStyle={{paddingHorizontal: 24}}
      ItemSeparatorComponent={Separator}
      keyExtractor={products => products._id}
      renderItem={({item: product}) => (
        <ProductContainer onPress={() => handleOpenModal(product)}>
          <ProductImage
            source={{
              uri: `http://localhost:3001/uploads/${product.imagePath}`
            }}
          />
          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text
              size={14}
              color="#666"
              style={{marginVertical: 8}}
            >
              {product.description}
            </Text>
            <Text size={14} weight="600" >{formatCurrency(product.price)}</Text>
          </ProductDetails>

          <AddToCartButton onPress={() => onAddToCart(product)} >
            <PlusCircle />
          </AddToCartButton>

        </ProductContainer>
      )}
    />

    <ProductModal
      onAddToCart={onAddToCart}
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      product={selectedProduct}
    />
  </>
  )
}
