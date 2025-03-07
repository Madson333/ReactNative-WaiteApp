import { FlatList, Modal } from "react-native";
import { Text } from "../Text";
import { Product } from "../../types/product";
import { CloseButton, ModalBody, Image, Header, IngredientsContainer, Ingredient, FooterContainer, Footer, PriceContainer } from "./styles";
import { Close } from "../Icons/Close";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Button } from "../Button";

interface ProductModalProps{
  visible: boolean
  onClose: () => void;
  product: Product | null
  onAddToCart: (product: Product) => void;
}
export function ProductModal({visible, onClose, product, onAddToCart}: ProductModalProps){

  if(!product){
    return null;
  }

  function handleAddToCart(){
    onAddToCart(product!)
    onClose()
  }

  return(
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://localhost:3001/uploads/${product?.imagePath}`
        }}
      >
        <CloseButton onPress={onClose} >
          <Close />
        </CloseButton>
      </Image>
      <ModalBody>
        <Header>
          <Text weight="600" size={24} >{product?.name}</Text>
          <Text color="#666" style={{marginTop: 8}}>
            {product?.description}
          </Text>
        </Header>
       {product.ingredients.length > 0 && (
         <IngredientsContainer>
         <Text color="#666" weight="600" >Ingredientes</Text>
         <FlatList
           data={product.ingredients}
           style={{marginTop: 16}}
           keyExtractor={ingredient => ingredient._id}
           showsVerticalScrollIndicator={false}
           renderItem={({item: ingredient}) => (
             <Ingredient>
               <Text>{ingredient.icon}</Text>
               <Text size={14} color="#666">{ingredient.name}</Text>
             </Ingredient>
           )}
         />

       </IngredientsContainer>
       )}
      </ModalBody>
      <Footer>
              <FooterContainer>
                  <PriceContainer>
                   <Text color='#666' >Preço</Text>
                   <Text size={20} weight='600'>{formatCurrency(product.price)}</Text>
                 </PriceContainer>

                 <Button onPress={() => handleAddToCart()} >Adicionar ao pedido</Button>
              </FooterContainer>
      </Footer>
    </Modal>
  )
}
