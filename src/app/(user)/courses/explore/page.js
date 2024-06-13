'use client'
import React, { useEffect, useState } from 'react'
import styles from './Explore.module.scss'
import SignUpCards from '@/components/usersComponents/SignUpCard/SignUpCards'
import { Spinner } from '@/components/usersComponents/Spinner/Spinner'
import { useApp } from '@/features/AppContext/AppContext'
import { FrownIcon } from 'lucide-react'
import { getNumberOfClasses } from '@/utils/utils'

function Page() {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { searchTerm } = useApp()

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/courses')
      .then(data => data.json())
      .then(data => {
        setCourses(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/categories')
      .then(data => data.json())
      .then(data => {
        if (data.type === 'success') {
          setCategories(data.data)
          setLoading(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory !== categoryId) {
      setSelectedCategory(categoryId)
    } else {
      setSelectedCategory(null) // Deselect if category is already selected
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory ? course.Categoria.Id_Cat === selectedCategory : true
    const matchesSearchTerm = course.Nom_Cur.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearchTerm
  })

  return (
    loading ? <Spinner /> : (
      <>
      <div className='flex gap-1 items-center overflow-auto py-2'>
        <div className='font-semibold mr-3'>Categorias: </div>
        <div className='flex flex-wrap max-h-[40px] gap-2 overflow-hidden'>
          <button onClick={() => setSelectedCategory(null)} className='p-2 bg-slate-200 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all duration-200'>Todos</button>
          {categories.map((category) => {
            return (
              <button onClick={() => handleCategoryClick(category.Id_Cat)} key={category.Id_Cat} className='p-2 bg-slate-200 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all duration-200'>{category.Nom_Cat}</button>
            )
          })}
        </div>
      </div>
      <hr className='my-2' />
      <div className={styles.container_grid}>
        {filteredCourses.map((course, index) => {
          const totalClases = getNumberOfClasses(course)
          return (
            <SignUpCards desc={course.Desc_Cur} clases={totalClases} href={`/courses/${course.Id_Cur}`} key={index} title={course.Nom_Cur} img={course.Fot_Cur || '/defaultBackground.webp'} category={course.Categoria.Nom_Cat} />
          )
        })}
      </div>
      {filteredCourses.length <= 0 && !loading && <div className='w-full flex flex-col items-center justify-center gap-2 font-medium text-azulSena'><FrownIcon size={28}/>Ups, no se encontraron cursos.</div>}
    </>
    )
  )
}

export default Page