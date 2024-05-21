'use client'
import CardCategories from '@/components/usersComponents/CardCategories/CardCategories'
import { Footer } from '@/components/usersComponents/Footer/Footer'
import { NavHome } from '@/components/usersComponents/Nav/NavHome'
import PageVisitors from '@/components/usersComponents/PageVisitors/PageVisitors'
import SignUpCards from '@/components/usersComponents/SignUpCard/SignUpCards'
import { Spinner } from '@/components/usersComponents/Spinner/Spinner'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    try {
      setIsMounted(true)
    } catch (error) {
      console.log(error)
      setIsMounted(true)
    }
  }, [])

  return (
    isMounted ? (
      <>
      <NavHome />
      <PageVisitors />
      <Footer />
    </>) : <div className='h-screen flex justify-center items-center'><Spinner /></div>
  );
}
