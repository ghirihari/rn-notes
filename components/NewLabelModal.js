import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';

export default function NewLabelModal(props) {

    const [Name, setName] = useState('');

    const colors = ['#feab90','#ffcc80','#e7ee9a','#80dfeb','#a690df']
    const [Color,setColor] = useState('')

    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalInput}>
            <Text style={styles.Modaltitle}>Create New label</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text)=>{setName(text)}}
              placeholder="Name"
            />
          </View>
          <View style={styles.modalInput}>
            <Text style={styles.Modaltitle}>Select Color</Text>
            <View style={styles.colorPalette}>
              {colors.map(
                (item,index)=>{
                  if(Color === item)
                    return <Pressable key={index} style={[styles.color,{backgroundColor:item,borderWidth:2, borderColor:'#505050'}]}></Pressable>
                  else 
                    return <Pressable key={index} style={[styles.color,{backgroundColor:item}]} onPress={()=>setColor(item)}></Pressable>
                }
              )}
            </View>
        
          </View>

          <View style={styles.buttonCont}>
            <Pressable style={[styles.button,{backgroundColor:'#fc594d'}]} onPress={() => props.setModalVisible((modalVisible)=>!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button,{backgroundColor:'#16a8e2'}]} onPress={() => {props.addLabel(Name,Color); }}>
              <Text style={styles.textStyle}>Save</Text>
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
  }

});
