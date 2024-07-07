import React, {useState} from "react";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

const List = ({items, removeItem,editItem,handleCheck}) => {

  return (
    <div className="grocery-list">
    {items.map((item)=>{
      const {id, title} = item
      return (
        <article key={id} className="grocery-item">
        <button className="check" onClick={()=> handleCheck(id)}>
        {item.checked ? <MdCheckBox className="box" /> : <MdCheckBoxOutlineBlank  />}  
        </button>
        <p className={item.checked ? 'title-strike' : 'title'}>{title}</p>
        <div className="btn-container">
          <button type="button" className="edit-btn" onClick={()=> editItem(id)}><RiEdit2Fill className='edit'/></button>
          <button type="button" className="delete-btn" onClick={() => removeItem(id)}><FaTrash className='dustbin'/></button>
        </div>
      </article>
      )
    })}
    </div>
  );
}

export default List;