import React, { useState, useEffect } from 'react';
import { SafeAreaView,StyleSheet, Text, View, Image } from 'react-native';
import getAverageStars from '../utils/getAverageStar';

const AverageStarRating = ({user}) => {

    const [ averageRating, setAverageRating ] = useState(0);
    const [ maxRating, setMaxRating ] = useState([1, 2, 3, 4, 5]);
    
    const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

    useEffect(() => {
        getAverageStars(user).then((averageStars) => {
            setAverageRating(averageStars);
        });    
    }, [user]);

    return ( 
        <SafeAreaView style={styles.container}>
            <View key={user} style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                                <Image
                                  key={key}
                                  style={styles.starImgStyle}
                                  source={item <= averageRating
                                  ? {uri: starImgFilled}
                                  : {uri: starImgCorner}}></Image>
                        )
                    })
                }
            </View>
            <Text style={styles.textStyle}>
            {averageRating + ' / ' + maxRating.length}
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1 ,
        margin: 10, 
        justifyContent: 'center', 
    }, 
    textStyle: {
        textAlign: 'left', 
        fontSize: 14
    }, 
    customRatingBarStyle: {
        flexDirection: 'row', 
        flex: 1,
        padding: 0
    }, 
    starImgStyle: {
        width: 20, 
        height: 20, 
        resizeMode: 'cover',
        
    }, 
    buttonStyle: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 30, 
        padding: 15, 
        backgroundColor: 'green'
    }
})

export default AverageStarRating;