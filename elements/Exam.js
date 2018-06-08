import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button, Card, FormLabel, FormInput, Icon} from 'react-native-elements'

export default class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      title: this.props.exam.title,
      text: this.props.exam.text,
    }
  }

  componentDidMount() {
    this.getQuestions()
  }

  getQuestions = () => {
    fetch("http://localhost:8080/api/exam/" + this.props.exam.id + '/question')
      .then(response => (response.json()))
      .then(questions => this.setState({questions: this.mapIcons(questions)}))
  }

  mapIcons = (questions) => {
    questions.map((question) => {
      if (question.type === 'multi') {
        question['icon'] = 'format-list-bulleted'
      } else if (question.type === 'essay') {
        question['icon'] = 'format-align-left'
      } else if (question.type === 'blanks') {
        question['icon'] = 'insert-comment'
      } else {
        question['icon'] = 'compare-arrows'
      }
    })
    return questions
  }

  updateTitle = (title) => {
    this.setState({title: title})
  }

  updateText = (text) => {
    this.setState({text: text})
  }

  updateExam = () => {
    fetch("http://localhost:8080/api/exam/" + this.props.exam.id, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        text: this.state.text,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
  }

  deleteExam = () => {
    fetch("http://localhost:8080/api/exam/" + this.props.exam.id, {
      method: 'DELETE',
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={title => this.updateTitle(title)}>{this.state.title}</FormInput>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={text => this.updateText(text)}>{this.state.text}</FormInput>
        <View style={{padding: 15}}>
          {this.state.questions.map( (question, index) => (
            <ListItem
              key={index}
              leftIcon={{name: question.icon}}
              title={question.title}
              rightIcon={{name: 'chevron-right'}}
              onPress={() => this.props.navigation.navigate('EditQuestion', 
              {
                id: question.id,
                title: question.title,
                description: question.description,
                points: question.points,
                options: question.options,
                correctOption: question.correctOption,
                type: question.type,
                isTrue: question.isTrue,
                blanks: question.blanks
              })}/>
          ))}
        </View>
        <Button raised title='ADD QUESTION' backgroundColor='green' 
          onPress={() => this.props.navigation.navigate('CreateQuestion', {examId: this.props.exam.id})}/>
        <Button raised title='SAVE CHANGES' backgroundColor='blue' 
          onPress={this.updateExam}/>
        <Button raised title='DELETE' backgroundColor='red' 
          onPress={this.deleteExam}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#a4a4a4',
    padding: 10,
    margin: 10
  },
  text: {
    height: 100,
    padding: 10
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  title: {
    width: 200,
    fontWeight: 'bold'
  },
  points: {
    width: 100,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 5,
    marginBottom: 5
  }
})