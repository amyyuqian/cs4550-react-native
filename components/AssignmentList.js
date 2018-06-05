import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

export default class AssignmentList extends Component {
  static navigationOptions = {title: 'Assignments'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      assignments: [],
      exams: [],
      courseId: 1,
      moduleId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId")
    fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))

    fetch("http://localhost:8080/api/"+lessonId+"/assignment")
      .then(response => (response.json()))
      .then(assignments => this.setState({assignments: assignments}))

    fetch("http://localhost:8080/api/"+lessonId+"/exam")
      .then(response => (response.json()))
      .then(exams => this.setState({exams: exams}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
      <Button raised large title='ASSIGNMENTS' buttonStyle={styles.button}
        onPress={() => this.props.navigation.navigate('AssignmentList')} />
      <Button raised large title='EXAMS' buttonStyle={styles.button}
        onPress={() => this.props.navigation.navigate('ExamList')} />
      {this.state.widgets.map(
        (widget, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("QuestionList", {examId: widget.id})}
            key={index}
            subtitle={widget.description}
            title={widget.title}/>))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  }
})
