import React from 'react'
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native'

const aboutUsText1 = "מהפכה של שמחה מבית שלום לעם זו עמותה שפועלת בבתי חולים ברחבי הארץ. מתנדבי העמותה מגיעים לבתי החולים בשעות הערב ועוברים בין המחלקות השונות החל מילדים, מבוגרים ועד לקשישים. נכנסים לחדרים מנגנים למטופלים, שרים להם, מחלקים ממתקים ומדברים איתם במטרה להסיח את דעתם מהכאב ומהקושי, לשמח אותם ולהעלות חיוך על פניהם. והחיוך הזה שווה הכל. הידיעה שזכינו לתת להם רגעי אור ושמחה בתוך תקופת האשפוז נותנת למתנדבים סיפוק עצום. בנוסף לפעילות הרגילה בבתי החולים יוצאים מדי פעם גם לשמח ולהודות לחיילים ששומרים עלינו במעברים ובמחסומים."
const aboutUsText2 = "הפעילות מתקיימת בבתי חולים בירושלים, כפר סבא, פתח תקווה, חולון, רחובות, צפת, אשקלון, נתניה, חיפה, תל אביב, באר שבע, עפולה, ועוד."

class AboutUsView extends React.Component{
    render() {
        console.log('About Us View')
      return(
            <View style={styles.container}>
                <ScrollView horizontal={false}>
                <View>
                    <Image style={styles.picture} source={require('../../images/haprevLogo.png')} />
                    <Text style={styles.textStyle}>{aboutUsText1}</Text>
                    <Text style={styles.textStyle}>{aboutUsText2}</Text>
                    <Text style={styles.textStyle}></Text>
                </View>
                </ScrollView>  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#C2185B',
      paddingTop:10,
      flex:1,
    },
    picture:{
       width:80,
       height:80,
       alignSelf:'center',
    },
    textStyle:{
        margin: 15,
        marginBottom:7,
        marginTop:7,
        fontSize: 18,
        fontFamily: 'sans-serif',
        color:'#ffffff',
        textAlign: 'left',
    },
});

export default AboutUsView