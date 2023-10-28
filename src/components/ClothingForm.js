import { useState } from 'react'
import clothingService from '../services/clothes.js'

const ClothingForm = ({ clothes, setClothes, showSuccessMsg, showErrorMsg, clothingFormRef }) => {
  const [name, setName] = useState('')
  const [info, setInfo] = useState('')
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')

  const addClothing = async (event) => {
    event.preventDefault()

    try {
      clothingFormRef.current.toggleVisibility()

      const clothingObject = await
      clothingService
        .create({
          name,
          info,
          size,
          price
        })
      setClothes(clothes.concat(clothingObject))
      showSuccessMsg(`a new piece called ${ clothingObject.name } added`)

      setName('')
      setInfo('')
      setSize('')
      setPrice('')
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    }
  }


  return (
    <div>
      <h2>add a new piece</h2>
      <form onSubmit={addClothing}>
        <div>
        name: {}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
        info: {}
          <input
            value={info}
            onChange={({ target }) => setInfo(target.value)}
          />
        </div>
        <div>
        size: {}
          <input
            value={size}
            onChange={({ target }) => setSize(target.value)}
          />
        </div>
        <div>
        price: {}
          <input
            value={price}
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )}

export default ClothingForm