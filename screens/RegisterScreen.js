import { View, Text, Image, KeyboardAvoidingView, TextInput, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");
    const navigation = useNavigation()

    const handleRegister = () => {
        const user = { name: name, email: email, password: password }
        axios.post("https://ecommerceapi-qlq3.onrender.com/register", user).then((response) => {
            console.log(response);
            Alert.alert("Registration Successful", "You have registered successfully");
            setName("");
            setEmail("")
            setPassword("")
        }).catch((error) => {
           console.log("Registration failed",error)
            Alert.alert("Registration Error", "an error occurred during registration");
        })
    }
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
            <View>
                <Image
                    style={{ width: 150, height: 100 }}
                    source={{
                        uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
                    }}
                />
            </View>
            <KeyboardAvoidingView>
                <View className='flex-row justify-center items-center'>
                    <Text className='font-bold text-[17px] mt-[12px] text-[#041E42]'>Register to your Account</Text>
                </View>
                    
                <View className='mt-[70px]'>
                    <View className="flex-col justify-center items-center gap-10">
                        <View className='flex-row justify-center items-center gap-5 bg-[#d0d0d0] py-[5px] rounded-lg mt-[30px]'>
                            <Ionicons name="ios-person" size={24} color="grey" />
                            <TextInput value={name} onChangeText={(text)=>setName(text)} className='w-[300px] my-[18px] text-slate-400' placeholder='enter your name' />
                        </View>
                        <View className='flex-row justify-center items-center gap-5 bg-[#d0d0d0] py-[5px] rounded-lg mt-[30px]'>
                            <MaterialIcons name="email" size={24} color="grey" />
                            <TextInput value={email} onChangeText={(text)=>setEmail(text)} className='w-[300px] my-[18px] text-slate-400' placeholder='enter your email' />
                        </View>
                        <View className='flex-row justify-center items-center gap-5 bg-[#d0d0d0] py-[5px] rounded-lg mt-[30px]'>
                            <AntDesign name="lock" size={24} color="gray" />
                            <TextInput value={password} secureTextEntry={true} onChangeText={(text)=>setPassword(text)} className='w-[300px] my-[18px] text-slate-400' placeholder='enter your password' />
                        </View>
                    </View>
                     <View className='flex-row justify-between gap-5 !-mt-[20px]'>
                            <Text>Keep me logged in?</Text>
                            <Text className='text-[#007fff] font-bold'>Forgot Password</Text>
                    </View>
                    
                    
                     <View className='mt-[70px]'>
                         <Pressable onPress={handleRegister} className='w-[200px] bg-[#FEBE10] rounded-md ml-auto mr-auto p-[15px]'>
                             <Text className='text-center text-white text-[16px] font-bold'>Register</Text>
                        </Pressable>
                         <Pressable className="mt-5" onPress={()=>navigation.goBack()}>
                             <Text className='text-center text-[grey] text-[16px] font-bold'>Already have an account ? Login</Text>
                        </Pressable>
                   </View>
                   
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
  )
}