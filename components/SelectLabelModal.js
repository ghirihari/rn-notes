import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SelectLabelModal(props) {

    const [Label, setLabel] = useState({id:null, name:null, color:null});

    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <View style={styles.modalInput}>
            <Text style={styles.Modaltitle}>Select label</Text>
            </View>

            <View style={styles.labelWrapper}>
                {props.Labels.map((item)=>{
                    const selected = (Label.id===item.id)
                        ?{backgroundColor:item.color, borderColor:item.color, color:'black'}
                        :{borderColor:item.color};
                
                    const selectedText = (Label.id===item.id)
                        ?{color:'#151515'}
                        :{color:'#ddd'}

                    return(
                        <Pressable key={item.id} style={[styles.labelCard,selected]} onPress={()=>setLabel(item)}>
                            <Icon name='pricetag-outline' size={24} style={[styles.Icon,selectedText]}/>
                            <Text style={[styles.labelText, selectedText]}>{item.name}</Text>
                        </Pressable>
                    )
                })}
            </View>

          <View style={styles.buttonCont}>
            <Pressable style={[styles.button,{backgroundColor:'#505050'}]} onPress={() => props.setModalVisible((modalVisible)=>!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button,{backgroundColor:'#4cd964'}]} onPress={() => {props.setLabel(Label); props.setModalVisible((modalVisible)=>!modalVisible)}}>
              <Text style={styles.textStyle}>Select</Text>
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
        backgroundColor:'black',
        opacity:0.8
    },
    modalView: {
        width:'80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        backgroundColor:'#303030'
    },
    buttonCont:{
        flexDirection:'row',
        justifyContent:'flex-end',
    },  
    button: {
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
        textAlign: "center",   
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
        fontSize:16,
        fontWeight:'bold',
        color:'white',
        marginBottom:5
    },
    modalInput:{
        width:'100%',
        marginBottom:5,
    },
    labelWrapper:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginVertical:10,
        justifyContent:'flex-start'
    },
    labelCard:{
        padding:10,
        marginRight:5,
        borderRadius:10,
        flexDirection:'row',
        marginTop:5,
        justifyContent:'center',
        borderWidth:2
    },
    labelText:{
        color:'#ddd',
        fontWeight:'bold',
    },
    Icon:{
        fontSize:20,
        marginRight:2,
        color:'#ddd',
    }
});
