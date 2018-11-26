import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Content, Text,  View, Button } from "native-base";
import Modal from "react-native-modal";

export default class ModalConfirmacao extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Modal
        isVisible={this.props.visibility}
      >
        <View>
          <Text>{this.props.children}</Text>
          <Button onPress={this.props.dismiss}>
            <Text>Não</Text>
          </Button>
          <Button onPress={this.props.confirm}>
            <Text>Sim</Text>
          </Button>
        </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  modalContent: {
    height:180,
    backgroundColor:'#fff',
    padding:16,
    borderRadius: 5,
  },
})