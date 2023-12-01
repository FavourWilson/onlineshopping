import { View, Text, Pressable,Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducer/CartReducer';

export default function ProductItems({ item }) {
  const dispatch = useDispatch();
   const [addedToCart,setAddedToCart] = useState(false)
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  
  return (
      <Pressable className='mx-[20px] my-[25px]'>
          <Image className='w-[150px] h-[150px] resize-contain' source={{ uri: item?.image }} />
          <Text numberOfLines={1} className='w-[150px] mt-[10px]'>{item?.title}</Text>
          <View className='mt-[5px] flex-row items-center justify-between'>
              <Text className='text-[15px] font-bold'>₦{ item?.price}</Text>
              <Text className='text-[#FFC72C] font-bold'>{ item?.rating?.rate} rating</Text>
          </View>
          <Pressable onPress={()=>addItemToCart(route?.params?.item)} className='bg-[#FFC72C] p-[10px] rounded-[20px] justify-center items-center my-[10px] mt-[10px]'>
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
    </Pressable>
  )  
}