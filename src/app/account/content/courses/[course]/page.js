import React from 'react'

async function getCourse() {
  const res = await fetch('/api/courses')
  const courses = await res.json()
  return courses
}

function DynamicCoursePage() {
  return (
    <div>page</div>
  )
}

export default DynamicCoursePage