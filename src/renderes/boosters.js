import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import AwesomeButton from "react-native-really-awesome-button"

export default class Boosters extends Component {

  render() {
    return(
      <View style={styles.container}>
        <AwesomeButton
          type="secondary"
          textSize={10}
          borderRadius={10}
          textFontFamily="coiny-regular"
          height={40}
          backgroundColor="red"
          backgroundDarker="#B60017"
          >
            Mostrar Uma Letra
        </AwesomeButton>
        <AwesomeButton
          textSize={10}
          borderRadius={10}
          textFontFamily="coiny-regular"
          height={40}
          backgroundColor="purple"
          backgroundDarker="#4B0082"
          >
            Remover Letras
        </AwesomeButton>
        <AwesomeButton
          textSize={10}
          borderRadius={10}
          textFontFamily="coiny-regular"
          height={40}
          backgroundColor="#5e72d1"
          backgroundDarker="#4b88a7"
          >
            Solucionar
        </AwesomeButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  }
})