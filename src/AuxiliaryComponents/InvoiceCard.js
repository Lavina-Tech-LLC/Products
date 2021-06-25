import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
export default ({onClick, listInvoice, style, size, state}) => {
  return (
    <ScrollView style={{}} contentContainerStyle={{alignItems: 'center'}}>
      {listInvoice.length > 0 &&
        listInvoice.map((item, index) => {
          const invoice = item?.invoice;
          return invoice ? (
            <TouchableOpacity
              onPress={() => onClick(invoice.UIDInvoice)}
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 25 * size,
                  borderWidth: 2 * size,
                  borderColor: '#332A7C',
                  marginTop: 15 * size,
                  paddingLeft: 15 * size,
                  backgroundColor:
                    invoice.UIDInvoice === state.invoice.UIDInvoice
                      ? '#371182'
                      : invoice.Статус && invoice.Статус === 'Rejected'
                      ? '#ed7e98'
                      : invoice.Статус === 'Accepted'
                      ? '#cffff1'
                      : '#f5f5f5',
                },
                style.writeOffContainer,
              ]}
              key={invoice.UIDInvoice}>
              <Text style={style.Number}>{invoice.Номер}</Text>
              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: 'blue',
                  marginRight: 10 * size,
                  marginLeft: 10 * size,
                }}
              />
              <Text style={[style.Date, {textAlign: 'center'}]}>
                {invoice.Дата.split(' ').join('\n')}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          );
        })}
    </ScrollView>
  );
};
