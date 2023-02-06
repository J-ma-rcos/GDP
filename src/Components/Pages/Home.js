import styles from './Home.module.css'
import saving from '../../img/piggy-bank-svgrepo-com.svg'
import LinkButton from '../Layout/LinkButton'

function Home(){

    return(
        <section className={styles.home_container}>
            <h1>Bem-Vindo ao <span>GDP</span> - Gerenciador de Projetos </h1>
            <p>Comece a Gerenciar Seu Projetos</p>
            <LinkButton to="/newproject" text="criar projeto"/>
            <img src={saving} alt="main-logo"/>

        </section>
    )
}

export default Home