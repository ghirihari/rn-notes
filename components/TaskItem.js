import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const rightSwipeActions = () => {
return (
    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center' }}></View>
);
};

const swipeFromRightOpen = (props) => {
props.deleteItem(props.data)
};

const TaskItem = (props) => {
    return (
        <Swipeable 
            renderRightActions={rightSwipeActions}
            onSwipeableRightOpen={()=>swipeFromRightOpen(props)}
            >
            <TouchableOpacity style={styles.item} onPress={()=>props.markItem(props.data)}>
                {props.data.done===1 
                    ?   
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.circleDone}></View>
                        <Text style={styles.taskDone}>{props.data.text}</Text>
                    </View>
                    :   
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.circle}></View>
                        <Text style={styles.task}>{props.data.text}</Text>
                    </View>
                }
            </TouchableOpacity>
        </Swipeable>
        )
}

const styles = StyleSheet.create({
    item:{
        marginHorizontal:5,
        backgroundColor:'#ddd',
        paddingVertical:25,
        paddingHorizontal:20,
        borderRadius:20,
        marginVertical:5,
        flexDirection:'row',
        alignItems:'center',
        elevation:1
    },
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
    task:{
        fontSize:16,
        color:'black',
    },   
    taskDone:{
        fontSize:16,
        textDecorationLine:'line-through',
        color:"#808080",
        fontStyle:'italic'
    },
});

export default TaskItem
