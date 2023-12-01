import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import React, { useState } from 'react'
import Additem from './Additem';
import Searchitem from './Searchitem';

function App() {

  const [items,setItems] = useState(JSON.parse(localStorage.getItem("to_do_list"))
  );

const [newItem, setNewItem] = useState('')
const [search, setSearch] = useState('')

const addItem = (item)=>{
  const id = items.length?items[items.length -1].id+1 : 1;
  const addNewItem = {id, checked:false, item}
  const listItems = [...items, addNewItem]
  setItems(listItems)
  localStorage.setItem("to_do_list", JSON.stringify(listItems))
}

const handleCheck = (id) => {
    const listItems = items.map((item)=>
    item.id===id ? {...item,checked:!item.checked}:item)
    setItems(listItems)
    localStorage.setItem("to_do_list", JSON.stringify(listItems))
}

const handleDelete = (id)=> {
    const removeItems = items.filter((item)=> 
    item.id!==id)
    setItems(removeItems)
    localStorage.setItem("to_do_list", JSON.stringify(removeItems))
}

const handleSubmit = (e) =>{
  e.preventDefault()
  if (!newItem) return;
  console.log(newItem)
  addItem(newItem)
  setNewItem('')
}


  return(
    <div className='App'>
      <Header/>
      <Additem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <Searchitem
        search = {search}
        setSearch = {setSearch}
      />
      <Content 
        items = {items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer
      length = {items.length}/>
    </div>
  )
}

export default App;
