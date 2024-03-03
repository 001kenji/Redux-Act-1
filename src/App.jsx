import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Container/Home'
import { Provider } from 'react-redux'

import store from './store'
function App() {

  return (
      <>
      <Provider store={store}>
       <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>

        </Routes>
       </BrowserRouter>
      </Provider>
      </>
  )
}

export default App
