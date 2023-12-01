import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function SearchInput() {
  return (
     <View className="bg-[#00CED1] flex-row items-center p-[10px]">
          <Pressable className="flex-row flex-1 bg-white gap-[10px] items-center h-[38px] rounded-md my-[7px]">
            <AntDesign
              className="p-[10px]"
              name="search1"
              size={24}
              color="black"
            />
            <TextInput placeholder="search" size={24} color={24} />
          </Pressable>
          <Feather name="mic" size={24} color="black" />
    </View>
  )
}