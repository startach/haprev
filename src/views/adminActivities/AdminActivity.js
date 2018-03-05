import React, {Component} from 'react'
import {View, Text, Button, StyleSheet, FlatList} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-around',
    },
    h1:{
        textAlign:'center',
        fontSize:18,
        padding:10,
    },
    h2:{
        textAlign:'center',
        fontSize:16,
        paddingTop:30,
    },
    participantItem: {
        marginHorizontal: '10%',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopColor: '#333',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    img:{
        height: 40,
        width: 40,
        backgroundColor:'#080',
        margin: 5,
    },
    bottomButtons:{
        bottom:0,
    },
    button:{
        margin: 20
    }
})

const ParticipantItem = ({participant}) => {
    return <View style={styles.participantItem}>
        <View style={styles.img}></View>
        <Text>{participant.name}</Text>
    </View>
}

class AdminActivity extends Component
{
    state = {cancelDialogVisible: false};
    cancelActivity() {
        this.setState({cancelDialogVisible: false});
        console.log('cancel activity');
    };

    render() {
        const {params} = this.props.navigation.state;
        const activity = params ? params.activity : null;


        const toggleCancelDialog = () => this.setState({cancelDialogVisible: true})

        return (
            <View style={styles.container}>
                <Text style={styles.h2}> התנדבות {activity.date} </Text>
                <Text style={styles.h1}> לפעילות זו
                    רשומים {activity.participants ? activity.participants.length : 0} מתנדבים </Text>
                <FlatList data={activity.participants}
                          renderItem={({item}) => <ParticipantItem participant={item}/>}
                          keyExtractor={(item) => item.id}/>
                <View style={styles.bottomButtons}>
                    <Button style={styles.button} title="בטל התנדבות" onPress={toggleCancelDialog}/>
                </View>
                {/* <MaterialDialog
                    title="האם לבטל את ההתנדבות?"
                    visible={this.state.cancelDialogVisible}
                    onOk={() => this.cancelActivity()}
                    onCancel={() => this.setState({cancelDialogVisible: false})}
                    okLabel='בטל התנדבות'
                    cancelLabel='השאר התנדבות'
                    colorAccent='#00c'>
                    <View></View>
                </MaterialDialog> */}
            </View>
        )
    }
}

export default AdminActivity