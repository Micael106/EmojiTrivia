import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native'
import { SectionGrid } from 'react-native-super-grid'
import LinearGradient from 'react-native-linear-gradient'

export default class Resposta extends Component {

  state = {disabled: false}

  renderText(letra) {
    if (letra.key == "?")
      return (
        <Text style={{color: "black", fontSize: 20}}>
        </Text>)
    return (
      <TouchableOpacity onPress={() => this.props.onPress(letra)} disabled={this.state.disabled}>
        <LinearGradient colors={["yellow", 'orange']} style={[styles.itemContainerGradient]}>
          <Text style={styles.itemName}>{letra.key}</Text>
        </LinearGradient>
      </TouchableOpacity>)
  }

  componentDidUpdate() {
    const playerResposta = this.props.respostaArray.map(letra => letra.key).join("")
    if (playerResposta == this.props.rightResposta) {
      // 0 - Desabilitar a iteração com onPress
      if (!this.state.disabled)
        this.setState({disabled: true})
    } else if (this.props.respostaArray.filter(letra => letra.key == "?").length == 0) {
      // 0 - Tornar vermelha o backgroundColor das letras da Resposta em uma animação de 1s
    }
  }

  render() {
    // const respostaArray = this.props.respostaArray.join("").split(" ").map((item) => item.split(""))
    var respostaArray = [[]]
    this.props.respostaArray.forEach((item) => {
      item.key == " " ? respostaArray.push([]) : respostaArray[respostaArray.length-1].push(item)
    })
    return (
      <View>
      {respostaArray.map((letras,i) =>
        <View key={i} style={styles.row}>
          {letras.map((letra, j) => {
            return(
              <View key={j} style={styles.itemContainer}>
                {this.renderText(letra)}
              </View>
          )
          })}
        </View>)
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 2
  },
  itemContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "white",
    height: 30,
    width: 30,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginRight: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  itemContainerGradient: {
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    width: 30
  },
  itemName: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.5)',
    alignSelf: "center",
    fontWeight: "600"
  }
})