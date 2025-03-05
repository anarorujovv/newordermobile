import { useColorScheme } from 'react-native';

export default function useTheme() {
  const colorScheme = useColorScheme();

  const themes = {
    light: {
      primary_1: '#F7F9FC',
      primary_2: '#4791DB',
      primary_3: '#FFFFFF',
      primary_4: '#4791DB',
      primary_5: '##FFFFFF',
      white: "#000",
      black: "#fff",
      yellow: "#FFA726",
      inputColors: {
        borderColor: "##B4B6B7",
        labelColor: '##F5F5F5'
      },
      grey_1: '#F5F5F5',
      green_1: '#66BA6A',
      orange: "#FFAC1C",
      red: "red",
      stableWhite:"#fff",
      stableGrey:"#989898"
    },
    dark: {
      primary_1: '#1A2138',
      primary_2: '#1976D2',
      primary_3: '#222B45',
      primary_4: '#4791DB',
      primary_5: '#363E56',
      white: "#ffff",
      black: "#000",
      yellow: "#FFA726",
      inputColors: {
        borderColor: "#62697C",
        labelColor: '#C2C5CC'
      },
      grey_1: '#333C54',
      green_1: '#66BA6A',
      orange: "#FFAC1C",
      red: "red",
      stableWhite:"#fff"

    }
  };

  return themes[colorScheme] || themes.light;
}