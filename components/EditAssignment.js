import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button, FormLabel, FormInput} from 'react-native-elements'

export default class CreateAssignment extends Component {
  static navigationOptions = {title: 'Edit Assignment'}
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.navigation.getParam('title'),
      text: this.props.navigation.getParam('text'),
      points: this.props.navigation.getParam('points'),
      assignId: this.props.navigation.getParam("assignId")
    }
  }

  updateTitle = (title) => {
    this.setState({title: title})
  }

  updateText = (text) => {
    this.setState({text: text})
  }

  updatePoints = (points) => {
    this.setState({points: points})
  }

  saveAssignment = () => {
    fetch("http://localhost:8080/api/assignment/" + this.state.assignId, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        text: this.state.text,
        points: this.state.points,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(this.props.navigation.navigate('AssignmentList'))
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={title => this.updateTitle(title)}>{this.state.title}</FormInput>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={text => this.updateText(text)}>{this.state.text}</FormInput>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={pts => this.updatePoints(pts)}>{this.state.points}</FormInput>
        <Button raised title='SAVE' backgroundColor='blue'
          onPress={this.saveAssignment} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
})