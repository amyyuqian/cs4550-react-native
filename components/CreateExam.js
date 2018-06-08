import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, ListItem, Button, FormInput, FormLabel} from 'react-native-elements'

export default class CreateExam extends Component {
  static navigationOptions = {title: 'Create Exam'}
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      text: "",
      lessonId: this.props.navigation.getParam("lessonId")
    }
  }

  updateTitle = (title) => {
    this.setState({title: title})
  }

  updateText = (text) => {
    this.setState({text: text})
  }

  createExam = () => {
    fetch("http://localhost:8080/api/lesson/"+this.state.lessonId+"/exam", {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        text: this.state.text,
        widgetType: 'exam',
        dType: 'exam'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(exam => this.props.navigation.navigate('ExamList', {examId: exam.id}))
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={title => this.updateTitle(title)}/>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={text => this.updateText(text)}/>
        <Button raised title='CREATE EXAM' backgroundColor='blue'
          onPress={this.createExam} />
      </View>
    )
  }

}