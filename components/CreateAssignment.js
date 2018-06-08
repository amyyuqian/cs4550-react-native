import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button, FormLabel, FormInput} from 'react-native-elements'

export default class CreateAssignment extends Component {
  static navigationOptions = {title: 'Create Assignment'}
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      text: "",
      points: 0,
      lessonId: this.props.navigation.getParam("lessonId")
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

  createAssignment = () => {
    fetch("http://localhost:8080/api/lesson/"+this.state.lessonId+"/assignment", {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        text: this.state.text,
        points: this.state.points,
        widgetType: 'assignment',
        dType: 'assignment'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(assign => this.props.navigation.navigate('AssignmentList', {assignId: assign.id}))
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={title => this.updateTitle(title)}/>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={text => this.updateText(text)}/>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={pts => this.updatePoints(pts)}/>
        <Button raised title='CREATE ASSIGNMENT' backgroundColor='blue'
          onPress={this.createAssignment} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    
  }
})