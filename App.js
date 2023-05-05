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
      isLoading: true
    }
  }

  componentDidMount(){
    this.loadEnseignant
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
  
  editEnseignant = async(id) => {
    this.props.navigation.navigate('Modification Enseignant');

  }

  removeEnseignant = async id => {
    try {
      await fetch(`\${API_URL}/\${id}`, { method: 'DELETE' });
      setEnseignant(enseignants => enseignants.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  loadPrestationTotal = async () => {
    try {
      const response = await fetch(API_URL/total);
      const dataSource = await response.json();
      setPrestation(dataSource);
    } catch (error) {
      console.error(error);
    }
  }

  onRefresh = async () => {
    setRefreshing(true);
    await loadEnseignant();
    setRefreshing(false);
  }

  ItemSepartor = FlatList;
  ItemSepartor = () => {
    return (
      <View style={{height: .2, width: '100%', backgroundColor:'#000'}}/>
    )
  }

  

  render () {
    if (this.state.isLoading){
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View>
        <View>
            <TouchableOpacity onPress={() => this.addEnseignant()}>
                <Text>Ajouter</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <FlatList 
              data = {dataSource}
              ItemSeparatorComponent={this.ItemSepartor}
              renderItem={({item}) => 
                <Text style={styles.FlatListItemStyle} onPress={this.getEnseignant.bind(this, item.enseignant.id)}>{item.nom_enseignant}</Text>
            }
              keyExtractor={(item, index) => index }
              />
            <Text style={{ hidden: true }}>{item.id}</Text>
            <Text>{item.matricule}</Text>
            <Text>{item.nom_enseignant}</Text>
            <Text>{item.taux_horaire}</Text>
            <Text>{item.nb_heure}</Text>
            <TouchableOpacity onPress={() => this.editEnseignant(item.id)}>
                <Text>Modifier</Text>
             </TouchableOpacity>
            <TouchableOpacity onPress={() => this.removeEnseignant(item.id)}>
                <Text>Supprimer</Text>
            </TouchableOpacity>
        </View>
      </View>
      
    )
  }

}

class AddEnseignantActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
}

class EditEnseignantActvity extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
