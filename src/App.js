import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { GiFallingStar } from "react-icons/gi";
import { BsListNested } from "react-icons/bs";
import { RiH3 } from "react-icons/ri";

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  // const [isCheck, setIsCheck] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
     showAlert(true,'danger',"Please Enter value")
    } else if (name && isEditing) {
      // deal with edit
      setList(list.map((item)=>{
        if(item.id === editID){
          return {...item,title:name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true,'success','Value Changed!')
    } else {
      showAlert(true,'success','Item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name , checked: false};
      setList([...list, newItem])
      setName("")
    }
  };
  
   const handleCheck =(id) =>{
    setList(list.map((item)=>{
      if(item.id === id){
        return {...item,checked: !item.checked}
      }
      return item
    }))
  }
  
  
  const showAlert = (show=false,type="",msg="") =>{
    setAlert({show,type,msg})
  }

  const clearList = ()=>{
    showAlert(true,'danger','empty list')
    setList([])
  }

  const removeItem = (id) =>{
  showAlert(true,'danger','item removed')
  setList(list.filter((item)=> item.id !== id))
  }

  const editItem = (id) =>{
    const specificItem = list.find((item)=> item.id === id);
    setIsEditing(true);
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h3>
          WishList <GiFallingStar />
        </h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Type here your wishes"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
      <div className="grocery-container">
        <List  items={list} removeItem ={removeItem} editItem={editItem} handleCheck={handleCheck}/>
        <button className="clear-btn" onClick={clearList}>Clear all</button>
      </div>
      )}
    </section>
  );
}

export default App;
