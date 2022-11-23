import React, { useEffect, useState } from 'react'
import styles from './Toast.module.css'

interface Props {
    message: string
    id: string
    duration: number
    removeToast: (id: string) => void
}

const Toast = (props: Props) => {
    const { message, id, removeToast, duration } = props
    const [progress, setProgress] = useState(0)

    const style = {
        "--progress": progress,
        '--duration': duration + 'ms'
    } as React.CSSProperties;

    useEffect(() => {
        // timeout ? -> provides time to set change 0 to 1 for each toast? (if spam Enter without timeout -> bug: instant visual 100% progress bar)
        const timeout = setTimeout(() => {
            setProgress(1)
        }, 10);
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div onClick={() => removeToast(id)} className={styles.toast}>
            {message}
            <div className={styles.progress} style={style}></div>
        </div>
    )
}

export default Toast