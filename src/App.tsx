import { Route,Routes } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import Sell from "./components/Sell"
import { AuthContextProvider } from "./context/LoginContext"




const App = ()=>{
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/details" element={<Details/>}/>
          <Route path="/sell" element={<Sell/>}/>
        </Routes>
        </AuthContextProvider>
    </>
  )
}
 export default App