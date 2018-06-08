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

  updateQuestion = () => {
    fetch("http://localhost:8080/api/blanks/"+this.props.question.id, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        points: this.state.points,
        blanks: this.state.blanks,
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
        }>{this.props.editMode ? this.props.question.title : this.state.title}</FormInput>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateDesc(text)
        }>{this.props.editMode ? this.props.question.description : this.state.description}</FormInput>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          points => this.updatePoints(points)
        }>{this.props.editMode ? this.props.question.points : this.state.points}</FormInput>
        <FormLabel>Fill in the Blanks</FormLabel>
        <FormInput onChangeText={
          blanks => this.updateBlanks(blanks)
        }>{this.props.editMode ? this.props.question.blanks : this.state.blanks}</FormInput>
        <Button	raised backgroundColor="blue" title="SAVE"
          onPress={this.props.editMode ? this.updateQuestion : this.createQuestion}/>
      </View>
    )
  }

}