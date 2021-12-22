import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';
import CategoryItem from './CategoryItem';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import NewLabelModal from './NewLabelModal';
import EditLabelModal from './EditLabelModal';

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export default function Category({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [EditModalVisible, setEditModalVisible] = useState(false);
  const [Label, setLabel] = useState(null);
  const [Labels, setLabels] = useState([]);

  const fetch = () =>{
    db.transaction(
      (tx) => {
        tx.executeSql("select * from Labels", [], (_, { rows }) => {
          let labelsList = [];
          for(let i in rows['_array']){
            let data = rows['_array'][i]
            labelsList = [...labelsList,{id:data.id, name:data.name, color:data.color}]
          }
          setLabels(labelsList)
        }
        );
      },
      (err)=>console.log(err),
      null
    );
  }

  const addLabel = (a, b) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into Labels (name, color) values (?, ?)", [a, b]);
      },function (error){
        console.log(error);
      },
      function(){
        console.log("Success");
      });
      fetch();
      setModalVisible(false)
  }

  const deleteLabel = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Labels WHERE id = ? ', [id],
        (txObj, resultSet) => {
          fetch();
        })
    })
}

  const OpenEditModal = (item) => {
    setLabel(item)
    setEditModalVisible(true);

  }

  const MoveToLabel = (item) => {
    navigation.navigate('Label',{label:item});
  }

  const updateLabel = (id,name,color) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE Labels SET name = ?, color = ? WHERE id = ?', [name,color,id],
        (txObj, resultSet) => {
          fetch();
        })
    })
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.titleBar}>
            <Pressable style={styles.btn} onPress={()=>navigation.toggleDrawer()}>
                <Icon name='menu' size={25} style={styles.icon}/>
            </Pressable>
            <Text style={styles.title}>Labels</Text>
            <Pressable style={styles.btn}>
                <Icon name='search' size={25} style={styles.icon}/>
            </Pressable>
        </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible);}}>
          <NewLabelModal setModalVisible={setModalVisible} addLabel={addLabel}/>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={EditModalVisible}
        onRequestClose={() => {setEditModalVisible(!EditModalVisible);}}>
          <EditLabelModal setModalVisible={setEditModalVisible} deleteLabel={deleteLabel} updateLabel={updateLabel} label={Label}/>          
      </Modal>

      <Pressable style={styles.newLabelWrapper} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.newLabel}>+ Create new label</Text>
      </Pressable>

      {/* List of Tasks */}
      <View style={styles.categoryList}>
        {Labels.map((item)=>{
          return  <CategoryItem 
                    key={item.id} 
                    item={item}
                    text={item.name} 
                    color={item.color}
                    onPressed={MoveToLabel}
                    LongPressed={OpenEditModal}
                  /> 
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    height:'100%', 
    backgroundColor:'#303030'
  },
  titleBar:{
    paddingHorizontal:10,
    paddingVertical:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  title:{
      paddingHorizontal:10,
      color:'#ddd',
      fontSize:24,
      fontWeight:'bold',
  },
  icon:{
      color:'#ccc'
  },
  btn:{
      backgroundColor:'#505050',
      padding:10,
      borderRadius:15
  },
  categoryList:{
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'center',   
      marginHorizontal:10,
  },
  newLabelWrapper:{
    backgroundColor:'#505050',
    marginHorizontal:10,
    justifyContent:'center',
    alignItems:'center',
    height:50,
    borderRadius:10,
    marginBottom:10,
  },
  newLabel:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width:'80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5
  },
  buttonCont:{
    flexDirection:'row',
  },  
  button: {
    marginTop:10,
    marginHorizontal:5,
    width:'48%',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input:{
    marginBottom:20,
    borderWidth:1,
    borderColor:'#ccc',
    padding:10,
    width:'100%',
    borderRadius:10,
  },
  Modaltitle: {
    fontSize:16,
    fontWeight:'bold',
    color:'black',
    marginBottom:5
  },
  modalInput:{
    width:'100%',
    marginBottom:5,
  },
  colorPalette:{
    flexDirection:'row',
    justifyContent:'center'
  },
  color:{
    marginHorizontal:5,
    width:35,
    height:35,
    backgroundColor:'red',
    borderRadius:20,
  }

});
