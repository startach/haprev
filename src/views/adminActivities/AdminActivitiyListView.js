import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { adminActivityListStyle } from './styles'

const renderParticipantsText = (participants) => {
  if (!participants || participants.length === 0) { return 'לא נרשמו' }
  return participants.length + ' מתנדבים'
}
const renderCaptionText = (caption) => {
  if (caption.length > 17) { return caption.slice(0, 14) + '...' }
  return caption
}

const ActivityItem = ({ activity, index, openActivity, participants }) => {
  return <TouchableOpacity underlayColor='#fff' onPress={() => { openActivity(activity, participants[index]) }}>
    <View style={(index % 2 === 0) ? adminActivityListStyle.activityItemEven : adminActivityListStyle.activityItemOdd}>
      <Text style={[activity.fullFormatDate < new Date().toISOString() ? { color: '#E94B3C' } : { color: '#009B77' }, adminActivityListStyle.dateText]}>{activity.date}</Text>
      <Text>|</Text>
      <Text style={adminActivityListStyle.captionText}>{renderCaptionText(activity.caption)}</Text>
      <Text>|</Text>
      <Text style={adminActivityListStyle.participantsText}>{renderParticipantsText(participants[index])}</Text>
      <FontAwesome name='chevron-left' />
    </View>
         </TouchableOpacity>
}

getAvatar = (avatarUrl, navigation) => {
  if (avatarUrl) {
    return (<TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
      <Image style={adminActivityListStyle.userImage} source={{ uri: avatarUrl }} />
            </TouchableOpacity>)
  } else {
    return (<FontAwesome
      style={adminActivityListStyle.withoutImg} name='user-circle' size={65}
      onPress={() => { navigation.navigate('Profile') }}
            />)
  }
}

const AdminActivities = (props) => {
  const { events, participants, openEventView, createActivityView, firstName, lastName, avatarUrl, myHospital, navigation, onRefreshList, reload } = props
  return (
    <View style={{ flex: 1 }}>
      <View style={adminActivityListStyle.header}>
        {myHospital
          ? <TouchableOpacity
            underlayColor='#fff' style={adminActivityListStyle.syncButton}
            onPress={() => onRefreshList(true)}
          >
            <FontAwesome name='refresh' size={45} color='#009B77' />
            </TouchableOpacity>
          : null}
        {this.getAvatar(avatarUrl, navigation)}
        <Text style={adminActivityListStyle.h1}> {firstName + ' ' + lastName} </Text>
        <Text style={adminActivityListStyle.h2}> רכז ביה״ח {myHospital} </Text>
        {myHospital
          ? <TouchableOpacity
            underlayColor='#fff' style={adminActivityListStyle.plusButton}
            onPress={() => createActivityView(firstName, lastName)}
          >
            <FontAwesome name='plus-circle' size={50} color='#009B77' />
            </TouchableOpacity>
          : null}
      </View>
      {!reload
        ? <ScrollView horizontal={false}>
          <FlatList
            data={events}
            renderItem={({ item, index }) => <ActivityItem activity={item} index={index} participants={participants} openActivity={openEventView} />}
            keyExtractor={(item, index) => item.caption + index}
          />
          </ScrollView>
        : <ActivityIndicator size='large' color='#C2185B' />}
    </View>
  )
}

export default AdminActivities
