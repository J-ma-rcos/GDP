import {useNavigate} from 'react-router-dom'

import ProjectForm from '../Projects/projectForm.js'

import styles from './newproject.module.css'

function NewProject(){

    const history = useNavigate();

    function createPost(project){

        //initialize cost and service
        project.cost=0
        project.services= []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((resp => resp.json())) 
        .then((data) =>{
            console.log(data)
            //reditect
            history("/projects", {state:{message: 'projeto criado com sucesso'}})
        })
        .catch((err => console.log(err)) 
        )
    }

    return(

        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p> Crie Seu Projeto Para Depois Adicionar Seus Serviços</p>
            <ProjectForm btnText="criar projeto" handleSubmit={createPost}/>
        </div>
    )
}

export default NewProject