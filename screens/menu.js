import React from 'react';
import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    Dimensions,
    Text
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { foodData, categoryData } from '../constants/datas';
import RestaurantService from '../services/restaurantservice';

import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import { FoodMenuItem } from './components';

const useGetRestDate = async () => {
    console.log("useefffeecct");
    let restaurantsService = new RestaurantService();
    let restaurantId = null;
       await restaurantsService.getRestaurantsByCreatedBy()
            .then((data) => {
                console.log("restaaaa : ", data);
                restaurantId = data[0].restaurantId;
                // this.setState({
                //     restaurantName: data[0].data?.name
                // });
            })
            .catch((err) =>
                console.log(err)
            );

    return restaurantId;
};

const Menu = () => {

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [foods, setFoods] = React.useState(foodData);

    let respo = useGetRestDate();
    console.log("respo :", respo);

    function onSelectCategory(category) {

        //filter Menu Items
        let foodList = foodData.filter(a => a.categories.includes(category.id))

        setFoods(foodList);

        setSelectedCategory(category);
    }

    function renderMainCategories() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.primary,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                {/* <Text style={{ ...FONTS.h1, color: COLORS.primary }}>{"{menuName}"}</Text> */}
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                // contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        );
    }

    function renderFoodList() {

        return (
            <FlatList
                data={foods}
                keyExtractor={item => `${item.id}`}
                renderItem={FoodMenuItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 65
                }}
            />
        )
    }

    return (
        <ScrollView style={{
            backgroundColor: COLORS.lightGray4,
        }}>
            <Container>
                <StatusBar barStyle="light-content" /><MenuBackground source={images.menuLeft}>
                    <SafeAreaView>
                        <RestaurantName>
                            <StyledText title>{"{restaurantName}"}</StyledText>
                        </RestaurantName>
                    </SafeAreaView>
                </MenuBackground>
                <MenuContainer>
                    {renderMainCategories()}
                    {renderFoodList()}
                </MenuContainer>
            </Container>
        </ScrollView>
    );
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

const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.lightGray4};
`;

const StyledText = styled.Text`
    color: ${(props) => (props.dark ? COLORS.black : COLORS.white)}
    font-family: "Roboto-Black";

    ${({ title, large, small }) => {
        switch (true) {
            case title:
                return `font-size: 32px;`;
            case large:
                return `font-size: 20px;`;
            case small:
                return `font-size: 13px`;
        }
    }}

    ${({ bold, heavy }) => {
        switch (true) {
            case bold:
                return `font-weight: 600;`;
            case heavy:
                return `font-weight: 700;`;
        }
    }}
`;

const MenuBackground = styled.ImageBackground`
    width: 100%;
    resizeMode: cover;
    alignItems: flex-end;
`;

const RestaurantName = styled.View`
    ${SIZES.largeTitle};
    padding: 0 32px;
    margin: 100px 0 32px 0;
`;

const Divider = styled.View`
    border-bottom-color: ${COLORS.white};
    border-bottom-width: 2px;
    width: ${SIZES.width * 0.8}px;
    margin: 8px 0;
`;

const MenuContainer = styled.View`
    margin-top: -24px;
    background-color: ${COLORS.lightGray4};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
`;

export default Menu;