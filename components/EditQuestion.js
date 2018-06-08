import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button, FormInput, FormLabel} from 'react-native-elements'
import QuestionTypePicker from '../elements/QuestionTypePicker'
import MultipleChoiceQuestionEditor from '../elements/MultipleChoiceQuestionEditor'
import EssayQuestionEditor from '../elements/EssayQuestionEditor'
import TrueFalseQuestionEditor from '../elements/TrueFalseQuestionEditor'
import BlankQuestionEditor from '../elements/BlankQuestionEditor'

export default class EditQuestion extends Component {
  static navigationOptions = {title: 'Edit Question'}
  constructor(props) {
    super(props)
    this.state = {
      question: {
        id: this.props.navigation.getParam('id'),
        title: this.props.navigation.getParam('title'),
        description: this.props.navigation.getParam('description'),
        points: this.props.navigation.getParam('points'),
        options: this.props.navigation.getParam('options'),
        correctOption: this.props.navigation.getParam('correctOption'),
        type: this.props.navigation.getParam('type'),
        isTrue: this.props.navigation.getParam('isTrue'),
        blanks: this.props.navigation.getParam('blanks')
      }
    }
  }

  deleteQuestion = () => {
    fetch("http://localhost:8080/api/" + this.state.question.type 
      + "/" + this.state.question.id, {
      method: 'DELETE',
    })
      .then(response => (response.json()))
      .then(this.props.navigation.goBack())
  }

  render() {
    return (
      <View>
        {this.state.question.type === 'multi' && 
          <MultipleChoiceQuestionEditor question={this.state.question}
          editMode={true} navigation={this.props.navigation}/>}
        {this.state.question.type === 'essay' && 
          <EssayQuestionEditor question={this.state.question}
          editMode={true} navigation={this.props.navigation}/>}
        {this.state.question.type === 'blanks' && 
          <BlankQuestionEditor question={this.state.question}
          editMode={true} navigation={this.props.navigation}/>}
        {this.state.question.type === 'truefalse' && 
          <TrueFalseQuestionEditor question={this.state.question}
          editMode={true} navigation={this.props.navigation}/>}
        <Button raised backgroundColor='red' title='DELETE' onPress={this.deleteQuestion} />
      </View>
    )
  }
}