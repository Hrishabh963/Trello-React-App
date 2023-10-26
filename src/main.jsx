import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '/src/modules/Chakra/Theme.js'
import '@fontsource/ubuntu'
import { ErrorBoundary } from 'react-error-boundary'
import Fallback from './modules/Common/Components/Fallback.jsx'

const Theme = extendTheme(theme);
const handleError = (error,errorInfo)=>{
  console.error(error.message,errorInfo);
}
ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <ChakraProvider theme={Theme}>
    <ErrorBoundary FallbackComponent={Fallback} onError={handleError} >
    <App />
    </ErrorBoundary>
  </ChakraProvider>
 </BrowserRouter>
)
