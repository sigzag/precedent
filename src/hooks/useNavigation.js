import { useContext } from 'react';
import { navigationContext } from '../App.js';

export default function useNavigation() {
  return useContext(navigationContext);
}
