import React, { forwardRef, useImperativeHandle, useState } from 'react'
import uuid from '../../helpers/uid'
import useToastAutoClose from '../../hooks/useToastAutoClose'
import Toast from './Toast'
import styles from './Toast.module.css'

interface ToastValue {
    message: string
    duration: number
    // id: string
}
export interface Toast extends ToastValue {
    message: string
    duration: number
    id: string
}

// interface Props {
//     ref: any
// }

type Props = {}

type Handle = {
    // start: () => void,
    addToast: (toast: ToastValue) => void
}

// const ToastContainer = forwardRef(({ }, ref) => {
// const ToastContainer = React.ForwardRefRenderFunction(({ }, ref) => {
const ToastContainer: React.ForwardRefRenderFunction<Handle, Props> = (props, forwardedRef) => {
    const [toasts, setToasts] = useState<Toast[]>([{ duration: 3000, message: 'Test Toast/Snackbar', id: '123abc' }])

    // Add Toast (Given access to parent outside):
    useImperativeHandle(forwardedRef, () => ({
        // addToast(toast: Toast) {
        addToast(toast) {
            console.log('addToast forwardedRef toast:', toast, 111111);
            setToasts([...toasts, { ...toast, id: uuid() }]);
        },

        // show() {
        // setShowSnackbar(true);
        // setTimeout(() => {
        //   setShowSnackbar(false);
        // }, 3000);
        //   },
    }));

    // Remove toast with click
    const removeToast = (id: string) => {
        setToasts(toasts => toasts.filter(item => item.id !== id))
    }

    // Auto close/remove toast
    useToastAutoClose({ toasts, setToasts })

    return (
        <div className={styles.container}>
            {toasts.map((item) => (
                <Toast key={item.id} {...item} removeToast={removeToast} />
            ))}
        </div>
    )
}

// export default ToastContainer
export default React.forwardRef(ToastContainer);
