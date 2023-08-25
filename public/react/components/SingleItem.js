import React, { useEffect, useState } from 'react'
import { fetchSingleItem } from '../apis'
import { useNavigate, useParams } from 'react-router-dom'

const SingleItem = () => {
  const navigation = useNavigate()
  const {itemId} = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (itemId) fetchSingleItem(itemId).then((data) => setItem(data))
  }, [itemId])

  if (!item) return null

  return (
      <>
        <h3>{`${item.name} $${item.price}`}</h3>
        <img src={item.image} alt="item-pic"/>
        <p>{item.description}</p>
        <p>{`Tags: ${item.category}`}</p>
        <button onClick={() => navigation(`/items/${itemId}/edit`, {state: {item}})}>Edit Item</button>
      </>
  )
}

export {
  SingleItem
}
