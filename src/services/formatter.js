import { jwtDecode } from "jwt-decode";

const numberFormats = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
});
const numberFormatszero = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 0,
});
export function numberFormat(amt) {
  if (amt == "" || amt == null || amt == undefined) return;
  return numberFormats.format(Number(amt).toFixed(2));
}

export function numberFormatzero(amt) {
  if (amt == "" || amt == null || amt == undefined) return;
  return numberFormatszero.format(Number(amt).toFixed(0));
}

export const toastFormatter = (title='',des='',status='success') => {
         return {
            title: title,
            description: des,
            status,
            duration: 1000,
            isClosable: false,
            position:'top'
         }
};

export const getLoginToken = () => {
    let data = sessionStorage.getItem("token")
  
    return data ? data : null;
}

export const getSessionUserName = () =>{
   const sessionToken = sessionStorage.getItem('token');
   const data = sessionToken?jwtDecode(sessionToken):null
   console.log(data);
     let userName = data?.user_name || null
     return userName
 }
export const getSessionUserID = () =>{
   const sessionToken = sessionStorage.getItem('token');
   const data = sessionToken?jwtDecode(sessionToken):null
     let id = data?.UserId || null
     return id
 }
export const getSessionprofilePhotoUrl = () =>{
   const sessionToken = sessionStorage.getItem('token');
   const data = sessionToken?jwtDecode(sessionToken):null
     let id = data?.profilePhotoUrl || null
     return id
 }

 export const DateFixer = (date) => {
   const dateObject = new Date(date);
  const year = dateObject.getFullYear();
 const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
 const day = dateObject.getDate().toString().padStart(2, "0");
 
 const newDate = `${day}-${month}-${year}`
   return newDate;
 };

  export const DatetimeFixer = (date) => {
   const dateObject = new Date(date);
  const year = dateObject.getFullYear();
 const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
 const day = dateObject.getDate().toString().padStart(2, "0");
 let hours = dateObject.getHours().toString().padStart(2, "0");
 const minutes = dateObject.getMinutes().toString().padStart(2, "0");
 const seconds = dateObject.getSeconds().toString().padStart(2, "0");
   let amPm = "AM";
 
 // Determine whether it's AM or PM
 if (Number(hours) >= 12) {
   amPm = "PM";
   // Convert hours from 24-hour format to 12-hour format
   if (Number(hours) > 12) {
     hours = (Number(hours) - 12).toString().padStart(2, "0");
   }
 }
 
 const newDate = `${day}-${month}-${year} , ${hours}:${minutes}:${seconds} ${amPm}`
   return newDate;
 };

 export function datePickerDate(inputDateStr) {
  const dateObj = new Date(inputDateStr);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const formattedDateStr = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return formattedDateStr;
}