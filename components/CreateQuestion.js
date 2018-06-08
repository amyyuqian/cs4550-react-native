import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button, FormInput, FormLabel} from 'react-native-elements'
import QuestionTypePicker from '../elements/QuestionTypePicker'
import MultipleChoiceQuestionEditor from '../elements/MultipleChoiceQuestionEditor'
import EssayQuestionEditor from '../elements/EssayQuestionEditor'
import TrueFalseQuestionEditor from '../elements/TrueFalseQuestionEditor'
import BlankQuestionEditor from '../elements/BlankQuestionEditor'

export default class CreateQuestion extends Component {
  static navigationOptions = {title: 'Create Question'}
  constructor(props) {
    super(props)
    this.state = {
      questionType: 'multi',
      examId: this.props.navigation.getParam("examId"),
    }
  }

  updateQuestionType = (type) => {
    this.setState({questionType: type})
  }

  render() {
    return (
      <ScrollView>
        <QuestionTypePicker updateQuestionType={this.updateQuestionType}
          questionType={this.state.questionType}/>
        {this.state.questionType === 'multi' && 
          <MultipleChoiceQuestionEditor examId={this.state.examId} navigation={this.props.navigation}/>}
        {this.state.questionType === 'essay' &&
          <EssayQuestionEditor examId={this.state.examId} navigation={this.props.navigation}/>}
        {this.state.questionType === 'truefalse' &&
          <TrueFalseQuestionEditor examId={this.state.examId} navigation={this.props.navigation}/>}
        {this.state.questionType === 'blanks' &&
          <BlankQuestionEditor examId={this.state.examId} navigation={this.props.navigation}/>}
      </ScrollView>
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
  centered: {
    textAlign: 'center',
  }
})