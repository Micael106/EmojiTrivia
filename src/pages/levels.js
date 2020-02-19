import React, { Component } from 'react'
import {
  View, Text, StatusBar, StyleSheet,
  ImageBackground, Image, Button, Alert, TouchableOpacity } from 'react-native'
import TopBar from '../renderes/topbar'
import BackButton from '../renderes/backbutton'
import LinearGradient from 'react-native-linear-gradient'
import { FlatGrid } from 'react-native-super-grid';
import AsyncStorage from '@react-native-community/async-storage'
import Localize from '../services/localize'

export default class Levels extends Component {

  state = { levels: [1,2,3,4], currentLevel: null }

  getViewCenter(item) {
    if (!item.complete && item.disp)
      return (<Text style={styles.itemName}>{item.id}</Text>)
    else if (item.complete)
      return (<Image
            style={{width: 50, height: 50}}
            source={require("../assets/tick.png")}/>)
    return (<Image
      style={{width: 50, height: 50}}
      source={require("../assets/padlock.png")}/>)
  }

  getBackgroundColor(item) {
    if (!item.complete && item.disp)
      return ["yellow","orange"]
    return ["rgba(0,0,0,0.5)","rgba(0,0,0,0.5)"]
  }

  getLevels() {
    AsyncStorage.getItem('@current_level').then((data) => {
      const levelIds = require('../levels/indexes.json').ids
      const lastLevel = levelIds[levelIds.length - 1]
      var currentLevel = {id: 1, expressionId: 1}
      if (data != null)
        currentLevel = JSON.parse(data)
      levels = []
      for (let i = 1; i <= lastLevel; i++)
        levels.push({id: i, complete: i<currentLevel.id, disp: i==currentLevel.id})
      this.setState({levels: levels, currentLevel: currentLevel})
    })
  }

  componentDidMount() {
    this.getLevels()
  }

  render() {
    return(
      <LinearGradient colors={['#fbbc05','#ea4335','#e1306c']} style={styles.linearGradient}>
        <TopBar/>
        <Text style={styles.topMessage}>{Localize.get("new_levels_every_week")}</Text>
        <FlatGrid
          style={styles.gridView}
          itemDimension={100}
          items={this.state.levels}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => { if(this.state.currentLevel != null) this.props.navigation.navigate("Game", this.state.currentLevel)}}
              disabled={item.complete || !item.disp}>
              <LinearGradient colors={this.getBackgroundColor(item)} style={styles.itemContainer}>
                {this.getViewCenter(item)}
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
        <BackButton/>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    height: 100,
    alignItems: "center"
  },
  itemName: {
    marginTop: -8,
    fontSize: 50,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: "600",
    fontFamily: "coiny"
  },
  topMessage: {
    backgroundColor: "rgba(100,100,100,0.5)",
    color: "white",
    paddingBottom: 10,
    marginTop: 60,
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "coiny"
  }
})