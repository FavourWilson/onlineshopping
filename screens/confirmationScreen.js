import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../userContext'
import axios from 'axios'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { cleanCart } from '../reducer/CartReducer'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
import '@walletconnect/react-native-compat';
import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
export default function ConfirmationScreen() {
  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
  ]
  const cart = useSelector((state) => state.cart.cart)
  const projectId = '0d6bb01fb2c7dbb284c1a2d376a481b8'
  const metadata = {
  name: 'onlineshopping',
  description: 'Connect your wallet to make payment',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig
})
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0)
  const [userId, setUserId] = useContext(UserType)
  const [currentStep, setCurrentStep] = useState(0)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState('')
  const [option, setOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://ecommerceapi-qlq3.onrender.com/addresses/${userId}`,
      )
      const { addresses } = response.data
      setAddresses(addresses)
    } catch (error) {
      console.log('error', error)
    }
  }
  const walletConnector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    dappName: 'OnlineShoppingApp'
  })

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      }

      const response = await axios.post(
        'https://ecommerceapi-qlq3.onrender.com/orders',
        orderData,
      )

      walletConnector.createSession()

      walletConnector.on('session', (error, payload) => {
        if (error) {
          // handle error
        } else {
          // use the payload data to update your app's state
        }
      })
      if (response.status === 200) {
        navigation.navigate('Order')
        dispatch(cleanCart())
        console.log('order created successfully', response.data)
      } else {
        console.log('errorss creating order', response.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  //   const pay = async () => {
  //       const response = await got.post("https://api.flutterwave.com/v3/payments", {
  //     headers: {
  //         Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
  //     },
  //     json: {
  //         // other fields...
  //         payment_options: "card, ussd, mobilemoneyghana",
  //     }
  // });
  //   }
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mt-[55px]">
        <View className="flex-row items-center mb-[20px] justify-between">
          {steps?.map((step, index) => (
            <View key={index} className="justify-center items-center">
              {index > 0 && (
                <View
                  className={`flex-1 h-[2px] bg-green-600  ${index <= currentStep && 'bg-green-600'
                    }`}
                />
              )}
              <View
                className={`w-[30px] h-[30px] rounded-[15px] bg-[#ccc] flex-row items-center justify-center ${index < currentStep && 'bg-green-600'
                  }`}
              >
                {index < currentStep ? (
                  <Text className="text-[16px] font-bold text-white">
                    &#10003;
                  </Text>
                ) : (
                  <Text className="text-[16px] font-bold text-white">
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text className="text-center mt-[8px]">{step.title}</Text>
            </View>
          ))}
        </View>
        {currentStep == 0 && (
          <View className="my-[20px]">
            <Text className="text-[16px] font-bold">
              Select Delivery Address
            </Text>
            <Pressable>
              {addresses?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="border-[1px] border-[#D0D0D0] rounded-md p-[10px] flex-row items-center gap-[5px] pb-[17px] my-[5px]"
                >
                  {selectedAddress && selectedAddress._id === item?._id ? (
                    <FontAwesome
                      name="dot-circle-o"
                      size={24}
                      color="#000397"
                    />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedAddress(item)}
                      name="circle"
                      size={24}
                      color="gray"
                    />
                  )}

                  <View>
                    <View className="flex-row items-center gap-[3px]">
                      <Text>{item?.name}</Text>
                      <Entypo name="location-pin" size={24} color="red" />
                    </View>
                    <Text className="text-[15px] text-[#181818]">
                      {item?.houseNo}, {item?.landmark}
                    </Text>
                    <Text className="text-[15px] text-[#181818]">
                      {item?.street}
                    </Text>
                    <Text className="text-[15px] text-[#181818]">
                      Phone No: {item?.mobileNo}
                    </Text>
                    <Text className="text-[15px] text-[#181818]">
                      Postal Code: {item?.postalCode}
                    </Text>

                    <View className="flex-row items-center gap-[10px] mt-[10px]">
                      <TouchableOpacity className="bg-[#f5f5f5] py-[10px] px-[10px] rounded-md border-[0.9px] border-[#D0D0D0]">
                        <Text>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-[#f5f5f5] py-[10px] px-[10px] rounded-md border-[0.9px] border-[#D0D0D0]">
                        <Text>Remove</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-[#f5f5f5] py-[10px] px-[10px] rounded-md border-[0.9px] border-[#D0D0D0]">
                        <Text>Set as Default</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      {selectedAddress && selectedAddress._id === item?._id && (
                        <TouchableOpacity
                          onPress={() => setCurrentStep(1)}
                          className="bg-[#008397] p-[10px] rounded-3xl justify-center items-center mt-[10px]"
                        >
                          <Text className="text-center text-white">
                            Deliver to this address
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </Pressable>
          </View>
        )}

        {currentStep == 1 && (
          <View className="my-[20px]">
            <Text className="text-[20px] font-bold">
              Choose your delivery options
            </Text>
            <View className="flex-row items-center bg-white p-[8px] gap-[7px] border-[#D0D0D0] border-[1px] mt-[10px]">
              {option ? (
                <FontAwesome name="dot-circle-o" size={24} color="#000397" />
              ) : (
                <Entypo
                  onPress={() => setOptions(!option)}
                  name="circle"
                  size={24}
                  color="gray"
                />
              )}

              <Text className="flex-1">
                <Text className="text-green-600 font-semibold">
                  Tomorrow by 10am{' '}
                </Text>
                - FREE delivery with your Prime membership
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setCurrentStep(2)}
              className="bg-[#FFC72C] p-[10px] rounded-2xl justify-center items-center mt-[15px]"
            >
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep == 2 && (
          <View className="my-[20px]">
            <Text className="text-[20px] font-bold">
              Select your payment method
            </Text>
            <View className="flex-row items-center bg-white p-[8px] gap-[7px] border-[#D0D0D0] border-[1px] mt-[10px]">
              {selectedOption === 'cash' ? (
                <FontAwesome name="dot-circle-o" size={24} color="#000397" />
              ) : (
                <Entypo
                  onPress={() => setSelectedOption('cash')}
                  name="circle"
                  size={24}
                  color="gray"
                />
              )}

              <Text className="flex-1">Cash on Delivery</Text>
            </View>
            <View className="flex-row items-center bg-white p-[8px] gap-[7px] border-[#D0D0D0] border-[1px] mt-[10px]">
              {selectedOption === 'card' ? (
                <FontAwesome name="dot-circle-o" size={24} color="#000397" />
              ) : (
                 <WagmiConfig config={wagmiConfig}>
                  <Web3Modal />
                </WagmiConfig>
              )}

              <Text className="flex-1">Crypto Payment</Text>
            </View>
            <View className="flex-row items-center bg-white p-[8px] gap-[7px] border-[#D0D0D0] border-[1px] mt-[10px]">
              {selectedOption === 'card' ? (
                <FontAwesome name="dot-circle-o" size={24} color="#000397" />
              ) : (
                <SessionProvider>
                  <WalletConnect />
                  <QRCodeModal />
                  <View>
                    {/* Your app's components go here */}
                  </View>
                </SessionProvider>
              )}

              <Text className="flex-1">Debit Card</Text>
            </View>
            <TouchableOpacity
              onPress={() => setCurrentStep(3)}
              className="bg-[#FFC72C] p-[10px] rounded-2xl justify-center items-center mt-[15px]"
            >
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep == 3 && selectedOption === 'cash' && (
          <View className="my-[20px]">
            <Text className="text-[20px] font-bold">Order Now</Text>

            <View className="flex-row items-center bg-white p-[8px] gap-[7px] border-[#D0D0D0] border-[1px] mt-[10px]">
              <View>
                <Text className="text-[17px] font-bold">
                  {' '}
                  save 5% and never run out
                </Text>
                <Text className="text-[15px] font-bold">
                  Turn on auto deliveries
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
            <View className="bg-white p-[8px] border-[#D0D0D0] border-[1px] mt-[10px]">
              <Text>Shipping to {selectedAddress?.name}</Text>
              <View className="flex-row justify-between items-center mt-[8px]">
                <Text className="text-[16px] font-semibold text-gray-500">
                  Items
                </Text>
                <Text className="text-[16px] text-gray-500">₦{total}</Text>
              </View>
              <View className="flex-row justify-between items-center mt-[8px]">
                <Text className="text-[16px] font-semibold text-gray-500">
                  Delivery
                </Text>
                <Text className="text-[16px] text-gray-500">₦0</Text>
              </View>
              <View className="flex-row justify-between items-center mt-[8px]">
                <Text className="text-[20px] font-bold">Order total</Text>
                <Text className="text-[17px] font-bold text-[#c60c30]">
                  ₦{total}
                </Text>
              </View>
            </View>

            <View className="bg-white p-[8px] border-[#D0D0D0] border-[1px] mt-[10px]">
              <Text className="text-[16px] text-gray-500">Pay With</Text>
              <Text className="text-[16px] font-semibold mt-[7px]">
                Pay on delivery (cash)
              </Text>
            </View>

            <TouchableOpacity
              onPress={handlePlaceOrder}
              className="bg-[#FFC72C] p-[10px] rounded-2xl justify-center items-center mt-[15px]"
            >
              <Text>Place Your Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
