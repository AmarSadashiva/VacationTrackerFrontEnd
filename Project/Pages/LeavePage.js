import React, { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import Header from '../Components/Header';
import ButtonType from '../Components/Button';
import PickerContainer from '../Components/Picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Alert } from 'react-native'



/**
 * This function handles leave details.
 */
export default function LeavePage({ navigation, route }) {

    /**
     * Hooks for storing leave date and time
     * mode: date or time
     * ShowStartdate: boolean (displays date and time picker) 
     */
    const [selectedStartDate, setSelectedStartDate] = useState();
    const [selectedEndDate, setSelectedEndDate] = useState();
    const [mode, setMode] = useState('date');
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);
    const [vacationType, setVacationType] = useState('Work From Home');
    const [description, setDescription] = useState('');
    const [minimumEndDate, setMinimunEndDate] = useState(new Date());

    const isWorkFromHome = route.params.workFromHome;
    const associateId = route.params.id.associateId;

    const handleVacationType = (value) => {
        setVacationType(value);
    }

    const handleSubmit = () => {
        const vacationDetails = {
            associateID: associateId,
            vacationType: vacationType,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            description: description,
            leaveStatus: 'in review'
        }
        // To save the vacation details in the database and to increment the number of leaves taken
        axios.post('http://192.168.43.110:8088/api/VacationTracker/addVacationInfo', vacationDetails)
            .then((response) => {
                if (response.status === 201) {
                    console.log("vacation details stored succesfully");
                    Alert.alert(
                        'Vacation details submitted succesfully',
                    )
                    route.params.callbackFunction.incrementLeaves();
                    navigation.navigate('Home');
                }
            })
    }

    const handleDescription = (value) => {
        setDescription(value);
    }

    /**
     * Assigns the picked date to selectedStartDate hook
     * @param {*} pickedDate (Date selected from the date picker)
     */
    const onStartDateChange = (event, pickedDate) => {
        setShowStartDate(Platform.OS === 'ios' ? true : false);
        const startDate = pickedDate || selectedStartDate;
        setSelectedStartDate(startDate.toDateString());
        setMinimunEndDate(pickedDate);
    };

    /**
     * Assigns the picked time to selectedStartTime hook
     * @param {*} pickedTime (Time selected from the time picker)
     */
    const onStartTimeChange = (event, pickedTime) => {
        setShowStartTime(Platform.OS === 'ios' ? true : false);
        const startTime = pickedTime || selectedStartTime;
        setSelectedStartTime(startTime.toLocaleTimeString());
    };

    /**
     * Assigns the picked time to selectedEndTime hook
     * @param {*} pickedTime (Time selected from the time picker)
     */
    const onEndTimeChange = (event, pickedTime) => {
        setShowEndTime(Platform.OS === 'ios' ? true : false);
        const endTime = pickedTime || selectedEndTime;
        setSelectedEndTime(endTime.toLocaleTimeString());
    };

    /**
     * Assigns the picked date to selectedEndDate hook
     * @param {*} pickedDate (Date selected from the date picker)
     */
    const onEndDateChange = (event, pickedDate) => {
        setShowEndDate(Platform.OS === 'ios' ? true : false);
        const endDate = pickedDate || selectedEndDate;
        setSelectedEndDate(endDate.toDateString());
    };

    /**
     * Displays date picker and sets the mode hook to current mode
     * @param {*} currentMode (date mode or time mode)
     */
    const showModeStartDate = currentMode => {
        setShowStartDate(true);
        setMode(currentMode);
    };

    /**
     * Displays date picker and sets the mode hook to current mode
     * @param {*} currentMode (date mode or time mode)
     */
    const showModeEndDate = currentMode => {
        setShowEndDate(true);
        setMode(currentMode);
    };

    /**
     * Displays time picker and sets the mode hook to current mode
     * @param {*} currentMode (date mode or time mode)
     */
    const showModeStartTime = currentMode => {
        setShowStartTime(true);
        setMode(currentMode);
    };

    /**
     * Displays time picker and sets the mode hook to current mode
     * @param {*} currentMode (date mode or time mode)
     */
    const showModeEndTime = currentMode => {
        setShowEndTime(true);
        setMode(currentMode);
    };


    // calling functions which set the mode type
    const showDatepickerStartDate = () => {
        showModeStartDate('date');
    };

    const showDatepickerEndDate = () => {
        showModeEndDate('date');
    };

    const showTimepickerStartTime = () => {
        showModeStartTime('time');
    };

    const showTimepickerEndTime = () => {
        showModeEndTime('time');
    };

    return (
        <View style={Styles.layout}>
            {/* Adds the header component */}
            <View>
                <Header title="Apply for Vacation" />
            </View>

            <View style={Styles.main}>
                {/* Using Datetime picker which is imported from '@react-native-community/datetimepicker' */}
                <View style={Styles.input}>
                    <Text>Start Date</Text>
                    <TextInput style={Styles.textInput}
                        placeholder='Select date'
                        onTouchEnd={showDatepickerStartDate}
                        value={selectedStartDate}
                    />
                </View>
                {showStartDate && (
                    <DateTimePicker
                        testID="start date picker"
                        timeZoneOffsetInMinutes={330}
                        value={new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        minimumDate={new Date()}
                        onChange={onStartDateChange}
                    />
                )}

                {/* Using Datetime picker which is imported from '@react-native-community/datetimepicker'; */}
                <View style={Styles.input}>
                    <Text>Start Time</Text>
                    <TextInput style={Styles.textInput}
                        placeholder='Select Time'
                        onTouchEnd={showTimepickerStartTime}
                        value={selectedStartTime}
                    />
                </View>

                {showStartTime && (
                    <DateTimePicker
                        testID="start time picker"
                        timeZoneOffsetInMinutes={330}
                        value={selectedStartTime}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onStartTimeChange}
                    />
                )}

                {/* Using Datetime picker which is imported from '@react-native-community/datetimepicker'; */}
                <View style={Styles.input}>
                    <Text>End Date</Text>
                    <TextInput style={Styles.textInput}
                        placeholder='Select date'
                        onTouchEnd={showDatepickerEndDate}
                        value={selectedEndDate}
                    />
                </View>

                {showEndDate && (
                    <DateTimePicker
                        testID="end date picker"
                        timeZoneOffsetInMinutes={330}
                        value={new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        minimumDate={minimumEndDate}
                        onChange={onEndDateChange}
                    />
                )}

                {/* Using Datetime picker which is imported from '@react-native-community/datetimepicker'; */}
                <View style={Styles.input}>
                    <Text>End Time</Text>
                    <TextInput style={Styles.textInput}
                        placeholder='Select Time'
                        onTouchEnd={showTimepickerEndTime}
                        value={selectedEndTime}
                    />
                </View>

                {showEndTime && (
                    <DateTimePicker
                        testID="end time picker"
                        timeZoneOffsetInMinutes={330}
                        value={selectedEndTime}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onEndTimeChange}
                    />
                )}

                {/* Picker to select the type of leave */}
                {isWorkFromHome === true ? null : <View style={Styles.picker}>
                    <PickerContainer handleVacType={handleVacationType} />
                </View>}

                {/* leave description box */}
                <View style={Styles.description}>
                    <Text>Description</Text>
                    <TextInput style={Styles.textInput}
                        placeholder='Description'
                        value={description}
                        onChangeText={handleDescription}
                    />
                </View>

                {/* Submit button  */}
                <View style={Styles.submitButton}>
                    <ButtonType name='Submit' onPress={handleSubmit} />
                </View>
            </View>
        </View>
    );
}


const Styles = StyleSheet.create(
    {
        layout: {
            flex: 1
        },
        input: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: '5%',
            justifyContent: 'space-around',
            borderColor: 'black',
        },
        textInput: {
            borderRadius: 10,
            borderColor: "black",
            color: 'blue'
        },

        main: {
            flex: 0.6,
            justifyContent: "flex-start",
            backgroundColor: 'white',
            alignItems: 'center',
            height: '20%'
        },

        picker: {
            flex: 1.3,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'stretch',
            marginLeft: 20
        },

        description: {
            flex: 3,
            borderWidth: 1.5,
            borderColor: 'grey',
            width: '80%',
            height: '35%',
            alignItems: 'flex-start',
            marginLeft: 30,
            paddingLeft: 10,
            backgroundColor: 'white'
        },

        submitButton: {
            flex: 1,
            width: '30%',
            alignItems: 'stretch',
            marginTop: 4
        },
    }
);

