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
  // kich hoat mo hinh nen ko can return gi het 
  return null;
}

export default SetupPage
