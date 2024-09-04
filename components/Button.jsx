import React from 'react';
import { Text, Pressable ,View} from 'react-native';



const CustomButton = ({
  title = '1',
  onClick = ()=>{},
  rippleColor= '#444444f0',
  containerStyle = {},
  textStyle = {}
}) => {
   
  
  return (
   <View className="w-[80px] h-[80px] overflow-hidden bg-[#121212] rounded-full" style={containerStyle}>
    <Pressable 
     onPress={()=>onClick(title)} 
     android_ripple={{
        color:rippleColor
     }}
     className="w-full h-full flex items-center justify-center "
     >
      <Text className="text-gray-100 font-bold text-2xl" style={textStyle}>
        {title}
      </Text>
    </Pressable>
   </View>
  );
};

export default CustomButton;
