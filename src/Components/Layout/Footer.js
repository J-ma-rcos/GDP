import { FaGithub, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'
function Footer(){

    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <a href='https://github.com/J-ma-rcos' target="_blank" rel="noopener noreferrer"><FaGithub/></a>
                </li>
                <li>
                    <a href='https://www.linkedin.com/in/jo%C3%A3o-marcos-76147a1a2/' target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
                </li>
            </ul>
            <p className={styles.copy_right}><span> GDP - Gerenciador de Projetos</span> &copy; 2022</p>
        </footer>
    )
}

export default Footer