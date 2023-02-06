import myself from '../../img/myself.jpg'

import { FaGithub, FaLinkedin} from 'react-icons/fa'

import styles from './Contact.module.css'

function Contact(){

    return(
        <div className={styles.Contact_container}>
            <img src={myself} alt="me"/>
            <div className={styles.description}>
                <h3>Olá Eu Me Chamo João Marcos e Eu Sou Um Dev Front-End</h3>
                <br/>
                <p>Sou De João Pessoa-PB, Estou Atualmente Finalizando Minha Graduação Em Ciências Da Computação e Estou em Busca Do meu Primeiro Estagio/Emprego</p>
                <br/>
                <p>Me Siga: 
                    <a href='https://github.com/J-ma-rcos' target="_blank" rel="noopener noreferrer"><FaGithub/></a>
                    <a href='https://www.linkedin.com/in/jo%C3%A3o-marcos-76147a1a2/' target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
                </p>
            </div>
        </div>
    )
}

export default Contact