import React from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet
 } from 'react-native';
 
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const FoodMenuItem = ({ item }) => {

    return (

        <View

            style={{
                backgroundColor: COLORS.white,
                width: "100%",
                height: 100,
                borderRadius: SIZES.radius * 0.5,
                marginBottom: SIZES.padding,
            }}
        >
            <Text
                style={{
                    marginTop: 10,
                    marginLeft: 10,
                    color: COLORS.black,
                    fontWeight: 'bold',
                    ...FONTS.body3,
                }}
            >{item.name}</Text>
            <Text
                style={{
                    marginTop: 2,
                    marginLeft: 40,
                    color: COLORS.black,
                    ...FONTS.body5,
                }}
            >{item.name}</Text>
            <Text
                style={{
                    position:"absolute",
                    top: 20,
                    right: 30,
                    color: COLORS.black,
                    ...FONTS.body3,
                }}
            >{15}</Text>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: 35,
                    width: SIZES.width * 0.1,
                    backgroundColor: COLORS.primary,
                    borderTopLeftRadius: SIZES.radius * 0.5,
                    borderBottomRightRadius: SIZES.radius * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...styles.shadow
                }}
            >
                <Image
                    source={icons.plus}
                    resizeMode="contain"
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.white
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
});

export default FoodMenuItem;