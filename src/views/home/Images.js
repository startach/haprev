import React, { Component } from 'react';
import { View, Text, Image, FlatList,StyleSheet, Dimensions,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
    
const ParticipantItem = ({item, index, imagesLength}) => {
    console.log('index:',index, imagesLength);
    return (
        <View>
            <Image style={styles.image} source={{uri: item.imgUrl}}/>
            <LinearGradient
            colors={['#C2185B','#fff', '#fff']}
            style={styles.gradientLine}
            start={[0, 0]}
            end={[0, 0.8]}
            >
                {index!=0 ?
                <Text style={styles.arrow}>›</Text>
                :
                <Text/>
                }
                <Text style={styles.imageTitle}>{item.title}</Text>
                {imagesLength != index+1 ?
                <Text style={styles.arrow}>‹</Text>
                :
                <Text/>
                }
            </LinearGradient>
        </View>)
}

class Images extends Component {
    state = {  }
    render() { 
        const {images} = this.props;
        const imagesLength = images.length
        return (
            images[0] ?
            <View style={styles.container}>
                <FlatList 
                horizontal
                data={images}
                renderItem={({item,index}) => <ParticipantItem 
                item={item}
                index={index}
                imagesLength={imagesLength}
                />}
                keyExtractor={(item,index) => index}
            />
            </View>
            :
            <View style={{justifyContent:'center'}}>
                <ActivityIndicator size='large' color='#C2185B'/>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#C2185B',
        alignItems: 'center',
        height:Dimensions.get('screen').height/3,
        position:"relative",
    },
    image:{
        flex: 1,
        width:Dimensions.get('screen').width*0.9,
        borderRadius: 1,
        borderColor: '#fff',
    },
    gradientLine:{
        width:"100%",
        height:"13%",
        position: "absolute",
        opacity:0.75,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderTopLeftRadius:1,
        borderTopRightRadius:1,
    },
    imageTitle:{
        color: '#C2185B',
        fontSize: 15,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingHorizontal:15,
        color: '#C2185B',
    },
})

export default Images;