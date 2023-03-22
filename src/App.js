import Generator from "./components/Generator"
import { useDispatch, useSelector } from "react-redux"
import {GrFormTrash} from  "react-icons/gr"
import {RiCheckboxBlankCircleLine} from "react-icons/ri"
import {RiCheckboxCircleLine} from "react-icons/ri"
import { checked } from "./features/Add"
import { deleting } from "./features/Add"

export default function Home() {
  const task = useSelector(prev => prev.list.value.tasks)
  console.log(task)
  const checkedDispatch = useDispatch();
  const deleteDispatch = useDispatch();
  function checkFunc(clickId){
    return  task.map((value, index) => {
      return value.id === clickId ? { ...value,checked: !value.checked}: value;
    })
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
                  <li className="flex justify-between" key={idx}>
                    <div className="flex">
                      <div className="flex gap-1 flex-col justify-center" onClick={()=>{
                                checkedDispatch(checked(checkFunc(collection.id)))
                                }}>
                          {collection.checked ? <RiCheckboxCircleLine/> : <RiCheckboxBlankCircleLine/>}
                        </div>
                      <p className={`${collection.checked ? 'line-through' : ""} mb-1 ml-1`}>{collection.title}</p>
                    </div>
                    <button  
                    onClick={()=>
                   {
                    let newList = [...task]
                    newList.splice(idx,1)
                    deleteDispatch(deleting(newList))
                    }
                     
                    }
                    className={`${collection.checked ? '' : "hidden"}`}><GrFormTrash/></button>
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