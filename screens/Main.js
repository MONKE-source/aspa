import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  useWindowDimensions,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Item from './Item';
import Pdf from 'react-native-pdf';
import {useDarkMode} from '../components/DarkModeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const data = [
  {
    id: '1',
    title: 'Training Programmes',
    subtitles: [{id: 'sub1', text: 'Training Programmes', isBookmarked: false}],
  },
  {
    id: '2',
    title: 'Guidelines for Paediatric Anaesthesia',
    subtitles: [
      {
        id: 'sub2',
        text: 'Guidelines for the provision of the Anaesthesia for Paediatric patients',
        isBookmarked: false,
      },
      {
        id: 'sub3',
        text: 'Preoperative preparation and induction techniques',
        isBookmarked: false,
      },
    ],
  },
  {
    id: '3',
    title: 'Paediatric Anaesthesia',
    subtitles: [
      {id: 'sub4', text: 'Equipment', isBookmarked: false},
      {id: 'sub5', text: 'Dental Injury', isBookmarked: false},
      {id: 'sub6', text: 'Nausea Vomitting', isBookmarked: false},
      {id: 'sub7', text: 'Common Medical Conditions', isBookmarked: false},
      {id: 'sub8', text: 'Preoperative Evaluation', isBookmarked: false},
      {id: 'sub9', text: 'Premedication', isBookmarked: false},
      {id: 'sub10', text: 'Emergence delirium', isBookmarked: false},
    ],
  },
  {
    id: '4',
    title: 'Fluid Guidelines',
    subtitles: [
      {id: 'sub11', text: 'Fluid Guidelines in children', isBookmarked: false},
    ],
  },
  {
    id: '5',
    title: 'Neonatal Anaesthesia',
    subtitles: [
      {id: 'sub12', text: 'Nenotal Anaesthesia', isBookmarked: false},
    ],
  },
  {
    id: '6',
    title: 'Cardiac Guidelines',
    subtitles: [
      {
        id: 'sub13',
        text: 'Prophylaxis for Infective Endocarditis',
        isBookmarked: false,
      },
      {id: 'sub14', text: 'ROTEM Algorithm', isBookmarked: false},
      {
        id: 'sub15',
        text: 'Paediatric Cardiac Anaesthesia',
        isBookmarked: false,
      },
      {id: 'sub16', text: 'Common Cardiac Conditions', isBookmarked: false},
      {id: 'sub17', text: 'Cardiac Catheterization', isBookmarked: false},
    ],
  },
  {
    id: '7',
    title: 'Diagnostic Imaging',
    subtitles: [{id: 'sub18', text: 'Diagnostic Imaging', isBookmarked: false}],
  },
  {
    id: '8',
    title: 'Sedation for Oncology Patients',
    subtitles: [
      {
        id: 'sub19',
        text: 'Sedation for Oncology Children',
        isBookmarked: false,
      },
    ],
  },
  {
    id: '9',
    title: 'Regional Anaesthesia',
    subtitles: [
      {id: 'sub20', text: 'Central Neraxial Block', isBookmarked: false},
      {id: 'sub21', text: 'Regional Anaesthesia Workflow', isBookmarked: false},
      {id: 'sub22', text: 'Current Trends', isBookmarked: false},
      {id: 'sub23', text: 'Peripheral Nerve Block', isBookmarked: false},
      {id: 'sub24', text: 'Local Anaesthetic Toxicity', isBookmarked: false},
      {id: 'sub25', text: 'Ultrasound Guided Blocks', isBookmarked: false},
    ],
  },
  {
    id: '10',
    title: 'Patient Transport',
    subtitles: [{id: 'sub26', text: 'Patient Transport', isBookmarked: false}],
  },
  {
    id: '11',
    title: 'Drug Doses in Paediatric Anaesthesia',
    subtitles: [
      {id: 'sub27', text: 'Miscellaneous Drugs', isBookmarked: false},
      {id: 'sub28', text: 'Antibiotics', isBookmarked: false},
    ],
  },
  {
    id: '12',
    title: 'Transfusion in Children',
    subtitles: [
      {
        id: 'sub29',
        text: 'Paediatric Massive Transfusion Protocol',
        isBookmarked: false,
      },
      {id: 'sub30', text: 'Transfusion Guidelines', isBookmarked: false},
    ],
  },
  {
    id: '13',
    title: 'Common Crisis',
    subtitles: [
      {
        id: 'sub31',
        text: 'Post Adenotonsillectomy Bleeding',
        isBookmarked: false,
      },
      {id: 'sub32', text: 'Latex Allergy', isBookmarked: false},
      {id: 'sub34', text: 'Suspected Anaphylaxis', isBookmarked: false},
      {id: 'sub35', text: 'Local Anaesthetic Toxicity', isBookmarked: false},
      {id: 'sub36', text: 'Laryngospasm', isBookmarked: false},
      {id: 'sub37', text: 'Acute Epiglottitis', isBookmarked: false},
      {id: 'sub38', text: 'Malignant Hyperthermia', isBookmarked: false},
      {id: 'sub39', text: 'Hypercyanotic Tet Spells', isBookmarked: false},
    ],
  },
  {
    id: '14',
    title: 'Advance Paediatric Life Support',
    subtitles: [
      {
        id: 'sub40',
        text: 'Advanced Paediatric Life Support',
        isBookmarked: false,
      },
    ],
  },
  {
    id: '15',
    title: 'Acute Pain Service',
    subtitles: [
      {id: 'sub41', text: 'Pain Assesment in Children', isBookmarked: false},
      {
        id: 'sub42',
        text: 'Pharmagological Approach To Pain Management',
        isBookmarked: false,
      },
      {id: 'sub43', text: 'Patient Controlled Analgesia', isBookmarked: false},
      {id: 'sub44', text: 'Post Epidural Care', isBookmarked: false},
      {id: 'sub45', text: "Children's Pain Service", isBookmarked: false},
    ],
  },
  {
    id: '16',
    title: 'Chronic Pain Service',
    subtitles: [{id: 'sub46', text: 'Chronic Pain', isBookmarked: false}],
  },
  {
    id: '17',
    title: 'Normal Laboratory Data',
    subtitles: [{id: 'sub47', text: 'Normal Laboratory', isBookmarked: false}],
  },
];

