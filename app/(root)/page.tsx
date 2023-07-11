"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModal((state)=> state.onOpen);
  const isOpen = useStoreModal((state)=> state.isOpen);
// ??? lam sao de close

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  },[onOpen,isOpen])
  return(
    <div>
      hello
    </div>
  )
}

export default SetupPage
