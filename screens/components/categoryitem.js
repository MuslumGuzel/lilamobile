import React from 'react';
import { 
    TouchableOpacity,
    Text,
    StyleSheet
 } from 'react-native';
 
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const onSelectCategory = (category) => {

    //filter Menu Items
    let foodList = foodData.filter(a => a.categories.includes(category.id))

    setFoods(foodList);

    setSelectedCategory(category);
}

const CategoryItem = ({ item }) => {

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

export default CategoryItem;