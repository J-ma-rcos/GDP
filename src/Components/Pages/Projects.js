import{ useLocation } from 'react-router-dom'

import styles from './Projects.module.css'

import Mensage from "../Layout/Mensage"
import Container from '../Layout/Container'
import Loading from '../Layout/Loading'
import LinkButton from '../Layout/LinkButton'
import ProjectCard from '../Projects/ProjectCard'
import { useState, useEffect } from 'react'

function Projects(){

    
    const[project, setProjects] =useState([])

    const[removeloading, setRemoveLoading]=useState(false)

    const[projectMessage, setProjectMessage] = useState('')
    
    const location = useLocation()
    let message = ''
    if(location.state){
        message=location.state.message
    }

    useEffect(() => {
      setTimeout(() => {
        fetch('http://localhost:5000/projects', {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
      },1000)
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(project.filter((project) => project.id !== id))
            setProjectMessage('Projeto Removido Com Sucesso')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="criar projeto"/>
            </div>
                <Mensage type="success" msg={message} />
                {projectMessage && <Mensage type="success" msg={projectMessage} />}
                <Container customClass="start">
        
                {project.length > 0 && 
                    project.map((project) => (<ProjectCard 
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                />))
                }

                {!removeloading && <Loading/>}
                {removeloading && project.length === 0 &&(
                    <p>Não a Projetos Cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects