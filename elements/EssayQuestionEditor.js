import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, TextInput} from 'react-native'
import {Text, Button, FormLabel, FormInput} from 'react-native-elements'

export default class EssayQuestionEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      sescription: "",
      points: 0,
    }
  }

  updateTitle = (title) => {
    this.setState({title: title})
  }

  updateDesc = (text) => {
    this.setState({description: text})
  }

  updatePoints = (points) => {
    this.setState({points: points})
  }

  createEssay = () => {
    fetch("http://localhost:8080/api/exam/"+this.props.examId+"/essay", {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        points: this.state.points,
        type: 'essay'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => (response.json()))
      .then(this.props.navigation.goBack())
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={title => this.updateTitle(title)}/>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={text => this.updateDesc(text)}/>
        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={pts => this.updatePoints(pts)}/>
        <Button	raised backgroundColor="blue" title="SAVE"
          onPress={this.createEssay}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    
  }
})