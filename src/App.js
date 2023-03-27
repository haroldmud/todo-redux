import Generator from "./components/Generator"
import { useDispatch, useSelector } from "react-redux"
import {GrFormTrash} from  "react-icons/gr"
import {RiCheckboxBlankCircleLine} from "react-icons/ri"
import {RiCheckboxCircleLine} from "react-icons/ri"
import { checked, editing } from "./features/tasks"
import { deleting } from "./features/tasks"
import {AiOutlineEdit} from "react-icons/ai"
import { useState } from "react"
import {BiCheck} from "react-icons/bi"

export default function Home() {
  const [newItem, setNewItem] = useState("");
  const [check, setCheck]=useState(-1);
  const [edit, setEdit] = useState(null); 
  const task = useSelector(prev => prev.list.value.tasks)
  const checkedDispatch = useDispatch();
  function checkFunc(clickId){
    return  task.map((value, index) => {
      return value.id === clickId ? { ...value,checked: !value.checked}: value;
    })
  }
  function handleDelete(idx){
    let newList = [...task]
    newList.splice(idx,1)
    checkedDispatch(deleting(newList))
  }
  function handleEdit(collection, idx){
    if(edit !== idx){
      setEdit(idx);
      setNewItem(collection.title)
    } else {setEdit(null)}
  }

  function changeItem(clickId){
    let newtask = task.map((value, index) => {
      return value.id === clickId ? { ...value,checked: !checked ,title:newItem}: value;
    })
    checkedDispatch(editing(newtask))
  }
  return (
   <section className="flex justify-center">
      <div className="flex flex-col w-10/12 md:w-5/12 h-[100vh] justify-center">
        <div className=" border border-gray-500 h-[45rem]">
          <h1 className="text-center text-gray-200 font-bold text-7xl underline mt-6">TODO</h1>
          <Generator/>
          <div className="flex justify-center">
            <div className={`flex w-6/12 h-[10rem]   justify-center mt-6`}>
              <ul className="border p-2 w-full h-fit flex flex-col gap-2">
                {
                  task.map((collection, idx)=> 
                  <li className="flex justify-between relative" key={idx}>
                    <div className="flex">
                      <div className="flex gap-1 flex-col justify-center" onClick={()=>{
                                checkedDispatch(checked(checkFunc(collection.id)))
                                }}>
                          {collection.checked ? <RiCheckboxCircleLine/> : <RiCheckboxBlankCircleLine/>}
                      </div>
                      <p className={`${collection.checked ? 'line-through' : ""} mb-1 ml-1`}>{collection.title}</p>
                      
                    </div>
                    <div className={`${idx === edit ? "flex" :"hidden"} absolute w-full justify-center bg-slate-400 border -ml-1 gap-8`}>
                      <input
                        value={newItem}
                        onChange={(e)=>setNewItem(e.target.value)}
                        className="w-9/12 placeholder:text-gray-500  placeholder:italic placeholder:text-[0.7rem] bg-slate-400 outline-none pl-2 border-blue-500 z-10 "  type="text" />
                      <div>
                      <button onClick={()=>{setEdit(null); setCheck(null); setNewItem(""); changeItem(collection.id);}} className="my-auto"><BiCheck/></button>
                      </div>
                    </div>
                    <div className="flex  justify-center gap-1">
                    <button className={check === idx || collection.checked === true ? "block text-[0.75rem] my-auto" : "hidden"} onClick={()=>handleEdit(collection,idx)}><AiOutlineEdit/></button>
                    <button  
                    onClick={()=>handleDelete(idx)}
                    className={`${collection.checked ? '' : "hidden"}`}><GrFormTrash/></button>
                    </div>
                  </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
   </section>
  )
}