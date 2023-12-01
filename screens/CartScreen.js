import { View, Text, Pressable, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../components/SearchInput'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { decrementQuantity, incrementQuantity, removeFromCart } from '../reducer/CartReducer'
import { useNavigation } from '@react-navigation/native'

export default function CartScreen() {
  const cart = useSelector((state) => state.cart.cart)
  
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0)
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item))
  }
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item))
  }
  const deleteItem = (item) => {
    dispatch(removeFromCart(item))
  }

  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1">
      <SearchInput />
      <ScrollView showsVerticalScrollIndicator={ false}>
         <View className="my-[10px]">
        {cart?.map((item, index) => (
          <View
            key={index}
            className="bg-white mx-[10px] border-2 border-x-0 border-b-[#F0F0F0]"
          >
            <TouchableOpacity className="my-[10px] flex-row justify-between">
              <View>
                <Image
                  className="w-[140px] h-[140px] resize-contain"
                  source={{ uri: item?.image }}
                />
              </View>
              <View>
                <Text numberOfLines={2} className="w-[150px] mt-[10px]">
                  {item?.title}
                </Text>
                <Text className="text-[20px] font-bold mt-[6px]">
                  ₦{item?.price}
                </Text>
                <Image
                  style={{ width: 30, height: 30, resizeMode: 'contain' }}
                  source={{
                    uri:
                      'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                  }}
                />
                <Text style={{ color: 'green' }}>In Stock</Text>
              </View>
            </TouchableOpacity>
            <Pressable className="mt-[15px]  mb-[10px] flex-row items-center px-[5px] gap-[10px]">
              <View className="flex-row items-center px-[10px] py-[10px] rounded-md">
                {item?.quantity > 1 ? (
                   <TouchableOpacity onPress={()=> decreaseQuantity(item)} className="bg-[#D8D8D8] p-[7px] rounded-l-[6px] rounded-r-[6px]">
                  <Feather name="minus" size={24} color="black" />
                </TouchableOpacity>
                ) : (
                     <TouchableOpacity onPress={()=>deleteItem(item)} className="bg-white py-[10px] px-[10px] rounded-md border-[#C0C0C0] border-[0.9px]">
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
                )}
                
                <Pressable className="bg-white px-[18px] py-[6px]">
                  <Text>{item?.quantity}</Text>
                </Pressable>
               <TouchableOpacity onPress={()=>increaseQuantity(item)} className="bg-[#D8D8D8] p-[7px] rounded-l-[6px] rounded-r-[6px]">
                  <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
              </View>

              
            </Pressable>
            <Pressable className="flex-row items-center gap-[10px]  mb-[20px]">
              <TouchableOpacity className="bg-white py-[10px] px-[10px] rounded-md border-[#C0C0C0] border-[0.9px]">
                <Text>Save for later</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white py-[10px] px-[10px] rounded-md border-[#C0C0C0] border-[0.9px]">
                <Text>See more like this</Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        ))}
      </View>
      <Text className="h-[1px] border-[#D0D0D0] border-[1px] mt-[10px]" />
      <View className="p-[10px] flex-row items-center">
        <Text className="text-[18px] font-[400]">SubTotal: </Text>
        <Text className="text-[20px] font-bold">₦{total}</Text>
      </View>
      <Text>EMI details Available</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Confirm")} className="bg-[#FFC72C] p-[10px] rounded-md justify-center items-center my-[10px] mt-[10px]">
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </TouchableOpacity>
     </ScrollView>
    </SafeAreaView>
  )
}
