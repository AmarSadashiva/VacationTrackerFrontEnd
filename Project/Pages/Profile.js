import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, flex } from 'react-native';
import Header from '../Components/Header';
import axios from 'axios';

/**
 * This function renders the Associate details
 */
export default function Profile({ navigation, route }) {
    // hooks to store the associate datails
    const [associateId, setAssociateId] = useState(route.params.id.associateId);
    const [associateName, setAssociateName] = useState();
    const [designation, setDesignation] = useState();
    const [managerName, setManagerName] = useState();
    const [dateOfJoin, setDateOfJoin] = useState();

    useEffect(() => {
        // To retrieve the associate details from the database
        axios.get(`http://192.168.43.110:8088/api/VacationTracker/getProfileData/${associateId}`)
            .then(res => {
                setAssociateName(res.data.associateName);
                setDesignation(res.data.designation);
                setManagerName(res.data.managerName);
                setDateOfJoin(res.data.dateOfJoin);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>

            {/* Header component */}
            <View >
                <Header title="My Profile" />
            </View>

            {/* Associate details     */}
            <View style={Styles.basicLayout}>
                <View style={Styles.FieldLayout}>
                    <Text style={Styles.FieldName}>Associate ID</Text>
                    <TextInput style={Styles.FieldValue} value={associateId} />
                </View>

                <View style={Styles.FieldLayout}>
                    <Text style={Styles.FieldName}>Associate Name</Text>
                    <TextInput style={Styles.FieldValue} value={associateName} />
                </View>

                <View style={Styles.FieldLayout}>
                    <Text style={Styles.FieldName}>Designation</Text>
                    <TextInput style={Styles.FieldValue} value={designation} />
                </View>

                <View style={Styles.FieldLayout}>
                    <Text style={Styles.FieldName}>Manager Name</Text>
                    <TextInput style={Styles.FieldValue} value={managerName} />
                </View>

                <View style={Styles.FieldLayout}>
                    <Text style={Styles.FieldName}>Date of Join</Text>
                    <TextInput style={Styles.FieldValue} value={dateOfJoin} />
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create(
    {
        basicLayout: {
            marginTop: 10,
            backgroundColor: 'white',
            width: '100%',
        },
        FieldLayout: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 2,
            width: '85%',
            marginLeft: 30,
            height: '15%'
        },
        FieldName: {
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 10
        },
        FieldValue: {
            fontSize: 16,
            marginRight: 10
        },
    }
);