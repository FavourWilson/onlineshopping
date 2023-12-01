import { View, Text, ScrollView, ImageBackground, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../reducer/CartReducer';
export default function () {
  const route = useRoute();
  const { width } = Dimensions.get("window")
  const navigation = useNavigation()
  const height = (width * 100) / 100

  const dispatch = useDispatch()
  const addItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false)
    },60000)
  }
  const [addedToCart,setAddedToCart] = useState(false)
  const cart = useSelector((state) => state.cart.cart)
  
  
  return (
    <ScrollView showsHorizontalScrollIndicator={false} className='flex-1 mt-[55px] bg-white'>
      <SearchInput />
      <ScrollView horizontal showsHorizontalScrollIndicator={ false}>
        {route?.params?.carouselImages.map((item, index) => (
          <ImageBackground className={`mt-[25px]`} style={{width,height}} source={{uri:item}} key={index}>
            <View className='p-[20px] flex-row items-center  justify-between'>
              <View classsName='w-[40px] h-[40px] rounded-full bg-[#C60C30] justify-center items-center flex-row'>
                 <Text className='text-white text-center font-600 text-[12px]'>20%</Text>
              </View>
              <View className='w-[40px] h-[40px] rounded-full bg-[#E0E0E0] justify-center items-center flex-row'>
                  <MaterialCommunityIcons name="share-variant" size={24} color="black" />
              </View>
            </View>
            <View className='w-[40px] h-[40px] rounded-full bg-[#E0E0E0] justify-center items-center flex-row mt-auto ml-[20px] mb-[20px]'>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
          ))}
      </ScrollView> 

      <View className='p-[10px]'>
        <Text className='text-[15px] font-500'>{ route?.params?.title}</Text>
        <Text className='text-[15px] font-500'>₦{route?.params?.price}</Text>
       
      </View>
      <Text className='h-[1px] border-[#D0D0D0] border-2' />
      <View className='flex-row items-center p-[10px]'>
        <Text>Color:</Text>
        <Text className='text-[15px] font-bold'>{ route?.params?.color}</Text>
      </View>
      <View className='flex-row items-center p-[10px]'>
        <Text>Size:</Text>
        <Text className='text-[15px] font-bold'>{ route?.params?.size}</Text>
      </View>
      <Text className='h-[1px] border-[#D0D0D0] border-2' />
      <View className='p-[10px]'>
        <Text className='text-[15px] font-bold my-[5px]'>Total: ₦ {route?.params?.price}</Text>
        <Text className='text-[#00CED1]'>FREE Delivery Tomorrow by 3pm. Order within 10hrs 30mins</Text>
      </View>
      <View className='flex-row my-[5px] items-center gap-[5px]'>
        <Ionicons name="location" size={24} color="black" />
        <Text className='text-[15px] font-500'>Deliver To Ugborikoko - Effurun 330102</Text>
      </View>
      <Text className='text-[green] mx-[10px] font-500'>In Stock</Text>
      <Pressable onPress={()=>addItemToCart(route?.params?.item)} className='bg-[#FFC72C] p-[10px] rounded-md justify-center items-center my-[10px] mx-[10px]'>
        {
          addedToCart ? (
            <View>
              <Text>Added To Cart</Text>
            </View>
          ): (
            <Text>Add To Cart</Text>
          )
          }
      </Pressable>
      <Pressable className='bg-[#FFAC1C] p-[10px] rounded-md justify-center items-center my-[10px] mx-[10px]'>
          <Text>Buy Now</Text>
      </Pressable>
     
    </ScrollView>
  )
}