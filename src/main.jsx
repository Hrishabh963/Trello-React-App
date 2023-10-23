import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '/src/modules/Chakra/Theme.js'
import '@fontsource/ubuntu'
import BoardsContextProvider from './modules/Common/BoardContextProvider'

const Theme = extendTheme(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <BoardsContextProvider>
  <ChakraProvider theme={Theme}>
    <App />
  </ChakraProvider>
  </BoardsContextProvider>
 </BrowserRouter>
)
