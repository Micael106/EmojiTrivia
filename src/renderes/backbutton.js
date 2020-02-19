import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import BouncyView from 'react-native-bouncy-touchable'
import { withNavigation } from 'react-navigation'

class BackButton extends Component {
  render() {
    return (
      <BouncyView delay={0} scale={1.2} style={styles.container} onPress={() => this.props.navigation.goBack()}>
        <Image style={styles.image} source={require("../assets/button-back.png")}/>
      </BouncyView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 10
  },
  image: {
    width: 50,
    height: 50
  }
})

export default withNavigation(BackButton)