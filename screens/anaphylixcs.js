import React, {useState} from 'react';
import {useDarkMode} from '../components/DarkModeContext';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default function Anaphylaxis() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    {id: 1, text: 'Declare an emergency', completed: false},
    {id: 2, text: 'Call for HELP', completed: false},
    {id: 3, text: 'Increase FiO2 to 100%', completed: false},
    {id: 4, text: 'Assess AIRWAY, BREATHING, CIRCULATION', completed: false},
    {id: 5, text: 'Intubate if necessary', completed: false},
    {id: 6, text: 'Obtain IV/IO access', completed: false},
    {id: 7, text: 'Turn OFF anaesthetic agents', completed: false},
    {id: 8, text: 'Elevate legs if there is hypotension', completed: false},
    {id: 9, text: 'Start CPR if necessary', completed: false},
    {id: 10, text: 'Remove possible Triggers', completed: false},
    {id: 11, text: 'Latex', completed: false},
    {id: 12, text: 'NMB', completed: false},
    {id: 13, text: 'Chlorhexidine', completed: false},
    {id: 14, text: 'IV Colloids', completed: false},
    {id: 15, text: 'Antibiotics', completed: false},
    // Add more checklist items here
  ]);

  const handleToggleComplete = itemId => {
    setChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, completed: !item.completed} : item,
      ),
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? 'rgb(30, 30, 32)' : '#F2EDEB',
        flex: 1,
      }}>
      <ScrollView style={{marginBottom: '10%'}}>
        <View style={styles.container}>
          <Text style={[styles.title, {color: isDarkMode ? 'white' : 'black'}]}>
            Anaphylaxis Management
          </Text>
          {checklistItems.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleToggleComplete(item.id)}
              style={styles.checklistItem}>
              <View style={styles.checkbox}>
                {item.completed && <Text style={styles.tick}>&#x2713;</Text>}
              </View>
              <Text
                style={[
                  styles.checklistText,
                  {
                    color: isDarkMode ? 'white' : 'black',
                    textDecorationLine: item.completed
                      ? 'line-through'
                      : 'none',
                  },
                ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 50,
    height: '100%',
    paddingBottom: '100',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: useDarkMode ? '#D3D3D3' : 'black',
  },
  tick: {
    fontSize: 20,
    color: 'green',
  },
  checklistText: {
    flex: 1,
    fontSize: 18,
  },
});
