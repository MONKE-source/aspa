// plain page template
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDarkMode} from '../components/DarkModeContext';

export default function PlainPage() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? 'rgb(30, 30, 32)' : '#F2EDEB',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}></SafeAreaView>
  );
}

const styles = StyleSheet.create({});