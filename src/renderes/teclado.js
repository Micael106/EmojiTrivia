import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient'
 
export default class Teclado extends Component {

  state = {disabled: false}

  renderKey(item) {
    if (item.key == "?") {
      return (
        <LinearGradient colors={["rgba(255,255,0,0.5)", "rgba(255,150,0,0.5)"]} style={[styles.itemContainer]}/>)
    }
    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)} disabled={this.state.disabled}>
        <LinearGradient colors={["yellow", 'orange']} style={[styles.itemContainer]}>
          <Text style={styles.itemName}>{item.key}</Text>
        </LinearGradient>
      </TouchableOpacity>)
  }

  render() {
    return (
      <FlatGrid
        itemDimension={30}
        items={this.props.tecladoArray}
        style={styles.gridView}
        renderItem={({ item }) => (
          this.renderKey(item)
        )}
      />
    );
  }

}
 
const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    height: 35,
    width: 35
  },
  itemName: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.45)',
    alignSelf: "center",
    fontWeight: "600"
  }
});