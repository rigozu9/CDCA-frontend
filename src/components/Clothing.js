import Togglable from './Togglable'

const Clothing = ({ clothing, deleteClothing }) => {
  const clothingStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDelete = () => {
    if (window.confirm(`Remove garment ${clothing.name}`)) {
      deleteClothing(clothing.id)
    }
  }

  return (
    <div style={clothingStyle}>
      <div>
        {clothing.name}
        <Togglable buttonLabel="View More" cancelLabel="Hide">
          <div style={{ paddingTop: 10 }}>
            <p>Info: {clothing.info}</p>
            <p>Size: {clothing.size}</p>
            <p>Price: {clothing.price}</p>
            <button className='remove-button' onClick={handleDelete}>Remove</button>
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Clothing
