import { View, Text,Image, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserType } from '../userContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ProfileScreen() {
  const navigation = useNavigation()
  const [userId, setUserId] = useContext(UserType)
  const [orders, setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor:"#00CED1"
      }
      ,
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    })
  }, [])
  const [user,setUser] = useState("")
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://ecommerceapi-qlq3.onrender.com/profile/${userId}`);
        const { user } = response.data
        setUser(user)
      } catch (error) {
        console.log('error',error)
      }
    }
    fetchUserProfile();
  })
  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login")
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://ecommerceapi-qlq3.onrender.com/orders/${userId}`)
        const orders = response.data.orders
        setOrders(orders)
        setLoading(false)
      } catch(error) {
        
      }
      fetchOrders()
    }
  })
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView>
        <Text className='text-[24px] font-normal'>Welcome <Text className='font-semibold'>{user?.name}</Text></Text>
        <View className='flex-row items-center gap-[10px] mt-[12px]'>
          <TouchableOpacity className='p-[10px] bg-[#E0E0E0] rounded-2xl flex-1'>
            <Text className='text-center'>Your Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-[10px] bg-[#E0E0E0] rounded-2xl flex-1'>
            <Text className='text-center'>Your Acccount</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center gap-[10px] mt-[12px]'>
          <TouchableOpacity className='p-[10px] bg-[#E0E0E0] rounded-2xl flex-1'>
            <Text className='text-center'>Buy Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} className='p-[10px] bg-[#E0E0E0] rounded-2xl flex-1'>
            <Text className='text-center'>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}