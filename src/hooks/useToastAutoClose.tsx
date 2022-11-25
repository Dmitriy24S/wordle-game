import React, { useEffect, useState } from 'react'
import { Toast } from '../components/Toast/ToastContainer'

interface Props {
    toasts: Toast[]
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>
}

const useToastAutoClose = ({ toasts, setToasts }: Props) => {
    const [removingToastId, setRemovingToastId] = useState('');

    // Auto close/remove toast
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
}

export default useToastAutoClose