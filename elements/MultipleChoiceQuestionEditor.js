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

  updateQuestion = () => {
    fetch("http://localhost:8080/api/multi/" + this.props.question.id, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        points: this.state.points,
        options: this.state.options.join(),
        correctOption: this.state.selectedChoice,
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
    if (this.props.editMode) {
      let splitChoices = this.props.question.options.split(',')
      let numChoices = splitChoices.length
      for (let i = 0; i < numChoices; i++) {
        choices.push(
          <RadioButton key={i}>
            <FormInput onChangeText={
              text => this.updateOption(i, text)
            }>{splitChoices[i]}</FormInput>
          </RadioButton>
        )
        }
    } else {
      for (let i = 0; i < this.state.numChoices; i++) {
      choices.push(
        <RadioButton key={i}>
          <FormInput onChangeText={
            text => this.updateOption(i, text)
          } />
        </RadioButton>
      )
      }
    }
    
    return choices
  }

  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          title => this.updateTitle(title)
        }>{this.props.editMode ? this.props.question.title : this.state.title}</FormInput>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateDesc(text)
        }>{this.props.editMode ? this.props.question.description : this.state.description}</FormInput>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          points => this.updatePoints(points)
        }>{this.props.editMode ? this.props.question.points : this.state.points}</FormInput>

        <RadioGroup
          onSelect = {(index, value) => this.onSelect(index)}
          selectedIndex={this.props.editMode ? this.props.question.correctOption : this.state.selectedChoice}
        >
          {this.renderChoices()}
        </RadioGroup>
        <Button raised title='ADD CHOICE' backgroundColor='green'
            onPress={this.addChoice}/>
        <Button raised backgroundColor="blue" title="SAVE"
          onPress={this.props.editMode ? this.updateQuestion : this.createQuestion}/>
      </View>
    )
  }
}

export default MultipleChoiceQuestionEditor