const BookmarkedItemsScreen = ({route, navigation}) => {
  const {bookmarkedItems} = route.params;
  const {isDarkMode, toggleDarkMode} = useDarkMode();

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = item => {
    setSelectedItem(item);
  };

  const goBackToList = () => {
    setSelectedItem(null);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {paddingBottom: '16%'},
        isDarkMode ? styles.darkMode : styles.lightMode,
      ]}>
      {/* /* {selectedItem ? ( */}
      <FlatList
        data={bookmarkedItems}
        renderItem={({item}) => (
          <View>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.title}</Text>
              {item.subtitles.map(subtitle => (
                <TouchableOpacity
                  key={subtitle.id}
                  style={styles.subtitleContainer}
                  onPress={() =>
                    navigation.navigate('BookmarkedDetailsScreen', {
                      title: item.title,
                      subtitles: subtitle.text,
                    })
                  }>
                  <Text style={styles.subtitleText}>{subtitle.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatList}
      />
    </SafeAreaView>
  );
};

const BookmarkedDetail = ({route}) => {
  function formatFileName(text) {
    const text1 = text.toString();
    const lowercaseText = text1.toLowerCase();

    var words = lowercaseText.split(' ');
    var result = words.join('_');
    return result;
  }
  const {title, subtitles} = route.params;
  const uri = `file:///Users/calebhan/developer/kkh2/KKH-Paediatrics/assets/kkh-assets/${formatFileName(
    title,
  )}/${formatFileName(subtitles)}.pdf`;
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <Pdf
        // enablePaging={true}
        trustAllCerts={false}
        source={{
          uri: uri,
        }}
        style={{flex: 1, width: Dimensions.get('window').width}}
      />
    </View>
  );
};

const BookmarkSubtitlesFlatList = ({navigation}) => {
  const [items, setItems] = useState(data);
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredData([]);
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('items');
        if (savedItems !== null) {
          setItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error('Failed to load items from AsyncStorage', error);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('items', JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save items to AsyncStorage', error);
      }
    };

    saveItems();
  }, [items]);

  const toggleSubtitleBookmark = async (itemId, subtitleId) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              subtitles: item.subtitles.map(subtitle =>
                subtitle.id === subtitleId
                  ? {...subtitle, isBookmarked: !subtitle.isBookmarked}
                  : subtitle,
              ),
            }
          : item,
      ),
    );

    setFilteredData(prevFilteredData =>
      prevFilteredData.map(item =>
        item.id === itemId
          ? {
              ...item,
              subtitles: item.subtitles.map(subtitle =>
                subtitle.id === subtitleId
                  ? {...subtitle, isBookmarked: !subtitle.isBookmarked}
                  : subtitle,
              ),
            }
          : item,
      ),
    );
    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save items to AsyncStorage', error);
    }
  };

  const [title, setTitle] = useState('');
  const [subtitle, setsubTitle] = useState('');
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      {item.subtitles.map(subtitle => (
        <TouchableOpacity
          key={subtitle.id}
          style={styles.subtitleContainer}
          onPress={() =>
            navigation.navigate('ItemRef', {
              itemTitle: subtitle.text,
              itemBigTitle: item.title,
            })
          }>
          <Text style={styles.subtitleText}>{subtitle.text}</Text>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => toggleSubtitleBookmark(item.id, subtitle.id)}>
            <Ionicons
              name={subtitle.isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={subtitle.isBookmarked ? 'gold' : 'black'}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  const windowWidth = useWindowDimensions().width;

  const dynamicStyles = StyleSheet.create({
    settingsView: {
      height: windowWidth * 0.1,
      width: windowWidth * 0.1,
      borderRadius: (windowWidth * 0.1) / 2,
      overflow: 'hidden',
      backgroundColor: 'rgb(49, 49, 53)',
      justifyContent: 'center',
      alignItems: 'center',
      // left: 5,
    },
    settingIcon: {
      height: windowWidth * 0.055,
      width: windowWidth * 0.055,
      tintColor: '#EAEAEB',
    },
    searchContainer: {
      backgroundColor: 'rgb(49, 49, 53)',
      borderRadius: windowWidth * 0.05,
      marginHorizontal: 7.5,
      width: windowWidth * 0.85,
      height: windowWidth * 0.1,
      flexDirection: 'row',
      overflow: 'hidden',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: windowWidth * 0.035,
    },
    searchIcon: {
      height: windowWidth * 0.04,
      width: windowWidth * 0.04,
      tintColor: '#818188',
    },
    searchInput: {
      paddingHorizontal: windowWidth * 0.03,
      fontWeight: '600',
      fontSize: windowWidth * 0.045,
      color: 'white',
    },
    clearButton: {},
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkMode : styles.lightMode,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={[
            isDarkMode ? styles.darkModeText : styles.lightModeText,
            {
              fontWeight: 'bold',
              fontSize: 40,
              padding: 20,
            },
          ]}>
          References
        </Text>
        {/* Touchable Opacity to view bookmarked  */}
        <TouchableOpacity
          style={{marginLeft: '23%', marginTop: 10, padding: 10}}
          onPress={() => {
            const bookmarkedItems = items.reduce((acc, item) => {
              const bookmarkedSubtitles = item.subtitles.filter(
                subtitle => subtitle.isBookmarked,
              );
              if (bookmarkedSubtitles.length > 0) {
                acc.push({
                  id: item.id,
                  title: item.title,
                  subtitles: bookmarkedSubtitles,
                });
              }
              return acc;
            }, []);

            navigation.navigate('BookmarkedItemsScreen', {
              bookmarkedItems,
            });
          }}>
          <Ionicons name="bookmark" size={28} color="gold" />
        </TouchableOpacity>
        {/*  */}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {/* <TouchableOpacity
          style={dynamicStyles.settingsView}
          onPress={() => navigation.navigate('Settings')}>
          <Image
            source={require('../assets/setting.png')}
            style={dynamicStyles.settingIcon}
          />
        </TouchableOpacity> */}
        <View style={{flexDirection: 'row', gap: 5}}>
          <TouchableOpacity
            style={{marginTop: 3, marginLeft: 15}}
            onPress={() => navigation.navigate('Settings')}>
            <SimpleLineIcons
              name="settings"
              style={{
                fontSize: 30,
                color: isDarkMode ? 'white' : 'black',
              }}
            />
          </TouchableOpacity>
          <View style={dynamicStyles.searchContainer}>
            <Image
              source={require('../assets/search.png')}
              style={dynamicStyles.searchIcon}
            />
            <TextInput
              style={dynamicStyles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#818188"
              value={searchQuery}
              onChangeText={text => {
                const lowercaseText = text.toLowerCase();
                setSearchQuery(text);
                const filtered = data.filter(item => {
                  const lowercaseTitle = item.title.toLowerCase();
                  const subtitleMatches = item.subtitles.some(subtitle =>
                    subtitle.text.toLowerCase().includes(lowercaseText),
                  );
                  return (
                    lowercaseTitle.includes(lowercaseText) || subtitleMatches
                  );
                });
                setFilteredData(filtered);
              }}
            />
            {/* {searchQuery !== '' && (
        <AntDesign
          name="close"
          size={20}
          color="#818188"
          style={dynamicStyles.clearButton}
          onPress={clearSearch}
        />
      )} */}
          </View>
        </View>
      </View>
      <FlatList
        data={filteredData}
        style={{flex: 1, top: 20, marginBottom: 90}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatList}
      />
      {/* <StatusBar style={"dark"} /> */}
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();
function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="MainRef"
        component={BookmarkSubtitlesFlatList}
        options={{headerShown: false, headerTitle: 'References'}}
      />
      <Stack.Screen
        name="ItemRef"
        component={Item}
        options={({route}) => ({
          headerTitle: route.params.itemTitle,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'rgb(30, 30, 32)',
            color: 'white',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerBackTitleStyle: {
            color: 'white',
          },
          headerBackTitle: 'Back',
        })}
      />
      <Stack.Screen
        name="BookmarkedItemsScreen"
        component={BookmarkedItemsScreen}
        options={{
          headerTitle: 'Items',
          headerStyle: {
            backgroundColor: 'rgb(30, 30, 32)',
            color: 'white',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerBackTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="BookmarkedDetailsScreen"
        component={BookmarkedDetail}
        options={{
          headerTitle: 'PDF Details',
          headerStyle: {
            backgroundColor: 'rgb(30, 30, 32)',
            color: 'white',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerBackTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: useDarkMode ? 'rgb(30, 30, 32)' : 'white',
  },
  darkMode: {
    backgroundColor: 'rgb(30, 30, 32)',
  },
  lightMode: {
    backgroundColor: 'white',
  },
  darkModeText: {
    color: 'white',
  },
  lightModeText: {
    color: 'black',
  },
  flatList: {
    padding: 16,
  },
  headerContainer: {
    // backgroundColor: "black",
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  subtitleText: {
    flex: 1,
    marginRight: 10,
    fontSize: 18,
    color: 'black',
  },
  bookmarkButton: {
    padding: 6,
    // backgroundColor: "#3498db",
    borderRadius: 4,
  },
  bookmarkButtonText: {
    color: 'white',
  },
});

export default MainStack;
