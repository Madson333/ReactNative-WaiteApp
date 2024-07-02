import { Modal, Platform, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { ModalBody, Header, Overlay, Form, Input } from "./styles";
import { Close } from "../Icons/Close";
import { Button } from "../Button";
import { useState } from "react";

interface TableModalPops{
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}
export function TableModal({ visible, onClose, onSave}: TableModalPops){
  const [table, setTable] = useState("")
  const isAndroid = Platform.OS === "android"

  function handleSave(){
    setTable("")
    onSave(table)
    onClose()
  }

  return(
   <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <Overlay behavior={isAndroid ?  "height" : "padding"} >
        <ModalBody>
          <Header>
            <Text weight="600" >Informe a mesa</Text>

            <TouchableOpacity onPress={onClose} >
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Número da mesa"
              placeholaderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Button onPress={handleSave} disabled={table.length === 0} >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
   </Modal>
  )
}
