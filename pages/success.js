import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  
  const getOrderDetails = async () => {
    const res = await axios.get(`/api/order/${session_id}`)
  }
  if(session_id !== undefined){
    getOrderDetails()  
  }
  
  return (
    <div>
      <h1 style={{textAlign : 'center'}}>Thank You For Order</h1>
    </div>
  )
}

export default success