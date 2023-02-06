import {  v4 as uuidv4} from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Project.module.css'
import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../Projects/projectForm'
import Mensage from '../Layout/Mensage'
import ServiceForm from '../Services/ServiceForm'
import ServiceCard from '../Services/ServiceCard'

function Project(){

    const{id} = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])

    const [showProjectForm, setShowProjectForm] = useState(false)

    const [showServiceForm, setShowServiceForm] = useState(false)


    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
               fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log(err))
        },1000)
     
    }, [id])

    function removeService(id, cost){
        const servicesUpdated = project.services.filter(
            (services) => services.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setMessage('')
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço Excluido Com Sucesso!')
            setType('success')
            
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function createService(){

        setMessage('')
        //ultimo serviço
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //validação de valor maximo

        if( newCost > parseFloat(project.budget)){
            setMessage('Orçamento Utrapaçado, Verifique o Valor Do Serviço')
            setType('error')
            project.services.pop()
            setTimeout(() => {setMessage(" ");}, 2000);
            return false
        }

        // adicionando o valor do serviço ao total do custo
        project.cost=newCost

        //atualizar o projeto
        fetch(`http://localhost:5000/projects/${project.id}`,
        {
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            //exibir os serviços
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    }


    function editPost(project){
        //budget validation
        if(project.budget < project.cost){
            //mensagem
            setMessage('O Orçamento Não Pode Ser Menor Que O Custo Do Projeto!')
            setType('error')
            setTimeout(() => {setMessage(" ");}, 2000);
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            //mensagem
            setMessage('O Projeto Foi Atualizado Com Sucesso!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    return(
        <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Mensage type={type} msg={message}/>}
                    <div className={styles.detail_container}>

                        <h1>Projeto: {project.name}</h1>

                        <button onClick={toggleProjectForm} className={styles.btn}>
                         
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}

                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total De Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Tota Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <p>
                                    <ProjectForm handleSubmit={editPost}
                                     btnText="Concluir edição" 
                                     projectData={project}/>
                                </p>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicionar Serviço:</h2>
                        <button onClick={toggleServiceForm} className={styles.btn}>
                            {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {
                                showServiceForm && (
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    btnText="adicionar serviço"
                                    projectData={project}/>
                                )
                            }
                        </div>
                    </div>
                    <h2>serviços</h2>
                    <Container customClass="start">
                            {
                                services.length > 0 && services.map((services) => (
                                    <ServiceCard
                                    id={services.id}
                                    name={services.name}
                                    cost={services.cost}
                                    description={services.description}
                                    key={services.id}
                                    handleRemove={removeService}/>
                                ))
                            }
                            {
                                services.length === 0 && <p>não a serviços Adicionados</p>
                            }
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading/>
        )}
        </>
    )
}

export default Project