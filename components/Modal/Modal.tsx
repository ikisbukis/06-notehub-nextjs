'use client'

import { useEffect } from "react"
import css from "./Modal.module.css"
import { createPortal } from "react-dom"

interface ModalProps{
    children: React.ReactNode
    onClose: () => void
}

export const Modal = ({children, onClose} : ModalProps) => {

    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
        }
    }, [onClose])

    const handleBackDrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) {
            onClose()
        }
    }

    return createPortal (
       <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackDrop}
       >
      <div className={css.modal}>
         {children}
       </div>
     </div>, document.body
    )
}