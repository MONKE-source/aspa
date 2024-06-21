import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Pdf from 'react-native-pdf';


const Item = ({route}) => {
  const { itemTitle, itemBigTitle } = route.params;
  const formattedItemTitle = itemTitle.toLowerCase().replace(/\s/g, '_');
  const formattedItemBigTitle = itemBigTitle.toLowerCase().replace(/\s/g, '_');
  const uri = `file:///Users/calebhan/developer/kkh2/KKH-Paediatrics/assets/kkh-assets/${formattedItemBigTitle}/${formattedItemTitle}.pdf`;

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      {/* <Text>{itemBigTitle}</Text> */}
     <Pdf 
    //  enablePaging={true}
      trustAllCerts={false}
      source={{
        uri: uri,
      }}
      style={{flex: 1, width: Dimensions.get('window').width}}
     />
    </View>
  );
};


export default Item

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
});
