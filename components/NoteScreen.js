import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NoteScreen({ route, navigation }) {
    const { note } = route.params;
    
    return(
        <SafeAreaView>
            {/* <View style={[styles.titleBar,{backgroundColor:label.color}]}>
                <Text style={styles.title}>{label.name}</Text>
            </View> */}
            <Text>{label}</Text>
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:10
    },
    titleBar:{
        padding:20,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'#fff',
        fontSize:24,
        fontWeight:'bold',
    }
});
