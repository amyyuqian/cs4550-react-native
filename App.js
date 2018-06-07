import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentList from './components/AssignmentList'
import ExamList from './components/ExamList'
import CreateAssignment from './components/CreateAssignment'
import EditAssignment from './components/EditAssignment'
import CreateExam from './components/CreateExam'
import CreateQuestion from './components/CreateQuestion'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <ScrollView>
        <Button raised large title="COURSES" buttonStyle={styles.button}
                onPress={() => this.props.navigation
                  .navigate('CourseList') } />
      </ScrollView>
    )
  }
}

const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
  QuestionList,
  TrueFalseQuestionEditor,
  MultipleChoiceQuestionEditor,
  AssignmentList,
  ExamList,
  CreateAssignment,
  EditAssignment,
  CreateExam,
  CreateQuestion
});

const styles = StyleSheet.create({
  button: {
    top: 10,
  }
})
export default App;