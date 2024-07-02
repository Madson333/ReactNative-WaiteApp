import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";
import { Container, OrderHeader, Content, Table } from "./styles";

interface HeaderProps{
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({selectedTable,  onCancelOrder}: HeaderProps){
  return (
    <Container>
      {selectedTable ?(
        <>
          <Content>
            <OrderHeader>
                <Text size={24} weight="600" >PEDIDO</Text>
                <TouchableOpacity >
                  <Text
                    size={14}
                    weight="600"
                    color="#D73035"
                    onPress={onCancelOrder}
                  >
                    cancelar pedido
                  </Text>
                </TouchableOpacity>
              </OrderHeader>
              <Table>
                <Text
                  color="#666">
                    Mesa {selectedTable}
                </Text>
              </Table>
          </Content>
        </>
      ):(
        <>
            <Text size={14} opacity={0.9} >Bem vindo(a) ao</Text>
            <Text size={24} weight="700" >WAITE<Text size={24} >APP</Text></Text>
        </>
      )}
    </Container>
  )
}
