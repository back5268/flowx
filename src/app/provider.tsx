'use client'

import { ReactNode } from "react"
import { Toaster } from "sonner"

const Provider = ({ children }: { children: ReactNode }) => {
    return <div>
        <Toaster position="top-center" />
        {children}
    </div>
}

export default Provider