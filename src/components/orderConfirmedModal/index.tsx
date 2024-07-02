import { Modal } from "react-native";
import { Container, OkButton } from "./styles";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";

interface OrderConfirmedModal{
  visible: boolean;
  onOk: () => void;
  onConfirmOrder: () => void;
}

export function OrderConfirmedModal({visible, onOk, onConfirmOrder}: OrderConfirmedModal){

  function handleConfirmOrder(){
    onOk()
    onConfirmOrder()
  }


  return(
    <Modal
      visible={visible}
      animationType="fade"
    >
      <Container>
        <CheckCircle />
        <Text
          color="#fff"
          weight="600"size={20}
          style={{
            marginTop: 12,
            marginBottom: 4
          }}
          >
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} >
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onConfirmOrder}>
          <Text color="#D73035" weight="600">OK</Text>
        </OkButton>
      </Container>
    </Modal>
  )
}
