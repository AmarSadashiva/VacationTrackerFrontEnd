import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from '../Components/Header';
import ButtonType from '../Components/Button';
import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { Alert } from 'react-native';

/**
 * Function to review leave and work from home requests
 */
export default function Requestspage({ navigation, route }) {
    // Hooks to store the leave and work from home details
    const [dataSource, setDataSource] = useState([]);
    const manager_id = route.params.id.associateId;

    useEffect(() => {
        // to retrieve all the leave and work from home requests made to the manager
        axios.get(`http://192.168.43.110:8088/api/VacationTracker/getVacationDetailsForReview/${manager_id}`)
            .then(res => {
                setDataSource(res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    const handleAcceptButton = (item) => {
        const vacationDetails = {
            serialNum: item.serialNum,
            associateID: item.associateID,
            vacationType: item.vacationType,
            startDate: item.startDate,
            endDate: item.endDate,
            description: item.description,
            leaveStatus: item.leaveStatus
        }
        // To update the database if the request is accepted by the manager
        axios.put('http://192.168.43.110:8088/api/VacationTracker/acceptRequest', vacationDetails)
            .then((response) => {
                if (response.status === 201) {
                    Alert.alert(
                        'Vacation details updated succesfully',
                    )
                }
            })
        const slNo = item.serialNum;
        setDataSource(dataSource => {
            return dataSource.filter((item) => item.serialNum !== slNo);
        });
    }

    const handleDeclineButton = (item) => {
        const vacationDetails = {
            serialNum: item.serialNum,
            associateID: item.associateID,
            vacationType: item.vacationType,
            startDate: item.startDate,
            endDate: item.endDate,
            description: item.description,
            leaveStatus: item.leaveStatus
        }
        // To update the database if the request is rejected by the manager
        axios.put('http://192.168.43.110:8088/api/VacationTracker/declineRequest', vacationDetails)
            .then((response) => {
                if (response.status === 201) {
                    Alert.alert(
                        'Vacation details updated succesfully',
                    )
                }
            })
        const slNo = item.serialNum;
        setDataSource(dataSource => {
            return dataSource.filter((item) => item.serialNum !== slNo);
        });
    }

    return (
        <View style={Styles.container}>
            {/* Header component */}
            <Header title="Review Requests" />

            {/**
              * FlatList is component which renders a scrollable view 
              * Contains Request details
              */}
            <FlatList
                keyExtractor={(item) => item.serialNum}
                data={dataSource}
                renderItem={({ item }) => (
                    <View style={Styles.Request}>
                        <Text style={Styles.name}>{item.associateID}</Text>
                        <Text style={Styles.Desc}>{item.vacationType}</Text>
                        <Text style={Styles.Desc}>From : {item.startDate}</Text>
                        <Text style={Styles.Desc}>To : {item.endDate}</Text>
                        <View style={Styles.Button}>
                            <ButtonType name='Accept' onPress={() => handleAcceptButton(item)} />
                            <ButtonType name='Decline' onPress={() => handleDeclineButton(item)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    name: {
        fontSize: 24
    },
    Desc: {
        fontSize: 20
    },
    Request: {
        margin: 10,
        padding: 10,
        borderWidth: 2,
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
    },
    Button: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray',
        height: '100%'
    }
});