import React from 'react'
import {View, Text, ScrollView, Image, TouchableOpacity, StyleSheet} from 'react-native'

const HapRevText1 = "מהפכה של שמחה מבית שלום לעם זו עמותה שפועלת בבתי חולים ברחבי הארץ. מתנדבי העמותה מגיעים לבתי החולים בשעות הערב ועוברים בין המחלקות השונות החל מילדים, מבוגרים ועד לקשישים. נכנסים לחדרים מנגנים למטופלים, שרים להם, מחלקים ממתקים ומדברים איתם במטרה להסיח את דעתם מהכאב ומהקושי, לשמח אותם ולהעלות חיוך על פניהם, החיוך הזה שווה הכל. הידיעה שזכינו לתת להם רגעי אור ושמחה בתוך תקופת האשפוז נותנת לנו - המתנדבים סיפוק עצום. בנוסף לפעילות הרגילה בבתי החולים יוצאים מדי פעם גם לשמח ולהודות לחיילים ששומרים עלינו במעברים ובמחסומים."
const HapRevText2 = "הפעילות מתקיימת בבתי חולים בירושלים, כפר סבא, פתח תקווה, חולון, רחובות, צפת, אשקלון, נתניה, חיפה, תל אביב, באר שבע, עפולה, ועוד."
const STARTACHText1 = "סטארטאח הינה עמותה ללא מטרות רווח המפתחת פתרונות טכנולוגיים למען הקהילה.\n מה אנחנו עושים? \nבחברה הישראלית פועלים מיזמים וארגונים רבים ששמים להם למטרה לפעול למען החברה בסיוע מערכי מתנדבים ופעילים.\nארגונים אלו נתקלים פעמים רבות בקשיים טכנולוגיים, דבר שמקשה עליהם להתארגן בצורה יעילה ולהגדיל את מרחב ההשפעה שלהם בחברה הישראלית."
const STARTACHText2 = "בסטארטאח אנו רותמים את נסיונם המקצועי של אנשי מקצוע מתחומי המוצר והפיתוח, במטרה לסייע למיזמים וארגונים יוצאי דופן להרחיב ולייעל את פעילותם החברתית.  בעמותה מספר צוותי מוצר המופעלים על ידי  עשרות מתנדבים בעלי רקע העולמות הפיתוח, העיצוב, ניהול המוצר, הבדיקות והשיווק.\nהמתנדבים מגיעים למשרדי העמותה בשעות הערב ל פיתוח משותף, ואף משקיעים מעבר לכך על מנת לאפשר התקדמות נכונה של הפרוייקט בו הם לוקחים חלק."

class AboutUsView extends React.Component{
    state = {haprev: true}
    render() {
      return(
            <View style={styles.container}>
                <ScrollView horizontal={false}>
                <View>
                    <View style={{flexDirection: "row",alignSelf:'center'}} >
                        <TouchableOpacity
                        rounded
                        style={styles.button}
                        onPress={() => { this.setState({haprev: true})} }
                        >
                            <Image contain style={styles.picture} resizeMode='contain' source={require('../../images/haprevLogo.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity
                        rounded
                        style={styles.button}
                        onPress={() => {this.setState({haprev: false})}} 
                        >
                            <Image style={styles.picture} resizeMode='contain' source={require('../../images/STARTACH.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>{this.state.haprev ? 'מהפכה של שמחה' : 'סטארטאח' }</Text>
                    <Text style={styles.textStyle}>{this.state.haprev ? HapRevText1 : STARTACHText1 }</Text>
                    <Text style={styles.textStyle}>{this.state.haprev ? HapRevText2 : STARTACHText2 }</Text>
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
       width:100,
       height:100,
       alignSelf:'center',
       backgroundColor: '#a82b5d',
    },
    textStyle:{
        margin: 15,
        marginBottom:7,
        marginTop:5,
        fontSize: 18,
        fontFamily: 'sans-serif',
        color:'#ffffff',
        textAlign: 'left',
    },
    title:{
        fontSize:28,
        textAlign:'center',
        color:'#ffffff',
        marginTop:3,
        fontWeight:'500'
    },
    button:{
        borderWidth:2,
        borderColor:'#bc6085',
        marginRight:5,
        marginLeft:5,
    },
});

export default AboutUsView