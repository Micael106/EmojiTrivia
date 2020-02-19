import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import TopBar from '../renderes/topbar'
import BackButton from '../renderes/backbutton'
import Teclado from '../renderes/teclado'
import Resposta from '../renderes/resposta'
import Boosters from '../renderes/boosters'
import LevelService from '../services/levels'
import Localize from '../services/localize'

export default class Game extends Component {

  state = {}

  componentDidMount() {
    const level = this.props.navigation.state.params
    const data = LevelService.getLevelData(this.props.navigation.state.params.expressionId)
    const tuple = data.expressions.find((item) => item.id == level.expressionId)[Localize.languageCode]
    const expressao = tuple[0]
    const resposta = tuple[1].toUpperCase()
    const respostaArray = this._generateRespostaArray(resposta)
    const tecladoArray = this._generateTeclado(resposta)
    this.setState({
      level: level,
      data: data,
      expressao: expressao,
      resposta: resposta,
      respostaArray: respostaArray,
      tecladoArray: tecladoArray,
    })
  }

  _generateRespostaArray(resposta) {
    const indexesWithEmptyChar = resposta.split("").map((e, i) => e === " " ? i : '').filter(String)
    const respostaArray = resposta.split("").fill("?")
    indexesWithEmptyChar.forEach((idx) => respostaArray[idx] = " ")
    return respostaArray.map((item) => ({idx: -1, key: item}))
  }
  
  _generateTeclado(resposta) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("")
    return (
      this._getRandomSubarray(alphabet, 10)
        .concat(resposta.split(" ").join("").split(""))
        .sort( () => Math.random()-0.5)
        .map( (item,idx) => {return({idx: idx, key: item}) }))
  }

  _getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

  _sendKey = (letra) => {
    // checar se resposta está cheio, caso positov, return não atualizando resposta e teclado
    if (this._checkIfCanSendKey())
      return
    // preencher primeiro espaço vazio em respostaArray (key == ?) com a key selecionada pelo jogador
    const respostaArray = this._updateRespostaArray(letra)
    // remover a letra selecionada do teclado
    const tecladoArray = this._updateTecladoArray(letra)
    // atualizar state
    this.setState({
      respostaArray: respostaArray,
      tecladoArray: tecladoArray,
    })
  }

  _checkIfCanSendKey() {
    const playerResposta = this.state.respostaArray.map(letra => letra.key).join("")
    return this.state.respostaArray.filter(letra => letra.key == "?").length == 0
  }

  _updateRespostaArray(letra) {
    const respostaArray = this.state.respostaArray
    this.state.respostaArray.some((item,index) => {
      if (item.idx == -1 && item.key == "?") {
        respostaArray[index] = letra
        return true
      }
    })
    return respostaArray
  }

  _updateTecladoArray(letra) {
    const tecladoArray = this.state.tecladoArray
    tecladoArray[letra.idx] = {idx: letra.idx, key: "?"}
    return tecladoArray
  }

  // em telcadoArray, pôr de volta letra na primeira posição vazia
  // em respostaArray, removê-lo
  _restorekey = (letra) => {
    const respostaArray = this.state.respostaArray
    const tecladoArray = this.state.tecladoArray

    this.state.tecladoArray.forEach((item,index) => {
      item.idx == letra.idx ? tecladoArray[index] = letra : null
    })
    this.state.respostaArray.forEach((item,index) => {
      item.idx == letra.idx ? respostaArray[index] = {idx: -1, key: "?"} : null
    })

    this.setState({
      tecladoArray: tecladoArray,
      respostaArray: respostaArray
    })
  }

  alert(title="", content) {
    Alert.alert(title, JSON.stringify(content))
  }

  render() {
    return (
      <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#4285f4','#34a853','#fbbc05','#ea4335','#e1306c']} style={styles.linearGradient}>
        <TopBar/>
    
        <View style={styles.container}>
    
          <View style={styles.expressao}>
            {
              this.state.expressao!=null ?
                <Text style={{fontSize: 50}}>
                  {this.state.expressao}
                </Text>
              :
                null
            }
          </View>
      
          <View style={styles.resposta}>
            {/* <Text style={{alignSelf: "center", fontSize: 18, fontFamily: "coiny", color: "rgba(255,255,255,0.8)"}}>
              Entretenimento
            </Text> */}
            {
              this.state.respostaArray!=null ?
                <Resposta
                  rightResposta={this.state.resposta}
                  respostaArray={this.state.respostaArray}
                  onPress={this._restorekey}/>
              :
                null
            }
          </View>
    
          <View>
            <Boosters/>
          </View>
      
          <View style={styles.teclado}>
            {
              this.state.tecladoArray!=null ? 
                <Teclado
                  tecladoArray={this.state.tecladoArray}
                  onPress={this._sendKey}
                  respostaArray={this.state.respostaArray}/>
              :
                null
            }
          </View>
        </View>
    
        <BackButton/>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    width: "90%",
    height: "80%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  expressao: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "85%",
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  resposta: {
    height: 142,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center"
  },
  teclado: {
    width: "100%",
    height: 142,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center"
  },
  categoria: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 10,
    alignSelf: "center",
    width: "85%"
  }
})