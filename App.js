import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import QuestionTypeButtonGroupChooser from './elements/QuestionTypeButtonGroupChooser'
import QuestionTypePicker from './elements/QuestionTypePicker'
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
  ExamList
});

const styles = StyleSheet.create({
  button: {
    top: 10,
  }
})
export default App;