'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import styles from './Mycourses.module.scss'
import SignUpCards from '@/components/usersComponents/SignUpCard/SignUpCards'
import { Spinner } from '@/components/usersComponents/Spinner/Spinner'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import MyCoursesCard from '@/components/usersComponents/MyCourseCard/MyCoursesCard'


function Page() {
  const [inscriptions, setInscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const authState = useSelector(state => state.auth)
  const user = authState.user
  const token = getCookie('sessionToken')

  useEffect(() => {
    try {
      fetch(`http://localhost:3000/api/v1/inscription/user/${user.Id_User}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then(data => data.json())
        .then(data => {
          setInscriptions(data.data)
          setLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }, [user.Id_User, token])

  return (
    loading ? <Spinner />
      : (
        <>
          <div className='my-6'>
            <h1 className=' text-3xl font-bold'>Mis cursos</h1>
            <p>Aquí encontrarás todos los cursos en los que estás inscrito.</p>
          </div>
          <div className={inscriptions.length <= 0 ? 'flex justify-center items-center' : styles.container_grid}>
            {inscriptions.length <= 0 ? <div className='flex items-center gap-1'><span className='font-medium'>No te has inscrito en ningún curso.</span><Link href={"/courses/explore"} className='bg-azulSecundarioSena text-azulSena font-semibold hover:bg-black hover:text-white transition-all duration-150 px-2 py-1 rounded-lg'>Explorar</Link></div> : (
              inscriptions.map(inscription => {
                return <MyCoursesCard progreso={inscription.Prog_Cur} desc={inscription.Curso.Des_Cur} href={`/courses/${inscription.Id_Cur_FK}`} key={inscription.Id_Cur_FK} title={inscription.Curso.Nom_Cur} img={inscription.Curso.Fot_Cur || '/defaultBackground.webp'} category={inscription.Curso.Categoria.Nom_Cat} />
              })
            )}
          </div>
        </>
      )
  )
}

export default Page