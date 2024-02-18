import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import React, { useState, useEffect } from 'react'
import Additem from './Additem';
import Searchitem from './Searchitem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = "https://65d1a444987977636bfb507f.mockapi.io/ToDoList";
  const [items,setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setfetchError] = useState(null)
  const [isLoading, setisLoading] = useState(true)

useEffect(()=>{
   const fetchItems = async ()=>{
    try{
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Data not received");
      const listItems = await response.json();
      setItems(listItems);
      setfetchError(null)
    }catch(err){
      setfetchError(err.message)
    }finally{
      setisLoading(false)
    }
   }
   setTimeout(()=>{
    (async ()=> await fetchItems())()
   }, 2000)
},[])

const addItem = async (item)=>{
  const id = items.length?items[items.length -1].id+1 : 1;
  const addNewItem = {id, checked:false, item}
  const listItems = [...items, addNewItem]
  setItems(listItems)

  const postOptions = {
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(addNewItem)
  }
  const result = await apiRequest(API_URL,postOptions)
  if(result) setfetchError(result)
}

const handleCheck = async (id) => {
    const listItems = items.map((item)=>
    item.id===id ? {...item,checked:!item.checked}:item)
    setItems(listItems)

    const myItem = listItems.filter((item)=> item.id===id)

    const updateOptions = {
      method:'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,updateOptions)
    if(result) setfetchError(result)
}

const handleDelete = async (id)=> {
    const removeItems = items.filter((item)=> 
    item.id!==id)
    setItems(removeItems)

    const deleteOptions = {
      method : 'DELETE'
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,deleteOptions)
    if(result) setfetchError(result)
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
      <Header title={"To Do List"}/>
      <Additem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <Searchitem
        search = {search}
        setSearch = {setSearch}
      /> 
      <main>
        {isLoading && <p>Loading Items...</p> }
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError &&<Content 
          items = {items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />}
      </main>
      <Footer
      length = {items.length}/>
    </div>
  )
}

export default App;
