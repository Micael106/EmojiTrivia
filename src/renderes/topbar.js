import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import Localize from '../services/localize'
import Levels from '../pages/levels'

export default class TopBar extends Component {

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.leftContent}>
          <View style={{flex: 1, justifyContent: "center"}}>
            <View>
              <Text style={{color: "white", alignSelf: "center", fontSize: 10, fontFamily: "coiny"}}>{Localize.get("level")}</Text>
            </View>
            <View>
              <Text style={{color: "white", alignSelf: "center", fontSize: 20, fontFamily: "coiny", padding: 0, marginTop: -15}}>10</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: "center"}}>
            <ProgressBar progress={0.1} width={60} height={20} color="white" borderColor="white" />
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{flex: 1}}>
            <Image
              source={require("../assets/gem.png")}
              style={{flex: 1, resizeMode: "contain", alignSelf: "center"}} />
          </View>
          <View style={{flex: 1, justifyContent: "center"}}>
            <Text style={styles.text}>777</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: "rgba(100,100,100,0.5)",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#555",
    shadowOffset: { width: 0, height: 12},
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  rightContent: {
    width: "40%",
    height: "75%",
    borderWidth: 2,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "white",
    flexDirection: "row",
    alignSelf: "center"
  },
  leftContent: {
    width: "40%",
    height: "75%",
    borderWidth: 2,
    borderRightWidth: 0,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: "white",
    flexDirection: "row",
    alignSelf: "center"
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "coiny"
  }
})