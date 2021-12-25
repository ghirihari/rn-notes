import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, View} from 'react-native';

export default function NoteItem(props) {
    if(props.item.type==='Note')
    return(
        <Pressable style={[styles.note,{backgroundColor:props.item.label.color}]} onLongPress={()=>{props.deleteModal(true)}} onPress={()=>{props.navigate('Add',{Note:props.item})}}>
            <Text style={styles.noteTitle}>{props.item.title}</Text>
            <Text style={styles.noteText}>{props.item.note}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                <Text style={styles.noteDate}>{props.item.label.name}</Text>
                <Text style={styles.noteDate}>{props.item.date}</Text>
            </View>
        </Pressable>
    )
    else{
        let Task = JSON.parse(props.item.note)
        let Done = 0;
        let Undone = Task.length;

        for( let i in Task){
            if(Task[i].done === 1)Done+=1;
        }


        return(
            <Pressable style={[styles.note,{backgroundColor:props.item.label.color}]} onLongPress={()=>{props.deleteModal(true)}} onPress={()=>{props.navigate('Add',{Note:props.item})}}>
                <Text style={styles.noteTitle}>{props.item.title}</Text>
                    <Text style={styles.noteTask}>{Done+'/'+Undone+' Done'}</Text>                    

                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                        <Text style={styles.noteDate}>{props.item.label.name}</Text>
                        <Text style={styles.noteDate}>{props.item.date}</Text>
                    </View>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    // noteCont:{
    //     flexGrow:1,
    //     margin:5,
    //     flexDirection:'column',
    // },
    note:{
        margin:5,
        flexGrow:1,
        padding:10,
        borderRadius:10,
        flexDirection:'column',
        justifyContent:'space-between',
    },
    noteTitle:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:5
    },
    noteText:{
        fontSize:16,
        opacity:0.8,
    },
    noteDate:{
        opacity:0.3,
        fontWeight:'bold'
    },
    noteTask:{
        opacity:0.5,
        fontWeight:'bold'
    },
});
