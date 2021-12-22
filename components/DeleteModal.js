import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DeleteModal(props) {

    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <View style={styles.modalInput}>
                <Text style={styles.Modaltitle}>Delete this Note?</Text>
            </View>
            
            <View style={{marginTop:10, flexDirection:'row'}}>
                <Pressable style={[styles.btn,{backgroundColor:'#ddd'}]} onPress={() => props.setModalVisible((modalVisible)=>!modalVisible)}>
                    <Text style={[styles.textStyle,{color:'#505050'}]}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.btn,{backgroundColor:'#fc3d39'}]} onPress={() => props.setModalVisible((modalVisible)=>!modalVisible)}>
                    <Text style={[styles.textStyle,{color:'#fff'}]}>Yes</Text>
                </Pressable>
            </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  modalView: {
    width:'80%',
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
},

  buttonCont:{
    flexDirection:'row',
  },  
  button: {
    justifyContent:'center',
    alignItems:'center',
    flexGrow:1,
    height:100,
    marginTop:5,
    marginHorizontal:3,
    borderRadius: 10,
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
    marginBottom:5,
    borderWidth:1,
    borderColor:'#ccc',
    padding:10,
    width:'100%',
    borderRadius:10,
  },
  Modaltitle: {
    alignSelf:'center',    
    fontSize:18,
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
    justifyContent:'space-around',
    marginTop:10,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:10,
    borderColor:'#ddd',
    borderWidth:1
  },
  color:{
    marginHorizontal:5,
    width:35,
    height:35,
    backgroundColor:'red',
    borderRadius:20,
  },
  icon:{
      color:'white',      
      marginBottom:5
  },
    btn: {
        flexGrow:1,
        marginTop:5,
        marginHorizontal:3,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
});
