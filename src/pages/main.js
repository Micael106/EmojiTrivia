import React, { Component } from 'react'

import {
  View, Text, StatusBar, StyleSheet,
  ImageBackground, Image, Button,  } from 'react-native'
import TopBar from '../renderes/topbar'
import LinearGradient from 'react-native-linear-gradient'
import AwesomeButton from "react-native-really-awesome-button"
import Localize from '../services/localize'

export default class Main extends Component {
  render() {
    return (
      <LinearGradient colors={['#fbbc05','#ea4335','#e1306c']} style={styles.linearGradient}>
        <StatusBar hidden={true}/>
        
        <TopBar/>

        <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
        
        <AwesomeButton
          type="primary"
          backgroundColor={null}
          backgroundDarker={null}
          textSize={25}
          textColor="white"
          borderColor="white"
          borderWidth={3}
          borderRadius={10}
          textFontFamily="coiny-regular"
          onPress={() => this.props.navigation.navigate('Levels')}>
            {Localize.get("play")}
        </AwesomeButton>

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
  logo: {
    width: 400,
    height: 400 * 351/572,
    resizeMode: "stretch",
    alignSelf: "center",
    marginBottom: 0,
    marginTop: -150
  }
})