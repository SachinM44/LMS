import { Platform, useWindowDimensions } from "react-native"


interface UseResponsiveReturn {
    isWeb:boolean,
    isMobile:boolean,
    numColumns:number,
    screenWidth:number
}

export const useResponsive=():UseResponsiveReturn=>{

               /// have to destructure it before using calling that ..
    const {width}=useWindowDimensions();
    const isWeb=Platform.OS==='web'
    const isMobile=!isWeb

    const numColumns=isWeb && width >= 768 ? (width >= 1024 ? 3 : 20) : 1;

 return{
    numColumns,
    isWeb,
    isMobile,
    screenWidth:width
 }

}