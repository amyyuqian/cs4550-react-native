import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {Text, ListItem, Button, Card, FormLabel, FormInput, Icon} from 'react-native-elements'

export default class Assignment extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Text style={styles.title}>{this.props.assign.title}</Text>
          <Text style={styles.points}>{this.props.assign.points} pts</Text>
        </View>
        <Text style={styles.text}>{this.props.assign.text}</Text>
        <FormLabel>Essay Answer</FormLabel>
        <FormInput />
        <FormLabel>Upload a File</FormLabel>
        <Button buttonStyle={styles.button} raised title='UPLOAD' backgroundColor='blue' />
        <FormLabel>Submit a Link</FormLabel>
        <FormInput />
        <View style={[styles.wrap, styles.button]}>
          <Button raised title='CANCEL' backgroundColor='red' />
          <Button raised title='SUBMIT' backgroundColor='blue' />
          <Icon name='create' onPress={() => 
            this.props.navigation.navigate('EditAssignment', 
            {assignId: this.props.assign.id, title: this.props.assign.title,
            points: this.props.assign.points, text: this.props.assign.text})} />
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#a4a4a4',
    padding: 10,
    margin: 10
  },
  text: {
    height: 100,
    padding: 10
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  title: {
    width: 200,
    fontWeight: 'bold'
  },
  points: {
    width: 100,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 5,
    marginBottom: 5
  }
})