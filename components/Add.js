import React, {useState, useEffect} from 'react';
import { Pressable, StyleSheet, Text, View, TextInput, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SelectLabelModal from './SelectLabelModal';

import TaskNote from './TaskNote'
// Database
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export default function Add({ route,navigation }) {
 
    let data = {Title:'', text:'', Label:{id:null,color:null,name:null}};
    
    if(route.params){
        const { Note } = route.params;
        const type = (Note.type==="Note")?0:1
        data = {Title:Note.title, text:Note.note, Label:Note.label, Type:type}
    }

    const [Title, setTitle] = useState(data.Title)
    const [text, setText] = useState(data.text)
    const [Labels, setLabels] = useState([]);
    const [Label, setLabel] = useState({id:data.Label.id,name:data.Label.name,color:data.Label.color});
    const [modalVisible, setModalVisible] = useState(false);
    const [Type, setType] = useState(data.Type)
    // false: note
    // true : task
    const [tasks, setTasks] = useState([])    

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
              if(Label.id===null)setLabel(labelsList[0])
            }
            );
          },
          (err)=>console.log(err),
          null
        );
    }

    const addNote = () => {

        let type = 'Note';
        let note = text;

        if(Type===true){
            type = 'Task';
            note = JSON.stringify(tasks)
        }

        db.transaction((tx) => {
            tx.executeSql("INSERT into Notes (type, title, note, date, label_id) values (?, ?, ?, ?, ?)",[type,Title,note,'Dec 21, 2021',Label.id])
            },
            (err)=>console.log(err),
            ()=>console.log('Done')
        );
        navigation.push('Home');
    }

    useEffect(() => {
        fetch();
    }, []);

    return(
        <SafeAreaView style={[styles.container, {backgroundColor:'#303030'}]}>

            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
                <SelectLabelModal setModalVisible={setModalVisible} Labels={Labels} Label={Label} setLabel={setLabel}/>
            </Modal>

            <View style={styles.titleBar}>
                <View style={{flexDirection:'row'}}>
                    <Pressable style={styles.btn} onPress={()=>navigation.push('Home')}>
                        <Icon name='left' size={25} style={styles.icon}/>
                    </Pressable>
                    {Label!=='' &&
                        <View style={styles.labelWrapper}>
                            <View style={[styles.labelCard,{backgroundColor:Label.color}]}>
                                <Icon2 name='pricetag-outline' size={24} style={styles.labelIcon}/>
                                <Text style={styles.labelText}>{Label.name}</Text>
                            </View>
                        </View>
                    }
                </View>

                <View style={{flexDirection:'row'}}>
                {(Type === false) 
                    ?
                    <Pressable style={[styles.btn,{marginRight:5}]} onPress={()=>{setType(!Type);}}>
                        <FontAwesome5 name='tasks' size={24} style={styles.icon}/>
                    </Pressable>
                    :
                    <Pressable style={[styles.btn,{marginRight:5, backgroundColor:'#ccc'}]} onPress={()=>{setType(!Type);}}>
                        <FontAwesome5 name='tasks' size={24} style={{color:'#303030'}}/>
                    </Pressable>
                }
                    <Pressable style={styles.btn} onPress={()=>addNote()}>
                        <Icon name='save' size={28} style={styles.icon}/>
                    </Pressable>
                </View>
            </View>

            <View style={styles.Notepad}>
                <TextInput placeholderTextColor='#ccc' maxLength={15} value={Title} placeholder='Untitled' onChangeText={(text)=>setTitle(text)} style={styles.NoteTitle}/>
                <Text style={styles.date}>December 22, 2021</Text>

                {Type===false 
                    ?
                    <TextInput multiline editable value={text} placeholder='Note' onChangeText={(text)=>setText(text)} style={styles.Note} placeholderTextColor='#ccc'/>
                    :
                    <TaskNote tasks={tasks} setTasks={setTasks}/>
                }
            </View>

            {/* <View style={styles.bottomBar}>
                <Pressable style={[styles.btn,{marginRight:5}]} onPress={()=>{setModalVisible(!modalVisible);}}>
                    <Icon name='delete' size={24} style={styles.icon}/>
                </Pressable>
                <Pressable style={styles.btn} onPress={()=>{setModalVisible(!modalVisible);}}>
                    <Icon2 name='pricetag-outline' size={24} style={styles.icon}/>
                </Pressable>
            </View> */}
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBar:{
        paddingHorizontal:10,
        paddingVertical:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    title:{ 
        color:'#000',
        fontSize:24,
        fontWeight:'bold',
        flexGrow:1
    },
    NoteTitle:{
        // backgroundColor:'red',
        marginLeft:15,
        marginVertical:5,
        color:'#ccc',
        fontSize:24,
        fontWeight:'bold',
    },
    Notepad:{
        flexGrow:1,
    },
    Note:{        
        // backgroundColor:'red',
        paddingVertical:10,
        marginLeft:15,
        marginVertical:0,
        fontSize:18,
        color:'#ccc',
    },
    date:{
        // backgroundColor:'red',
        marginLeft:15,
        marginVertical:0,
        fontSize:16,
        color:'#808080',
        fontWeight:'bold',
    },
    btn:{
        backgroundColor:'#505050',
        padding:10,
        borderRadius:15
    },
    btnText:{
        color:'#ff3830',
        fontWeight:'bold',
        fontSize:16,
    },
    btnOutline:{
        padding:10,
    },
    icon:{
        color:'#ccc',
    },
    labelWrapper:{
        alignItems:'center',
        flexDirection:'row',
        marginLeft:10,
    },
    labelCard:{
        paddingVertical:5,
        paddingHorizontal:10,
        flexDirection:'row',
        borderRadius:10,
        alignItems:'center'
    },
    labelText:{
        color:'#303030',
        fontWeight:'bold',
        fontSize:24,
    },
    labelIcon:{
        color:'#303030', 
        marginRight:5
    },
    bottomBar:{
        flexDirection:'row',
        margin:15,
    },
    circle:{
        width:20,
        height:20,
        backgroundColor:'crimson',
        borderRadius:12,
        marginRight:15,
    },
    
});
