import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setCalcVarAC} from '../Redux/RemainderReducer';
import GlobalStyles from '../styles/GlobalStyles';
import {summa} from '../Utils/helpers';
export default (props) => {
  const state = useSelector((state) => state.RemainderState);
  const main = useSelector((state) => state.mainState);
  const dispatch = useDispatch();
  const gStyle = GlobalStyles(state.size);
  const style = styles(state.size);
  React.useEffect(() => {
    if (props.state.product.amountfact)
      dispatch(setCalcVarAC(props.state.product.amountfact));
    return () => dispatch(setCalcVarAC(''));
  }, [props.state.product.amountfact]);
  const calcNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '+'],
  ];

  return (
    <View style={style.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={style.productName}>{props.state.product.Name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20 * state.size,
          }}>
          <Text
            style={{
              fontSize: 40 * state.size,
              fontWeight: 'bold',
              marginRight: 15 * state.size,
            }}>
            ☰
          </Text>
          <Text style={{fontSize: 40 * state.size, fontWeight: 'bold'}}>
            {props.state.product.Amount}
          </Text>
        </View>
      </View>

      <View
        style={[
          gStyle.shadow,
          style.calculatorContainer,
          {
            height:
              Dimensions.get('window').height -
              (main.showMenu ? 360 : 330) * main.size,
          },
        ]}>
        <View style={style.inputOutputDoneContainer}>
          <View style={[gStyle.shadow, style.inputOutputContainer]}>
            <View style={style.inputContainer}>
              <Text style={style.typing}>
                {state.calcVar ? state.calcVar : 0}
              </Text>
            </View>
            <View style={style.outputContainer}>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={style.closeIcon}
                onPress={() => {
                  dispatch(setCalcVarAC(''));
                }}>
                <Image
                  style={style.closeIcon}
                  source={require('../assets/icons/reset.png')}
                />
              </TouchableOpacity>
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
              <Text style={style.sum}>
                {state.calcVar ? '= ' + summa(state.calcVar) : 0}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (
                String(summa(state.calcVar)) ===
                String(props.state.product?.Amount)
              ) {
                props.done(state.calcVar);
                dispatch(setCalcVarAC(''));
              } else {
                Alert.alert(
                  '',
                  'Количество посчитаное Вами не совпадает с ... Хотите пересчитать?',
                  [
                    {
                      text: 'Нет, продолжить',
                      onPress: () => {
                        dispatch(setCalcVarAC(''));
                        props.done(
                          state.calcVar,
                          '',
                          props.state.product.UIDProduct,
                        );
                      },
                      style: 'cancel',
                    },
                    {
                      text: 'Да ',
                      onPress: () => console.log('Cancel Pressed'),
                    },
                  ],
                );
              }
            }}
            style={style.done}>
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
      height: '100%',
      justifyContent: 'space-around',
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
    },
    inputOutputDoneContainer: {
      alignItems: 'center',
    },
    inputOutputContainer: {
      justifyContent: 'space-between',
      height: Dimensions.get('window').height - 550 * size,
      width: 700 * size,
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
      color: 'red',
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
      width: 580 * size,
      height: Dimensions.get('window').height - 360 * size,
    },
    lineNums: {
      flexDirection: 'row',
    },
    numButton: {
      width: 178 * size,
      height: (Dimensions.get('window').height - 470 * size) / 4,
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
      width: 54 * size,
      height: 54 * size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'red',
      borderWidth: 1,
      marginLeft: 30*size,
    },
    removeText: {
      fontWeight: 'bold',
      color: 'red',
      fontSize: 40 * size,
    },
  });
