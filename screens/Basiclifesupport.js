import React, {useState} from 'react';
import {useDarkMode} from '../components/DarkModeContext';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function Basiclifesupport() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  const [checklistItems, setChecklistItems] = useState([
    {id: 1, text: 'Open airway', completed: false},
    {id: 2, text: 'Check for spontaneous breathing', completed: false},
    {
      id: 3,
      text: 'Check pulse (femoral & brachial preferable in children) for not more than 10 seconds',
      completed: false,
    },
    {
      id: 4,
      text: 'Lone rescuer: complete 2 minutes (5 cycles) of CPR before calling EMS',
      completed: false,
    },
    {
      id: 5,
      text: 'Send someone to call EMS immediately if not alone',
      completed: false,
    },
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
      <ScrollView style={styles.container}>
        <Text style={[styles.title, {color: isDarkMode ? 'white' : 'black'}]}>
          Basic Life Support
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
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                },
              ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
