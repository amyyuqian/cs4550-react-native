import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import Assignment from '../elements/Assignment'

export default class AssignmentList extends Component {
  static navigationOptions = {title: 'Assignments'}
  constructor(props) {
    super(props)
    this.state = {
      assignments: [],
      courseId: 1,
      moduleId: 1,
      lessonId: this.props.navigation.getParam("lessonId")
    }
  }
  componentDidMount() {
    const {navigation} = this.props;

    fetch("http://localhost:8080/api/lesson/"+this.state.lessonId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({
        assignments: widgets.filter(widget => widget.widgetType === "assignment")}))
  }
  render() {
    return(
      <ScrollView style={{padding: 15}}>
      <Button raised large title='CREATE' icon={{name: "add-circle"}} 
        buttonStyle={styles.button} 
        onPress={() => this.props.navigation.navigate('CreateAssignment', {lessonId: this.state.lessonId})}/>
      {this.state.assignments.map(
        (assign, index) => (
          <Assignment key={index} assign={assign} navigation={this.props.navigation}/>))
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
