'use client'
import React from 'react'
import styles from './Explore.module.scss'
import { useEffect, useState } from 'react'
import SignUpCards from '@/components/usersComponents/SignUpCard/SignUpCards'
import { Spinner } from '@/components/usersComponents/Spinner/Spinner'
import Link from 'next/link'


function Page() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    try {
      fetch('http://localhost:3000/api/v1/courses')
        .then(data => data.json())
        .then(data => {
          setCourses(data.data)
          setLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <div className='flex gap-2 items-center overflow-auto py-2'>
        <div className='font-semibold mr-3'>Categorias: </div>
        <Link href={'#'} className='p-2 bg-slate-200 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all duration-200'>Todos</Link>
        <Link href={'#'} className='p-2 bg-slate-200 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all duration-200'>Sistemas</Link>
        <Link href={'#'} className='p-2 bg-slate-200 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all duration-200'>Deporte</Link>

      </div>
      <hr className='my-2' />
      <div className={styles.container_grid}>
        {loading ? <Spinner /> : ''}
        {courses.map((course, index) => {
          const name = course.Nom_Cur
          const parseName = name.replaceAll(' ', '-').toLowerCase()
          return (
            <SignUpCards href={`/courses/${course.Id_Cur}`} key={index} title={course.Nom_Cur} img={course.Fot_Cur || '/defaultBackground.webp'} category={course.Categoria.Nom_Cat} />
          )
        })}
      </div>
    </>
  )
}

export default Page