import * as React from 'react'
import './Categories.css'

export default function Categories({item, handleCategoryOnClick}) {
  return (
    <p className='link-direct' onClick={() => {handleCategoryOnClick(item.name)}}>{item.name} </p> 
  )
}