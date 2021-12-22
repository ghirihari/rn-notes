import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, View} from 'react-native';

export default function CategoryItem(props) {
    if(props.text==='None')
        return(
            <Pressable style={[styles.card,{backgroundColor:props.color}]}>
                <Text style={styles.title}>{props.text}</Text>
                <Text style={styles.time}>Yesterday</Text>
                {/* <Text style={styles.completed}>3 of 4</Text> */}
            </Pressable>
        )
    else   
        return(
            <Pressable onLongPress={()=>props.LongPressed(props.item)} onPress={()=>props.onPressed(props.item)} style={[styles.card,{backgroundColor:props.color}]}>
                <Text style={styles.title}>{props.text}</Text>
                <Text style={styles.time}>Yesterday</Text>
                {/* <Text style={styles.completed}>3 of 4</Text> */}
            </Pressable>
        )
    
}

const styles = StyleSheet.create({
    card:{
        width:'47%',
        borderRadius:15,
        marginBottom:10,
        marginRight:10,
        padding:15,
        justifyContent:'center'
    },
    title:{
        color:'#303030',
        fontSize:24,
        fontWeight:'bold',
        // textShadowColor: '#808080', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5,
    },
    time:{
        color:'#303030',
        opacity:0.6,
        fontSize:14,
        marginTop:5,
        fontWeight:'bold',
        // textShadowColor: '#808080', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5,
    },
    completed:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        marginVertical:10,
        // textShadowColor: '#808080', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5,
    },
});
