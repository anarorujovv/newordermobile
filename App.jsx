import React, { useEffect, useState } from 'react'
import Login from './Components/Security/Login';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigation from './Components/Routes/StackNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WifiGlobalProvider } from './Components/Shared/Stage/WifiGlobalStatus';
import MyKeyboard from './Components/Shared/Components/MyKeyboard';
import useData from './Components/Shared/Stage/useData';
import apiHeader from './Components/Services/apiHeader';
import { createSalesTable, getAllSalesTable } from './Components/Shared/Stage/sale_sql';

const App = () => {

  const queryClient = new QueryClient();
  const setTail = useData((state) => state.setTail);
  const setCloudCount = useData((state) => state.setCloudCount);

  const [isSuccessLogin, setIsSuccessLogin] = useState(null);

  const controller = async () => {
    const d = await getAllSalesTable();
    if (d == null) {
      await createSalesTable();
    }
    try {

      const allSales = await getAllSalesTable();
      if (allSales != null) {
        setCloudCount(allSales.length);
      }

      const token = await AsyncStorage.getItem("token");
      if (token == null) {
        setIsSuccessLogin(false);
      } else {
        setIsSuccessLogin(true);
        let date = new Date();
        let obj = {
          FromDate: date
        };
        const result = await apiHeader('pos/pos_sync_shifts.php', 'POST', obj);
        if (result.Body[0].Status == 1) {
          setTail(result.Body[0].Id);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    controller();
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <WifiGlobalProvider>
          {
            isSuccessLogin != null ?
              isSuccessLogin ? <StackNavigation /> : <Login />
              :
              ''
          }
          <MyKeyboard />
        </WifiGlobalProvider>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App