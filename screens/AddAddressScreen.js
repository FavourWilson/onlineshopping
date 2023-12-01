import { View, Text, Pressable, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../components/SearchInput";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../userContext";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
export default function AddAddressScreen() {
  const navigation = useNavigation()
  const [addresses,setAddresses] = useState([])
  const [userId, setUserId] = useContext(UserType)
  useEffect(() => {
    fetchAddresses();
  }, [])
  
  const fetchAddresses = async() => {
    try {
      const response = await axios.get(`https://ecommerceapi-qlq3.onrender.com/addresses/${userId}`)
      const { addresses } = response.data
      setAddresses(addresses)
    } catch (error) {
      console.log("error",error)
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    },[])
  )
  console.log("address", addresses);
  return (
    <SafeAreaView className="flex-1">
      <SearchInput />
      <ScrollView showsVerticalScrollIndicator={false}>
         <View>
        <Text className="text-[20px] font-bold ">Your Address</Text>
              <Pressable
                  onPress={()=>navigation.navigate("Add")}
                  className="flex-row items-center justify-between mt-[10px] border-[#D0D0D0] border-2 border-x-0 py-[7px] px-[5px]">
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          
            {
              addresses?.map((item, index) => (
                <Pressable key={index} className='flex-column border-[#D0D0D0] p-[10px] gap-[5px] my-[10px]'>
                  <View className='flex-row items-center gap-[3px]'>
                    <Text>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text className='text-[15px] text-[#181818]'>{item?.houseNo}, {item?.landmark}</Text>
                  <Text className='text-[15px] text-[#181818]'>{item?.street}</Text>
                  <Text className='text-[15px] text-[#181818]'>Phone No: { item?.mobileNo}</Text>
                  <Text className='text-[15px] text-[#181818]'>Postal Code: {item?.postalCode}</Text>
                  
                  <View className='flex-row items-center gap-[10px] mt-[10px]'>
                    <TouchableOpacity className='bg-[#f5f5f5] py-[10px] px-[10px] rounded-md border-[0.9px] border-[#D0D0D0]'>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-[#f5f5f5] py-[10px] px-[10px] rounded-md border-[0.9px] border-[#D0D0D0]'>
                      <Text>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-[#f5f5f5] py-[10px] px-[10px] rounded-md border-[0.9px] border-[#D0D0D0]'>
                      <Text>Set as Default</Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
              ))
            }
        </Pressable>
      </View>
     </ScrollView>
    </SafeAreaView>
  );
}
