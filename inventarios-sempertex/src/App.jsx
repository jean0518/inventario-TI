import { useState } from 'react'
import './App.css'
import {AuthContextProvider} from "./index"
function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <AuthContextProvider>
        <span> Hola desde context </span>
      </AuthContextProvider>
    </>
  )
}

export default App
