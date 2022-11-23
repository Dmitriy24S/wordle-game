import React from 'react'
import styles from './Toast.module.css'

interface Props {
    message: string
    id: string
    removeToast: (id: string) => void
}

const Toast = (props: Props) => {
    const { message, id, removeToast, } = props

    return (
        <div onClick={() => removeToast(id)} className={styles.toast}>
            {message}
        </div>
    )
}

export default Toast