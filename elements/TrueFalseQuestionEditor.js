import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      isTrue: this.props.editMode ? this.props.question.isTrue : true
    }
  }
  updateTitle = (title) => {
    this.setState({title: title})
  }
  updateDesc = (desc) => {
    this.setState({description: desc})
  }
  updatePoints = (pts) => {
    this.setState({points: pts})
  }
  updateIsTrue = () => {
    this.setState({isTrue: !this.state.isTrue})
  }

  createQuestion = () => {
    fetch("http://localhost:8080/api/exam/"+this.props.examId+"/truefalse", {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        points: this.state.points,
        isTrue: this.state.isTrue,
        type: 'truefalse'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(this.props.navigation.goBack())
  }

  updateQuestion = () =>  {
    fetch("http://localhost:8080/api/truefalse/" + this.props.question.id, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        points: this.state.points,
        isTrue: this.state.isTrue,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(this.props.navigation.goBack())
  }

  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          text => this.updateTitle(text)
        }>{this.props.editMode ? this.props.question.title : this.state.title}</FormInput>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateDesc(text)
        }>{this.props.editMode ? this.props.question.description : this.state.description}</FormInput>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          points => this.updatePoints(points)
        }>{this.props.editMode ? this.props.question.points : this.state.points}</FormInput>

        <CheckBox onPress={this.updateIsTrue}
                  checked={this.state.isTrue} 
                  title='Check to set true'/>

        <Button	raised backgroundColor="blue" title="SAVE"
          onPress={this.props.editMode ? this.updateQuestion : this.createQuestion}/>

      </View>
    )
  }
}

export default TrueFalseQuestionEditor