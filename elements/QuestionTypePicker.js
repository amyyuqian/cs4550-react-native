import React from 'react'
import {Picker, Text, View} from 'react-native'

class QuestionTypePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <View>
        <Picker
          onValueChange={(itemValue, itemIndex) =>
            this.props.updateQuestionType(itemValue)}
          selectedValue={this.props.questionType}>
          <Picker.Item value="multi" label="Multiple Choice" />
          <Picker.Item value="essay" label="Essay" />
          <Picker.Item value="truefalse" label="True or False" />
          <Picker.Item value="blanks" label="Fill in the Blanks" />
        </Picker>
      </View>
    )
  }
}

export default QuestionTypePicker