import { useState } from 'react'
import clothingService from '../services/clothes.js'

const ClothingForm = ({ clothes, setClothes, showSuccessMsg, showErrorMsg }) => {
  const [name, setName] = useState('') 

  const addClothing = async (event) => {
    event.preventDefault()

    try {
      const clothingObject = await 
        clothingService
          .create({
            name
          })

      setClothes(clothes.concat(clothingObject))
      showSuccessMsg(`a new piece called ${ clothingObject.name } added`)

      setName('')
    } catch ({ response }) {
        showErrorMsg(response.data.error)
    }
  }


return (
  <div>
    <h2>add a new piece</h2>
    <form onSubmit={addClothing}>
      name: {}
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
    <button type="submit">add</button>
  </form>  
  </div>
)}

export default ClothingForm