import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import Toast from './Toast'
import styles from './Toast.module.css'

interface ToastValue {
    message: string
    duration: number
    // id: string
}
interface Toast extends ToastValue {
    message: string
    duration: number
    id: string
}

// interface Props {
//     ref: any
// }

const uuid = () => {
    let dt = new Date().getTime();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        },
    );
};

type Props = {}

type Handle = {
    // start: () => void,
    addToast: (toast: ToastValue) => void,
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
        // addMessage(toast) {
        //   setToasts([...toasts, { ...toast, id: uuid() }]);
        // },

        // show() {
        // setShowSnackbar(true);
        // setTimeout(() => {
        //   setShowSnackbar(false);
        // }, 3000);
        //   },
    }));


    // Remove toast with click
    const removeToast = (id: string) => {
        setToasts(toasts.filter(item => item.id !== id))
    }
    // Auto close/remove toast
    const [removingToastId, setRemovingToastId] = useState('');
    // 1 .check changes to toasts[] -> add timeout after which remove each
    useEffect(() => {
        // if toasts[] not 0
        if (toasts.length) {
            const id = toasts[toasts.length - 1].id; // length updates -> accurately grab each recent by index ?
            const duration = toasts[toasts.length - 1].duration;
            // add timeout after which remove each by id
            setTimeout(() => setRemovingToastId(id), duration);
        }
    }, [toasts]);

    // 2. after time out for deletion
    useEffect(() => {
        if (removingToastId) {
            setToasts(t => t.filter(_t => _t.id !== removingToastId))
        }
    }, [removingToastId, setToasts]);

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
