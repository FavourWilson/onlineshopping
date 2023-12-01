import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import confirmationScreen from '../screens/confirmationScreen';
import OrderScreen from '../screens/OrderScreen';

export default function StackNavigator() {
    
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ?
              (<Entypo name="home" size={24} color="black" />)
              :
              (<AntDesign name="home" size={24} color="black" />)
          }}
          
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            tabBarIcon: ({ focused }) => focused ?
              (<Ionicons name="person" size={24} color="black" />)
              :
              (<Ionicons name="person-outline" size={24} color="black" />)
          }}
          
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ?
              (<Ionicons name="cart" size={24} color="black" />)
              :
              (<Ionicons name="cart-outline" size={24} color="black" />)
          }}
          
        />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
        <Stack.Screen name="Info" component={ProductInfoScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Address" component={AddAddressScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Add" component={AddressScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Confirm" component={confirmationScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}