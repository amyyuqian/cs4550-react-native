import React from 'react'
import {View} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class MultipleChoiceQuestionEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      options: [],
      numChoices: 0,
      selectedChoice: 0
    }
  }

  createQuestion = () => {
    fetch("http://localhost:8080/api/exam/"+this.props.examId+"/multi", {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        points: this.state.points,
        options: this.state.options.join(),
        correctOption: this.state.selectedChoice,
        type: 'multi'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(this.props.navigation.goBack())
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

  onSelect(index){
    this.setState({
      selectedChoice: index
    })
  }

  addChoice = () => {
    this.setState({numChoices: this.state.numChoices + 1})
  }

  updateOption = (index, text) => {
    _options = this.state.options.slice()
    _options[index] = text

    this.setState({options: _options})
  }

  renderChoices = () => {
    let choices = []
    for (let i = 0; i < this.state.numChoices; i++) {

      choices.push(
        <RadioButton key={i}>
          <FormInput onChangeText={
            text => this.updateOption(i, text)
          }/>
        </RadioButton>
      )
    }
    return choices
  }

  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          title => this.updateTitle(title)
        }/>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateDesc(text)
        }/>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          points => this.updatePoints(points)
        }/>

        <RadioGroup
          onSelect = {(index, value) => this.onSelect(index)}
        >
          {this.renderChoices()}
        </RadioGroup>
        <Button raised title='ADD CHOICE' backgroundColor='green'
            onPress={this.addChoice}/>
        <Button	raised backgroundColor="blue" title="SAVE"
          onPress={this.createQuestion}/>
      </View>
    )
  }
}

export default MultipleChoiceQuestionEditor