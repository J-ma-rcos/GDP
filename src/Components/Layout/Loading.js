import styles from './Loading.module.css'

import load from '../../img/Pulse-1s-200px.svg'

function Loading(){
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={load} alt="loading"/>
        </div>
    )
}

export default Loading