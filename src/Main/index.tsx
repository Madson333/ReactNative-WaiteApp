import { useState } from "react";
import { Button } from "../components/Button";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { TableModal } from "../components/tableModal";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";
import { Cart } from "../components/cart";
import { CartItem } from "../types/cartItem";
import { Product } from "../types/product";


export function Main(){
  const [isTableModalVisible, setIsTableModalVisivle] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function handleSaveTable(table: string){
    setSelectedTable(table)
  }

  function handleCancelOrder(){
    setSelectedTable('')
    setCartItems([])
  }

  function handleAddToCart(product: Product){
    if(!selectedTable){
      setIsTableModalVisivle(true)
    }


    setCartItems((state) => {
      const itemIndex = state.findIndex(item => item.product._id === product._id)

      if(itemIndex < 0){
        return [...state, {product, quantity: 1}]
      }

      const newCartItems = [...state]
      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity + 1
      }

      return newCartItems


    })
  }

  function handleConfirmOrder(){
    setSelectedTable('')
    setCartItems([])
  }

  function handleDecrementCartItem(product: Product){
    setCartItems((state) => {
      const itemIndex = state.findIndex(item => item.product._id === product._id)

      const item = state[itemIndex]

      if(item.quantity === 1){
        const newCartItems = [...state]
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      const newCartItems = [...state]
      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity - 1
      }

      return newCartItems

    })
  }

  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
          />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </MenuContainer>

      </Container>
      <Footer>
        <FooterContainer>
         {!selectedTable && (
           <Button onPress={() => setIsTableModalVisivle(true)}>
              NOVO PEPIDO
           </Button>
         )}

         {selectedTable && (
           <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleConfirmOrder}
            />
         )}

        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisivle(false)}
        onSave={handleSaveTable}
      />
    </>
  )
}
