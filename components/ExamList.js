import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import Exam from '../elements/Exam'

export default class ExamList extends Component {
  static navigationOptions = {title: 'Exams'}
  constructor(props) {
    super(props)
    this.state = {
      exams: [],
      courseId: 1,
      moduleId: 1,
      lessonId: this.props.navigation.getParam("lessonId")
    }
  }
  componentDidMount() {
    this.getExams()
  }

  getExams = () => {
    fetch("http://localhost:8080/api/lesson/"+this.state.lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({
        exams: widgets.filter(widget => widget.widgetType === "exam")
      }))
  }

  componentWillReceiveProps(newProps) {
    this.getExams()
  }
  render() {
    return(
      <ScrollView style={{padding: 15}}>
        <Button raised large title='CREATE' icon={{name: "add-circle"}} 
          buttonStyle={styles.button} 
          onPress={() => this.props.navigation.navigate('CreateExam', {lessonId: this.state.lessonId})}/>
        {this.state.exams.map(
          (exam, index) => (
            <Exam key={index} exam={exam} navigation={this.props.navigation}
              />))
          }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  }
})
