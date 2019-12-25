import React, { Component } from 'react'
import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'

export default class CustomPicker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pickerSelection: props.items[props.defaultIndex],
      pickerDisplayed: false
    }
  }

  setPickerValue (newValue, newIndex) {
    this.setState({
      pickerSelection: newValue
    })

    this.props.onValueChange(newValue, newIndex)

    this.togglePicker()
  }

  togglePicker () {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }

  render () {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity
          style={{ backgroundColor: 'transparent' }}
          onPress={() => this.togglePicker()}
          underlayColor='#fff'
        >
          <Text style={{ color: 'white' }}>{this.state.pickerSelection.name}</Text>
        </TouchableOpacity>
        <Modal visible={this.state.pickerDisplayed} animationType='slide' transparent onRequestClose={() => this.setState({ pickerDisplayed: false })}>
          <View style={styles.modalView}>
            <Text style={styles.pickerHeaderText}>אנא בחר בית חולים</Text>
            {this.props.items.map((value, index) =>
              <TouchableHighlight
                key={index} onPress={() => this.setPickerValue(value, index)}
                style={{ paddingTop: 4, paddingBottom: 4 }}
              >
                <Text>{value.name}</Text>
              </TouchableHighlight>
            )}
            <TouchableHighlight
              onPress={() => this.togglePicker()}
              style={{ paddingTop: 4, paddingBottom: 4 }}
            >
              <Text style={{ color: '#999' }}>ביטול</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerHeaderText: {
    fontWeight: 'bold'
  },
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: '#efefef',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    position: 'absolute'
  }
})
