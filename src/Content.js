import ItemsList from "./ItemsList";


const Content = ({items,handleCheck,handleDelete}) => {  
  return (
    <>
        {(items.length)?(
        <ItemsList
        items = {items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
        />
        ):<p>Your list is empty</p>}   
    </>
  )
}

export default Content