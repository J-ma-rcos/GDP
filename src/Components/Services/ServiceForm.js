import { useState } from 'react'

import Input from '../Form/input'
import SubmitButton from '../Form/SubmitButton'

import styles from '../Projects/projectForm.module.css'

function ServiceForm({ handleSubmit, btnText, projectData }){

    const[service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({ ...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
            type="text"
            text="Nome Do Serviço"
            name="name"
            placeholder="Insira o Nome Do Serviço"
            handleOnChange={handleChange}/>
            <Input
            type="number"
            text="Custo Do Serviço"
            name="cost"
            placeholder="Insira o Valor Total Do Serviço"
            handleOnChange={handleChange}/>
            <Input
            type="text"
            text="Descrição Do Serviço"
            name="description"
            placeholder="Descreva o Serviço"
            handleOnChange={handleChange}/>

            <SubmitButton text={btnText}/>
        </form>

        
    )
}

export default ServiceForm