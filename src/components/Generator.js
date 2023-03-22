import React, { useState } from 'react'
import {VscDiffAdded} from "react-icons/vsc"
import { useSelector, useDispatch} from 'react-redux'
import { generator } from '../features/Add';
import { nanoid } from '@reduxjs/toolkit';


function Generator() {
  const [typed, setTyped] = useState('')
  const addDispatch = useDispatch();
  const access = useSelector(prev => prev.list.value.tasks)
  function handleAdd(e){
    e.preventDefault();
    typed.length === 0 || typed[0] ===" " ? addDispatch(generator(access)) : addDispatch(generator([...access,{ title:typed, checked:false,trash:false, id:nanoid()}]));
    setTyped('')
  }
  
  return (
    <div className="flex justify-center">
      <form className="border border-gray-500 w-3/5 flex gap-21 mt-12">
        <div className="w-11/12 flex flex-col justify-center p-2">
          <input value={typed} onChange={(e)=>setTyped(e.target.value)} className="outline-none"  type="text" />
        </div>
        <div className="flex flex-col justify-center">
          <button onClick={handleAdd}><VscDiffAdded/></button>
        </div>
      </form>
    </div>
  )
}

export default Generator