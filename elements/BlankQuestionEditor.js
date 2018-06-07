import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, TextInput} from 'react-native'
import {Text, Button, FormLabel, FormInput} from 'react-native-elements'

export default class BlanksQuestionEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      blanks: ''
    }
  }

  updateTitle = (title) => {
    this.setState({title: title})
  }
  updateDesc = (desc) => {
    this.setState({description: desc})
  }
  updatePoints = (pts) => {
    this.setState({points: pts})
  }
  updateBlanks = (blanks) => {
    this.setState({blanks: blanks})
  }

  createQuestion = () => {
    fetch("http://localhost:8080/api/exam/"+this.props.examId+"/blanks", {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        points: this.state.points,
        blanks: this.state.blanks,
        type: 'blanks'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(this.props.navigation.goBack())
  }

  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          title => this.updateTitle(title)
        }/>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateDesc(text)
        }/>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          points => this.updatePoints(points)
        }/>
        <FormLabel>Fill in the Blanks</FormLabel>
        <FormInput onChangeText={
          blanks => this.updateBlanks(blanks)
        }/>
        <Button	raised backgroundColor="blue" title="SAVE"
          onPress={this.createQuestion}/>
      </View>
    )
  }

}