import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setCalcVarAC} from '../../../Redux/RemainderReducer';
import GlobalStyles from '../../../styles/GlobalStyles';

export default (props) => {
  const state = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();
  const gStyle = GlobalStyles(state.size);
  const style = styles(state.size);

  const calcNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '+'],
  ];

  return (
    <View style={style.container}>
      <Text style={style.productName}>dd</Text>
      <View style={[gStyle.shadow, style.calculatorContainer]}>
        <View style={style.inputOutputDoneContainer}>
          <View style={[gStyle.shadow, style.inputOutputContainer]}>
            <View style={style.inputContainer}>
              <Text style={style.typing}>
                {state.calcVar ? state.calcVar : 0}
              </Text>
            </View>
            <View style={style.outputContainer}>
              <TouchableOpacity
                style={style.closeIcon}
                onPress={() => {
                  dispatch(setCalcVarAC(''));
                }}>
                <Image
                  style={style.closeIcon}
                  source={require('../../../assets/icons/reset.png')}
                />
              </TouchableOpacity>
              <Text style={style.sum}>
                {state.calcVar
                  ? state.calcVar
                      .split('+')
                      .reduce((a, b) => Number(a) + Number(b), 0)
                  : 0}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={style.done}>
            <Text>Готово</Text>
          </TouchableOpacity>
        </View>

        <View style={style.keyboard}>
          {calcNumbers.map((item, index) => (
            <View key={index} style={style.lineNums}>
              {item.map((num, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    gStyle.shadow,
                    style.numButton,
                    num === '+' ? gStyle.selected : {},
                  ]}
                  onPress={() => {
                    if (
                      num !== '+' ||
                      (state.calcVar && state.calcVar.slice(-1) !== '+')
                    )
                      dispatch(setCalcVarAC(state.calcVar + num));
                  }}>
                  <Text
                    style={[
                      style.numText,
                      num === '+' ? gStyle.selectedText : {},
                    ]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity
            style={[gStyle.shadow, style.remove]}
            onPress={() => {
              if (state.calcVar.slice(-2, -1) === '+')
                dispatch(setCalcVarAC(state.calcVar.slice(0, -2)));
              else dispatch(setCalcVarAC(state.calcVar.slice(0, -1)));
            }}>
            <Text style={style.removeText}> C </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      marginTop: 50 * size,
      padding: 20,
    },
    productName: {
      marginBottom: 25 * size,
      fontSize: 35 * size,
      fontWeight: 'bold',
      marginLeft: 10 * size,
    },
    calculatorContainer: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: 'rgba(248, 248, 252, 1)',
      padding: 25 * size,
      justifyContent: 'space-between',
      height: Dimensions.get('window').height - 390 * size,
    },
    inputOutputDoneContainer: {
      alignItems: 'center',
    },
    inputOutputContainer: {
      justifyContent: 'space-between',
      height: Dimensions.get('window').height - 570 * size,
      width: 746 * size,
      marginBottom: 35 * size,
    },
    inputContainer: {
      width: '100%',
      maxHeight: 312 * size,
      padding: 30 * size,
    },
    typing: {
      fontSize: 35 * size,
      fontWeight: 'bold',
    },
    outputContainer: {
      width: '100%',
      height: 100 * size,
      borderTopColor: 'rgba(51, 42, 124, 1)',
      borderTopWidth: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 25 * size,
      paddingRight: 25 * size,
    },
    closeIcon: {
      height: 54 * size,
      width: 54 * size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    sum: {
      fontSize: 35 * size,
      fontWeight: 'bold',
    },
    done: {
      width: 363 * size,
      alignItems: 'center',
      justifyContent: 'center',
      height: 90 * size,
      borderColor: 'rgba(51, 42, 124, 1)',
      borderWidth: 1.5,
      borderRadius: 25 * size,
      backgroundColor: 'white',
    },
    keyboard: {
      width: 515 * size,
      height: Dimensions.get('window').height - 470 * size,
    },
    lineNums: {
      flexDirection: 'row',
    },
    numButton: {
      width: 161 * size,
      height: (Dimensions.get('window').height - 615 * size) / 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15 * size,
      marginBottom: 15 * size,
    },
    numText: {
      fontWeight: '700',
      fontSize: 35 * size,
    },
    remove: {
      width: '100%',
      height: 90 * size,
      marginTop: 20 * size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'red',
      borderWidth: 1,
    },
    removeText: {
      fontWeight: 'bold',
      color: 'red',
      fontSize: 40 * size,
    },
  });
