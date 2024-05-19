import { useEffect, useState } from "react";

export const useAllCourses = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetch('http://localhost:3000/api/v1/courses')
         .then(res => res.json())
         .then((res) => {
            setData(res.data);
         })
         .catch(console.log)
   }, []);

   return {
      data
   }
}