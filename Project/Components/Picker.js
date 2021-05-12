import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { render } from 'react-dom';


/**
 * Picker component to select among different types of leaves
 * It is imported in LeavePage.js
 */
export default class PickerContainer extends Component {
    constructor() {
        super();
        this.state = { selectedVacationType: '' };
        this.setVacationType = this.setVacationType.bind(this);

    }
    setVacationType = (value,selectedValue) => {
        this.setState({ selectedVacationType: value });
        const vacationType = value;
        //console.log(vacationType);
        this.props.handleVacType(vacationType);
    }

    render() {
        return (
            <View>
                <Picker selectedValue={this.state.selectedVacationType}
                    onValueChange={this.setVacationType}>
                    <Picker.Item label="Select vacation type" value='0' color='blue'></Picker.Item>
                    <Picker.Item label="Half day leave" value='Half day leave' color='blue'></Picker.Item>
                    <Picker.Item label="Sick leave" value='Sick leave' color='blue'></Picker.Item>
                    <Picker.Item label="Personal leave" value='Personal leave' color='blue'></Picker.Item>
                    <Picker.Item label="Paternity leave" value='Paternity leave' color='blue'></Picker.Item>
                    <Picker.Item label="Maternity leave" value='Maternity leave' color='blue'></Picker.Item>
                </Picker>
            </View>
        );
    }
}


