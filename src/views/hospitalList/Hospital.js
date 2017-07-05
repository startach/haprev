import React,{Component} from 'react';
import {Card,CardItem,Body,Text} from 'native-base';
import { Image} from 'react-native';


class Hospital extends Component{
  render(){
    return (
      <Card  >
        <CardItem>
          <Body>
            <Image
              style={{width:50,height:50}}
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            />
            <Text>hospital name</Text>
          </Body>
        </CardItem>
      </Card>

    );
  }
}

export default Hospital;