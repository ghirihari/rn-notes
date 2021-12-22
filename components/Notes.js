import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Pressable, Modal, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// Database
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

// Components
import NoteItem from './NoteItem';
import NewModal from './NewModal';
import DeleteModal from './DeleteModal';

export default function Notes({ navigation }) {

    const [Notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [DelmodalVisible, setDelModalVisible] = useState(false);

    const fetch = () =>{
        db.transaction(
          (tx) => {
            tx.executeSql("select Notes.id, title, note, date, label_id, labels.name as label_name, labels.color as label_color from Notes INNER JOIN labels ON labels.id = Notes.label_id", [], (_, { rows }) => {
              let NotesList = [];
              for(let i in rows['_array']){
                let data = rows['_array'][i]
                NotesList = [...NotesList,{
                    id:data.id, 
                    title:data.title, 
                    note:data.note, 
                    date:data.date, 
                    label:{id:data.label_id,name:data.label_name, color:data.label_color},
                }]
              }
              setNotes(NotesList);
            }
            );
          },
          (err)=>console.log(err),
          null
        );
    }

    const deleteNote = (item) => {
        console.log(item)
    }
 
    useEffect(() => {
        fetch();
    }, []);

    const navigate = (route) => {
        navigation.navigate(route);
    }

    const navigateWithData = (route,data) => {
        navigation.navigate(route,data);
    }

    return(
        <SafeAreaView style={{height:'100%', backgroundColor:'#303030'}}>

        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <NewModal setModalVisible={setModalVisible} navigate={navigate}/>
        </Modal>

        <Modal
            animationType="fade"
            transparent={true}
            visible={DelmodalVisible}
            onRequestClose={() => {setDelModalVisible(!DelmodalVisible);}}>
            <DeleteModal setModalVisible={setDelModalVisible}/>
        </Modal>

            <View style={styles.titleBar}>
                <Pressable style={styles.btn} onPress={()=>navigation.toggleDrawer()}>
                    <Icon name='menu' size={25} style={styles.icon}/>
                </Pressable>
                <Text style={styles.title}>Notes</Text>
                <Pressable style={styles.btn}>
                    <Icon name='search' size={25} style={styles.icon}/>
                </Pressable>
            </View>
            <ScrollView>
                <View style={styles.noteWrapper}>
                    {Notes.map((item)=>{
                        return(
                            <NoteItem 
                                key={item.id} 
                                item={item} 
                                navigate={navigateWithData} 
                                deleteModal={setDelModalVisible}
                                deleteNote={deleteNote}
                            />  
                        )
                    })}
                </View>
            </ScrollView>

            {/* Add Notes Button */}
            <TouchableOpacity style={styles.floatingBtn} onPress={()=>{setModalVisible(true)}}>
                <View  style={styles.addWrapper}>
                    <Icon name='add' size={30} style={styles.icon}/>
                </View>
            </TouchableOpacity>
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
    titleBar:{
        paddingHorizontal:10,
        paddingVertical:10,
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
    noteWrapper:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        marginHorizontal:10
    }, 
    addWrapper:{
        width:50,
        height:50,
        backgroundColor:'#505050',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    },
    addText:{
        fontSize:30,
        color:'white'
    },
    floatingBtn:{
        position:'absolute',
        right:20,
        bottom:15    
    },
    icon:{
        color:'#ccc'
    },
    btn:{
        backgroundColor:'#505050',
        padding:10,
        borderRadius:15
    },
});
