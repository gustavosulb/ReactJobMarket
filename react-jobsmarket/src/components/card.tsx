import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    bg?:string
}

const card = ({ children, bg= 'bg-gray-100' }: ContainerProps) =>{
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md`}>
        {children}
    </div>
  )
}

export default card