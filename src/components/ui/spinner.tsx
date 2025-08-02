import { Loader2 } from 'lucide-react'
import React from 'react'

function Spinner() {
  return (
    <Loader2 className="animate-spin h-5 w-5 text-primary-foreground" />
  )
}

export default Spinner