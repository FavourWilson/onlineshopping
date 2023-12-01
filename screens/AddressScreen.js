import { View, Text, ScrollView, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import { UserType } from '../userContext'
import { useNavigation } from '@react-navigation/native';

import axios from 'axios'
export default function AddressScreen() {
    const [name,setName] = useState("")
    const [mobileNo,setMobileNo] = useState("")
    const [houseNo,setHouseNo] = useState("")
    const [street,setStreet] = useState("")
    const [landmark,setLandmark] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [userId, setUserId] = useContext(UserType)
    const navigation = useNavigation()
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.userid;
          setUserId(userId);
          
        }

        fetchUser();
        
          setTimeout(() => {
            navigation.goBack;
          },500)
    })
    console.log(userId)
    const handleAddAddress = () => {
        const address = { name, mobileNo, houseNo, street, landmark, postalCode };
        axios.post("https://ecommerceapi-qlq3.onrender.com/addresses", { userId, address }).then((response) => {
            Alert.alert("Success", "Addresses added successfully")
            setName("")
            setMobileNo("")
            setHouseNo("")
            setStreet("")
            setLandmark("")
          setPostalCode("")
          
          setTimeout(() => {
            navigation.goBack();

          },500)
        }).catch((error) => {
          Alert.alert("Error","Failed to add address")
          console.log("error",error)
      })
    }
  return (
    <SafeAreaView className='flex-1'>
          <ScrollView>
              <View className='h-[50px] bg-[#00CED1]' />
              <View className='p-[10px] flex-col gap-5'>
                  <View>
                       <Text className='text-[17px] font-bold'>Add a new Address</Text>
                       <TextInput className='p-[10px] border-[#D0D0D0] border-2 mt-[10px] rounded-md' placeholderTextColor={'#D0D0D0'} placeholder='Nigeria'/>
                </View>
                  <View>
                       <Text className='text-[17px] font-bold'>Fullname (First and LastName)</Text>
                       <TextInput value={name} onChangeText={(text)=>setName(text)} className='p-[10px] border-[#D0D0D0] border-2 mt-[10px] rounded-md' placeholderTextColor={'#D0D0D0'} placeholder='John Maxewell'/>
                </View>
                  <View>
                       <Text className='text-[17px] font-bold'>Mobile Number</Text>
                       <TextInput value={mobileNo} onChangeText={(text)=>setMobileNo(text)} className='p-[10px] border-[#D0D0D0] border-2 mt-[10px] rounded-md' placeholderTextColor={'#D0D0D0'} placeholder='0987266932'/>
                </View>
                  <View>
                       <Text className='text-[17px] font-bold'>Flat, House No, Building, Company</Text>
                       <TextInput value={houseNo} onChangeText={(text)=>setHouseNo(text)} className='p-[10px] border-[#D0D0D0] border-2 mt-[10px] rounded-md' placeholderTextColor={'#D0D0D0'} placeholder='john Mark place'/>
                </View>
                  <View>
                       <Text className='text-[17px] font-bold'>Area, Street, Sector, Village</Text>
                       <TextInput value={street} onChangeText={(text)=>setStreet(text)} className='p-[10px] border-[#D0D0D0] border-2 mt-[10px] rounded-md' placeholderTextColor={'#D0D0D0'} placeholder='12 Arisi Street'/>
                </View>
                  <View>
                       <Text className='text-[17px] font-bold'>Landmark</Text>
                       <TextInput value={landmark} onChangeText={(text)=>setLandmark(text)} className='p-[10px] border-[#D0D0D0] border-2 mt-[10px] rounded-md' placeholderTextColor={'#D0D0D0'} placeholder='Bendel Estate Junction'/>
                </View>
                  <View>
                       <Text className='text-[17px] font-bold'>Pincode</Text>
                       <TextInput value={postalCode} onChangeText={(text)=>setPostalCode(text)} className='p-[10px] border-[#D0D0D0] border-2 mt-[10px] rounded-md' placeholderTextColor={'#D0D0D0'} placeholder='330102'/>
                </View>
              </View>
              <TouchableOpacity onPress={handleAddAddress} className='bg-[#FFC72C] p-[10px] rounded-sm justify-center items-center'>
                  <Text className='font-bold'>Add Address</Text>
              </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}