import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import usePlanModal from '../../../Hooks/usePlanModal'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Body from './ModalBody/Body'
import { modelFields } from './ModalBody/fields'


const PlanModal = () => {
  const cookie = new Cookies()
    const planModal = usePlanModal()
    const model = localStorage.getItem('model')  
    const [typeObject , setTypeObject] = useState(modelFields[model])
    useMemo(()=>{
      setTypeObject(modelFields[model])
    },[model])

    
    const onSubmit = async() =>{
      if(model === 'Plans'){

        const res = await axios.post('https://localhost:8000/admin/admin-plan/' , typeObject , {
          headers:{
            'X-CSRFToken':cookie.get('csrftoken')
          }
        } )
        console.log(res)
      }
      else{
        console.log('can not edit')
      }
    }
  return (
    <Modal isOpen={planModal.isOpen} onClose={planModal.onClose} body={<Body Data={typeObject}  setData={setTypeObject} />} title='Add Plan' onSubmit={onSubmit} actionLabel='Submit'   />
)}

export default PlanModal