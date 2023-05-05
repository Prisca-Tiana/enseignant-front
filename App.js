import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TextInput, Button, 
  Plateform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Component } from 'react';
import { StackNavigator } from 'react-native';

const API_URL = '10.10.0.2:8000/api/enseignants';

class MainActivity extends Component {
  static navigationOptions = {
    title : 'Enseignant',
  }

  constructor(props){
    super(props)
    this.state = {
      // ato no asiana ny élément
    }
  }

  loadEnseignant = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEnseignant(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  addEnseignant = async() => {
    this.props.navigation.navigate('Ajout Enseignant');
  }
  
  editEnseignant = async() => {
    this.props.navigation.navigate('Modification Enseignant');

  }

  loadPrestationTotal = async () => {
    try {
      const response = await fetch(API_URL/total);
      const data = await response.json();
      setPrestation(data);
    } catch (error) {
      console.error(error);
    }
  }

  onRefresh = async () => {
    setRefreshing(true);
    await loadEnseignant();
    setRefreshing(false);
  }
  
}

const persons = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];

const PersonList = () => {
  const renderItem = ({ item }) => <Text>{item.name}</Text>;

  return (
    <View>
      <FlatList
        data={persons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PersonList;
