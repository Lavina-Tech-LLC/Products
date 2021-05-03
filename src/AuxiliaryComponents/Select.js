import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import GlobalStyles from '../styles/GlobalStyles';

export default (props) => {
  const {defaultSelected, options, onChange} = props;

  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state.mainState);
  const state2 = useSelector((state) => state.RemainderState);
  const size = state.size;
  const style = styles(size);
  const globalStyle = GlobalStyles(size);
  useEffect(() => {
    setOpen(false);
  }, [state, state2]);

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={[style.selector, globalStyle.shadow]}
        onPress={() => {
          setOpen((prev) => !prev);
        }}>
        <Text numberOfLines={1} style={style.selectedText}>
          {defaultSelected || 'Выберите...'}
        </Text>
        <Image
          source={
            open
              ? require('../assets/icons/close.png')
              : require('../assets/icons/open.png')
          }
          style={{width: 18 * size, height: 10 * size}}
        />
      </TouchableOpacity>
      {open && (
        <ScrollView
          showsVerticalScrollIndicator
          style={[style.options, globalStyle.shadow]}>
          {options?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={style.optionsItem}
              onPress={() => {
                setOpen((prev) => !prev);
                onChange(item, index);
              }}>
              <Text numberOfLines={1} style={style.optionText}>
                {item.Name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      marginLeft: 40 * size,
    },
    selector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 58 * size,
      borderRadius: 25 * size,
      width: 300 * size,
      paddingLeft: 18 * size,
      paddingRight: 25 * size,
      marginBottom: 5 * size,
    },
    selectedText: {
      marginRight: 20 * size,
      fontSize: 24 * size,
      fontWeight: '900',
    },
    options: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      minWidth: 160 * size,
      width: 300 * size,
      maxHeight: Dimensions.get('window').height - 300 * size,
    },
    optionsItem: {
      padding: 14 * size,
    },
    optionText: {
      fontSize: 28 * size,
    },
  });
