import React, {useState,useEffect} from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import TaskItem from './TaskItem'; 

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export default function Task() {

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([
    // {id:'1',text:'Eat',done:1},
    // {id:'2',text:'Sleep',done:1},
    // {id:'3',text:'Conquer',done:0},
    // {id:'4',text:'Repeat',done:0}, 
    ])

  const fetchList = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from Tasks", [], (_, { rows }) => {
          // console.log(rows)
          let tasksList = [];
          for(let i in rows['_array']){
            let data = rows['_array'][i]
            tasksList = [...tasksList,{id:data.id, text:data.value, done:data.done}]
          }
          setTasks(tasksList)
        }
        );
      },
      (err)=>console.log(err),
      null
    );
  }

  useEffect(()=>{
    fetchList();
  },[])

  const addTask = () => {
    setText(null)
    Keyboard.dismiss();

    db.transaction(
      (tx) => {
        tx.executeSql("insert into Tasks (done, value) values (0, ?)", [text]);
      },null,null);
    fetchList();
  }

  const deleteItem = (item) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Tasks WHERE id = ? ', [item.id],
        (txObj, resultSet) => {
          fetchList();
        })
    })
  }

  const markItem = (item) => {

    console.log(item)
    var status = (item.done+1)%2;
    db.transaction(tx => {
      tx.executeSql('UPDATE Tasks SET done = ? WHERE id = ?', [status,item.id],
        (txObj, resultSet) => {
          fetchList();
        })
    })

  }

  return (
    <SafeAreaView style={styles.container}>
      {/* List of Tasks */}

      <View style={styles.wrapper}>
        <Text style={styles.title}>Today's Task</Text>
      </View>

        <View>
          <FlatList
               data={tasks}
               keyExtractor={(item) => item.id}
               renderItem={(item) => <TaskItem key={item.item.id} data={item.item} deleteItem={deleteItem} markItem={markItem}/>}
          />
        </View>

      {/* Add Tasks */}
      <KeyboardAvoidingView behavior='height' style={styles.inputBar}>
        <TextInput style={styles.inputField} placeholder='Write a task' value={text} onChangeText={(text)=>setText(text)}/>
        
        {/* Add Button */}
        <TouchableOpacity onPress={()=>addTask()}>
          <View  style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    marginHorizontal:5
  },
  wrapper:{
    marginHorizontal:10,
    paddingTop: 30,
    paddingHorizontal:0,
  },
  title: {
    fontSize:36,
    fontWeight:'bold',
    color:'black',
    marginBottom:20,
    marginLeft:10
  },
  button:
  {
    backgroundColor:'red',
    opacity:0.5,
  },
  floatingBtn:{
    position:'absolute',
    right:20,
    bottom:20
  },
  inputBar:{
    flexDirection:'row',
    position:'absolute',
    bottom:10,
    width:'100%',
    paddingHorizontal:10,
    justifyContent:'space-between',
    elevation:2
  },
  
  inputField:{
    backgroundColor:'#ddd',
    flexGrow:1,
    borderRadius:20,
    marginRight:10,
    textAlign:'center',
    borderWidth:1,
    borderColor:'#ccc',
    color:'white'
  },  

  addWrapper:{
    width:50,
    height:50,
    backgroundColor:'crimson',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
  },

  addText:{
    fontSize:30,
    color:'white'
  }
});
