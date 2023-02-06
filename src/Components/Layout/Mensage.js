import{useState, useEffect} from 'react'

import styles from './Mensage.module.css'

function Mensage({type , msg}){

    const[visible, setVisible] = useState(false)

    useEffect(() => {

        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 4000)

        return() => clearTimeout(timer)

    }, [msg])

    return(
        <>
        {visible && (
            <div className={`${styles.Mensage}  ${styles[type]}`}>{msg}</div>
        )}
        </>
    )
}

export default Mensage