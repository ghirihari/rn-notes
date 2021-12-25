import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Task = (props) => {
    return (
        <View style={{marginHorizontal:15,marginBottom:10, backgroundColor:'#404040', paddingVertical:15, paddingHorizontal:15, borderRadius:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={styles.circle}></View>
                <TextInput style={{fontSize:15, color:'white', flexGrow:1}} placeholderTextColor='#808080' placeholder='Name' value={props.data.text}/>
            </View>
        </View>
    )
}

const TaskNote = (props) => {

    const [task, setTask] = useState('');

    const NewItem = () => {
        props.setTasks([...props.tasks,{id:props.tasks.length+1,text:task,done:0}])
    } 

    return (
        <View style={{flex:1}}>
            {/* <View> */}
                <FlatList
                    data={props.tasks}
                    keyExtractor={(item) => item.id}
                    style={{marginTop:15}}
                    renderItem={(item) => <Task key={item.item.id} data={item.item}/>}
                />
            {/* </View> */}
 
 
            <View style={{marginHorizontal:15,marginBottom:10, backgroundColor:'#ddd', borderRadius:20}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput value={task} onChangeText={(text)=>setTask(text)} style={{fontSize:15, color:'black', flexGrow:1, paddingVertical:0, paddingHorizontal:15}} placeholderTextColor='#808080' placeholder='Name'/>
                    <TouchableOpacity onPress={()=>{NewItem()}} style={{backgroundColor:'crimson', paddingVertical:10, paddingHorizontal:15, borderTopRightRadius:20, borderBottomRightRadius:20}}>
                        <Icon name='add' size={30} color='#fff'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
    circle:{
        width:20,
        height:20,
        backgroundColor:'crimson',
        borderRadius:12,
        marginRight:15,
    },
    circleDone:{
        width:20,
        height:20,
        backgroundColor:'#505050',
        opacity:0.5,
        borderRadius:12,
        marginRight:15,
    },
    inputBar:{
        flexDirection:'row',
        width:'100%',
        paddingHorizontal:10,
        justifyContent:'space-between',
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

export default TaskNote
