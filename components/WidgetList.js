import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      assignments: [],
      exams: [],
      courseId: 1,
      moduleId: 1,
      lessonId: this.props.navigation.getParam("lessonId"),
    }
  }
  render() {
    return(
      <View style={{padding: 15}}>
      <Button raised large title='ASSIGNMENTS' buttonStyle={styles.button}
        onPress={() => this.props.navigation.navigate('AssignmentList', {lessonId: this.state.lessonId})} />
      <Button raised large title='EXAMS' buttonStyle={styles.button}
        onPress={() => this.props.navigation.navigate('ExamList', {lessonId: this.state.lessonId})} />
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
export default WidgetList