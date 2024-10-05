import { useMediaQuery } from '@mui/material'
import React from 'react'

const useMuiSize = (): string => {
  const isXl = useMediaQuery('(min-width:1536px)')
  const isLg = useMediaQuery('(min-width:1200px)')
  const isMd = useMediaQuery('(min-width:900px)')
  const isSm = useMediaQuery('(min-width:600px)')
  return isXl ? 'xl' : isLg ? 'lg' : isMd ? 'md' : isSm ? 'sm' : 'xs'
}
export default useMuiSize
