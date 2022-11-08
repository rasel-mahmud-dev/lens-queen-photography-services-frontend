import React from "react";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/** @returns [{}]
 * error: (msg: string)=>void,
 * success: (msg: string)=>void,
 */
function useToast() {
    return [toast, ToastContainer]
}

export default useToast