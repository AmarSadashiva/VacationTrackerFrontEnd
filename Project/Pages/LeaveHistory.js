import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import ButtonType from '../Components/Button';

export default function LeaveHistory({ navigation, route }) {

  // hooks to store the table details
  const [tableHead, setTableHead] = useState(['Serial number', 'AssociateId', 'Vacation type', 'Start date', 'End date', 'Description', 'Status']);
  const [widthArr, setWidthArray] = useState([60, 90, 80, 80, 80, 100, 80,]);
  const [tableData, setTableData] = useState([[]]);
  // hook to store the associate id whose vacation details need to be viewed
  const [selectedAssociateId, setSelectedAssociateId] = useState();

  const associateId = route.params.id.associateId;
  const allAssociateRequests = route.params.allAssociateRequests;

  const handleAssociateId = (value) => {
    setSelectedAssociateId(value);
  }



  // To retrieve the vacation details of the selected associated and to add those details to the table
  const handleSubmit = () => {
    axios.get(`http://192.168.43.110:8088/api/VacationTracker/getVacationHistory/${selectedAssociateId}`)
      .then(res => {
        const tableData1 = [];
        for (let i = 0; i < res.data.length; i += 1) {
          const rowData = [];
          rowData.push(`${i + 1}`);
          rowData.push(res.data[`${i}`].associateID);
          rowData.push(res.data[`${i}`].vacationType);
          rowData.push(res.data[`${i}`].startDate);
          rowData.push(res.data[`${i}`].endDate);
          rowData.push(res.data[`${i}`].description);
          rowData.push(res.data[`${i}`].leaveStatus);
          tableData1.push(rowData);
        }
        setTableData(tableData1);
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  // To retrieve the vacation details of the manager and to add those details to the table
  const handleManagerRequests = () => {
    axios.get(`http://192.168.43.110:8088/api/VacationTracker/getVacationHistory/${associateId}`)
      .then(res => {
        const tableData1 = [];
        for (let i = 0; i < res.data.length; i += 1) {
          const rowData = [];
          rowData.push(`${i + 1}`);
          rowData.push(res.data[`${i}`].associateID);
          rowData.push(res.data[`${i}`].vacationType);
          rowData.push(res.data[`${i}`].startDate);
          rowData.push(res.data[`${i}`].endDate);
          rowData.push(res.data[`${i}`].description);
          rowData.push(res.data[`${i}`].leaveStatus);
          tableData1.push(rowData);
        }
        setTableData(tableData1);
      })
      .catch(err => {
        console.log(err.message);
      })
  }


  return (
    <View style={styles.container}>
      {/* conditional rendering of the view to select the associate id whose details need to be viewed
      * The view is rendered only if the associate is a manager
      */}
      {allAssociateRequests === true ?
        <View>
          <View style={styles.input}>
            <Text style={styles.textAssociateID}>AssociateID</Text>
            <TextInput style={styles.inputText} placeholder='AssociateID' value={selectedAssociateId} onChangeText={handleAssociateId} />
          </View>
          <View style={styles.submitButton} >
            <ButtonType name='submit' onPress={handleSubmit} />
          </View>
        </View>
        : [handleManagerRequests()]}

      <ScrollView horizontal={true}>
        {/* View to store table heaers */}
        <View>
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
            <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
          </Table>
          {/* Scrollable view to display the table rows */}
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {
                tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                    textStyle={styles.text}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 60, backgroundColor: '#E7E6E1' },
  input: { flexDirection: 'row', justifyContent: 'space-evenly' },
  inputText: { borderWidth: 1, flex: 0.8, marginBottom: 1, alignItems: 'center', paddingTop: 1, paddingLeft: 12, },
  textAssociateID: { marginBottom: 1, alignItems: 'center', paddingTop: 5, fontWeight: 'normal', fontSize: 18 },
  submitButton: { width: '40%', marginLeft: 120, borderRadius: 50 }
});