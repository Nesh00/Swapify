import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import getItems from '../../utils/getItems';
import { descriptionFormatter } from '../../utils/descriptionFormatter';
import { useNavigation } from '@react-navigation/native';
import { dateFormatter } from '../../utils/dateFormatter';

const { width } = Dimensions.get('screen');
const imageW = width * 0.44;
const imageH = imageW * 1.1;

const VerticalList = ({ props }) => {
  const navigation = useNavigation();
  const category = props.category;
  const sortBy = props.sortBy;
  const user = props.user;
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems(category, sortBy, user).then((itemsFromDb) => {
      setItems(itemsFromDb);
    });
  }, [category, sortBy, user]);

  return (
    <FlatList
      data={items}
      pagingEnabled
      style={{ alignSelf: 'stretch' }}
      decelerationRate={0}
      snapToInterval={imageH + 21.5}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Item', { ...item })}
          >
            <View style={styles.itemCard}>
              <Image source={{ uri: item.img }} style={styles.itemImg} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemHeader}>{item.title}</Text>
                <Text>{descriptionFormatter(item.description)}</Text>
                <View style={styles.itemFooter}>
                  <Text>{item.username}</Text>
                  {/* <TouchableOpacity>
                  <Fontisto name='trash' size={24} color='#6b6565' />
                </TouchableOpacity> */}
                </View>
                <Text>{dateFormatter(item.posted_at)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
};

export default VerticalList;

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc9c9',
    overflow: 'hidden',
  },
  itemImg: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    padding: '3%',
  },
  itemHeader: {
    textAlign: 'center',
    fontSize: 17,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
