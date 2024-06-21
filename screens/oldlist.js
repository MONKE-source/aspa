import React, {useState} from 'react';
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const ITEM_HEIGHT = 50;
const DROPDOWN_HEIGHT = 200;

export default function Main() {
  const data = [
    {id: '1', title: 'Training Programmes', subid: ['Training Programmes']},
    {
      id: '2',
      title: 'Guidelines for Paediatric Anaesthesia',
      subid: [
        'Guidelines for the provision of the Anaesthesia for Paediatric patients',
        'Preoperative preparation and induction techniques',
      ],
    },
    {
      id: '3',
      title: 'Paediatric Anaesthesia',
      subid: [
        'Equipment',
        'Dental Injury',
        'Nausea Vomitting',
        'Common Medical Conditions',
        'Preoperative Evaulation',
        'Premedictaion',
        'Emergence delirium',
      ],
    },
    {
      id: '4',
      title: 'Fluid Guidelines in Children',
      subid: ['Fluid Guidelines in children'],
    },
    {id: '5', title: 'Nenonatal Anaesthesia', subid: ['Nenotal Anaesthesia']},
    {
      id: '6',
      title: 'Cardiac Guidelines',
      subid: [
        'Prophylaxis for Infective Endocarditis',
        'ROTEM Algorithm',
        'Paediatric Cardiac Anaesthesia',
        'Common Cardiac Conditions',
        'Cardiac Catheterization',
      ],
    },
    {id: '7', title: 'Diagnostic Imaging', subid: ['Diagnostic Imaging']},
    {
      id: '8',
      title: 'Sedation for Oncology patients',
      subid: ['Sedation for Oncology Children'],
    },
    {
      id: '9',
      title: 'Regional Anaesthesia',
      subid: [
        'Central Neraxial Block',
        'Regional Anaesthesia Workflow',
        'Current Trends',
        'Peripheral Nerve Block',
        'Local Anaesthetic Toxicity',
        'Ultrasound Guided Blocks',
      ],
    },
    {id: '10', title: 'Patient Transport', subid: ['Patient Transport']},
    {
      id: '11',
      title: 'Drug Doses in Paediatric Anaesthesia',
      subid: ['Miscellaneous Drugs', 'Antibiotics'],
    },
    {
      id: '12',
      title: 'Transfusion in Children',
      subid: [
        'Paediatric Massive Transfusion Protocolm',
        'Transfusion Guidelines',
      ],
    },
    {
      id: '13',
      title: 'Common Crisis',
      subid: [
        'Post Adenotonsillectomy Bleeding',
        'Latex Allergy',
        'Suspected Anaphyaxis',
        'Suspected Anaphylaxis',
        'Local Anaesthetic Toxicity',
        'Laryngospasm',
        'Acute Epiglottitis',
        'Malignant Hyperthermia',
        'Hypercyanotic Tet Spells',
      ],
    },
    {
      id: '14',
      title: 'Advanced Paediatric Life Support',
      subid: ['Advanced Paediatric Life Support'],
    },
    {
      id: '15',
      title: 'Acute Pain Service',
      subid: [
        'Patient Controlled Analgesia',
        'Alternative Modes of Analgesia',
        'Epidurals',
        'Pain in Children',
        "Childrens's Pain Service",
      ],
    },
    {id: '16', title: 'Chronic Pain', subid: ['Chronic Pain']},
    {id: '17', title: 'Laboratory', subid: ['Normal Laboratory']},
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const [favorites, setFavorites] = useState([]);

  const handleFavorite = itemId => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(itemId)) {
        return prevFavorites.filter(id => id !== itemId);
      } else {
        return [...prevFavorites, itemId];
      }
    });
  };

  const renderItem = ({item}) => {
    const rightSwipeActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleFavorite(item.id)}>
          <Animated.Text style={{transform: [{scale: trans}]}}>
            ⭐
          </Animated.Text>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView style={styles.itemContainer}>
        <Swipeable
          renderRightActions={rightSwipeActions}
          overshootRight={false}>
          <View style={styles.rectangle}>
            <View onPress={() => toggleDropdown(item.id)}>
              <View style={styles.titleview}>
                <Text
                  style={[styles.title, {marginVertical: 10, marginLeft: 10}]}>
                  {item.title}
                </Text>
              </View>
            </View>
            <View style={[styles.dropdownContainer, {width: '100%'}]}>
              {item.subid.map((subitem, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderColor: 'black',
                  }}>
                  <Text style={styles.dropdownText}>{subitem}</Text>
                  {favorites.includes(item.id) ? (
                    <Text
                      style={{fontSize: 20, fontWeight: '800', color: 'gold'}}>
                      ⭐
                    </Text>
                  ) : null}
                  <Text style={{fontSize: 20, fontWeight: '800'}}>{'>'}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Swipeable>
      </SafeAreaView>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={[
          styles.container,
          isDarkMode ? styles.darkMode : styles.lightMode,
        ]}>
        {/* Your existing components */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 75}}
        />
        {/* <StatusBar style={"light"} /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // Your existing styles
  container: {
    flex: 1,
    backgroundColor: 'rgb(30, 30, 32)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: 'rgb(49, 49, 53)',
    borderRadius: 18,
    width: 350,
    height: 40,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  rectangle: {
    borderWidth: 0.1,
    borderColor: 'black',
    backgroundColor: 'rgb(69, 69, 74)',
    alignItems: 'left',
    flexDirection: 'column',
  },
  title: {
    paddingTop: 5,
    color: '#72A8DA',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  titleside: {
    width: 30,
    height: 30,
  },

  dropdownContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 10,
  },

  favoriteButton: {
    width: 75,
    height: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
