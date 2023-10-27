const Clothing = ({ clothing, deleteClothing }) => {
  const handleDelete = () => {
    if (window.confirm(`Remove garment ${clothing.name}`)) {
      deleteClothing(clothing.id)
    }
  }
    return (
      <div className='clothing-container'>
        <li className='clothing'>{clothing.name}</li>
        <button className='remove-button' onClick={handleDelete}>Remove</button>
    </div>
    )
  }
  
  
export default Clothing