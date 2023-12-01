import { View, Text, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

    useEffect(() => {
        const checkLoginStatus = async() => {
            try {
                const token = await AsyncStorage.getItem("authToken")
                if (token) {
                    navigation.replace("Main")
                }
            } catch (error) {
                console.log("error message",error)
            }
        }
        checkLoginStatus()
    },[])
    const handleLogin = () => {
        const user = { email: email, password: password }
        axios.post('https://ecommerceapi-qlq3.onrender.com/login', user).then((response) => {
            console.log(response)
            const token = response.data.token
            AsyncStorage.setItem("authToken", token);
            navigation.replace("Main")
        }).catch((error) => {
            Alert.alert("Login Error", "Invalid Email")
            console.log(error);
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
                    <Text className='font-bold text-[17px] mt-[12px] text-[#041E42]'>Login into your Account</Text>
                </View>
                    
                <View className='mt-[70px]'>
                    <View className="flex-col justify-center items-center gap-10">
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
                         <Pressable onPress={handleLogin} className='w-[200px] bg-[#FEBE10] rounded-md ml-auto mr-auto p-[15px]'>
                             <Text className='text-center text-white text-[16px] font-bold'>Login</Text>
                        </Pressable>
                         <Pressable className="mt-5" onPress={()=>navigation.navigate("Register")}>
                             <Text className='text-center text-[grey] text-[16px] font-bold'>Don't have an account ? SignUp</Text>
                        </Pressable>
                   </View>
                   
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}