import React, {useEffect} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Database
import * as SQLite from "expo-sqlite";

// Componentes
import Task from './components/Task';
import Category from './components/Category';
import LabelScreen from './components/LabelScreen';
import Notes from './components/Notes';
import Add from './components/Add';
import NoteScreen from './components/NoteScreen';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const db = SQLite.openDatabase("db.db");

const createTable = () => {
  db.transaction((tx) => {
      tx.executeSql("create table if not exists Notes (id integer primary key autoincrement, title text, note text, date text, label_id integer, FOREIGN KEY(label_id) REFERENCES Labels(id));");
      tx.executeSql("create table if not exists Labels (id integer primary key autoincrement, name text, color text);")
    },
    (err)=>console.log(err),
    ()=>console.log('success')
  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

CategoryStack = () => {
  return(
    <Stack.Navigator initialRouteName="Category List" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Category List" component={Category} />
      <Stack.Screen name="Label" component={LabelScreen} />
    </Stack.Navigator>
  )
}

const NotesStack = () => {
  return(
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Notes} />
        <Stack.Screen name="Note" component={NoteScreen} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Task" component={Task} />
    </Stack.Navigator>
  )
}

export default function App() {

  useEffect(() => {
    createTable();
  //   db.transaction((tx) => {
  //     tx.executeSql("INSERT into Notes (title, note, date, label_id) values (?, ?, ?, ?)",['Test Title 2','This is the second test note.','Dec 21, 2021',2])
  //   },
  //   (err)=>console.log(err),
  //   ()=>console.log('Done')
  // );
  }, []);

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Notes" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Notes" component={NotesStack} />
            <Drawer.Screen name="Labels" component={CategoryStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
});

