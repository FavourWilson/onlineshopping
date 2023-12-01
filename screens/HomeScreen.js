import {
  View,
  Text,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItems from "../components/ProductItems";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from '@react-navigation/native';
import { deals, list, offers, images } from "../data";
import SearchInput from "../components/SearchInput";
import { useSelector } from "react-redux";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { Entypo,AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../userContext";
import jwtDecode from 'jwt-decode'
export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
   const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [selectedAddress,setSelectedAdress] = useState("")
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const [addresses, setAddresses] = useState([])
    const [userId, setUserId] = useContext(UserType)

  useEffect(() => {
    if (userId) {
      fetchAddresses()
    }
  },[userId,modal])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchData();
  }, []);

  const fetchAddresses = async() => {
    try {
      const response = await axios.get(`https://ecommerceapi-qlq3.onrender.com/addresses/${userId}`)
      const { addresses } = response.data
      setAddresses(addresses)
    } catch (error) {
      console.log("error",error)
    }
  }

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
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

 
  return (
    <>
      <SafeAreaView
        className="flex-1 bg-white"
        style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}
      >
        <ScrollView>
          <SearchInput />

          <TouchableOpacity
            onPress={() => setModal(!modal)}
            className="flex-row items-center  gap-[5px] p-[10px] bg-[#AFEEEE]"
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <Pressable>
              {selectedAddress ? (
                <Text>Deliver to {selectedAddress?.name} - { selectedAddress?.street}</Text>
              ):
              <Text className="text-[13px] font-500">
                Add an Address 
              </Text>}
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </TouchableOpacity>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                className="m-[10px] justify-center items-center"
              >
                <Image
                  className="w-[50px] h-[50px] resize-contain"
                  source={{ uri: item.image }}
                />
                <Text className="text-center text-[12px] font-500 mt-[5px]">
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274f"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          <Text className="p-[10px] text-[18px] font-bold">
            Trending Deals of the Week
          </Text>
          <View className="flex-row items-center flex-wrap">
            {deals.map((items, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                key={index}
                className="mx-[10px] flex-row items-center"
              >
                <Image
                  className="w-[180px] h-[180px] resize-contain"
                  source={{ uri: items?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text className="h-[1px] border-[#D0D0D0] border-2 mt-[15px]" />
          <Text className="p-[10px] text-[18px] font-bold">Today's Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                key={index}
                className="mx-[10px] items-center justify-center"
              >
                <Image
                  className="w-[150px] h-[150px] resize-contain"
                  source={{ uri: item?.image }}
                />

                <View className="bg-[#E31837] px-[5px] w-[130px] justify-center items-center mt-[10px] rounded-md">
                  <Text className="text-center text-white text-[13px]">
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text className="h-[1px] border-[#D0D0D0] border-2 mt-[15px]" />

          <View
            className={`mx-[10px] mt-[10px] w-[45%] `}
            style={{
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              className="border-[#B7B7B7]"
              style={{
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              // placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <View className="flex-row items-center flex-wrap">
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItems item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModal(!modal)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModal(!modal)}
        visible={modal}
        onTouchOutside={() => setModal(!modal)}
      >
        <ModalContent className="w-full h-[400px]">
          <View className="mb-[8px]">
            <Text className="text-[16px]">Choose your location</Text>
            <Text className="mt-[5px] text-[16px] text-slate-400">
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {addresses?.map((item, index) => (
               <TouchableOpacity
                 key={index}
                 onPress={() => setSelectedAdress(item)}
                 className='w-[140px] h-[140px] border-[#D0D0D0] border-[1px] p-[10px] justify-center items-center gap-3 mr-[15px] mt-[10px]'
                style={{
                  backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => {
                setModal(false)
                navigation.navigate("Address")
              }}
              className="w-[140px] h-[140px] border-[#D0D0D0] mt-[10px] border-2 p-[10px] justify-center items-center">
              <Text className="text-center text-[#0066b2] font-500">
                Add an address or pick-up point
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View className="flex-column gap-[7px] mb-[13px]">
            <View className="flex-row items-center gap-[5px]">
              <Entypo name="location-pin" size={24} color="#0066b2" />
              <Text className="text-[#0066b2]">
                Enter the pincode of your area
              </Text>
            </View>
            <View className="flex-row items-center gap-[5px]">
              <Ionicons name="locate-sharp" size={24} color="#0066b2" />
              <Text className="text-[#0066b2]">Use My Current Location</Text>
            </View>
            <View className="flex-row items-center gap-[5px]">
              <AntDesign name="earth" size={24} color="#0066b2" />
              <Text className="text-[#0066b2]">Deliver Outside Warri</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}
