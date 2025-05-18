import { createContext, useState } from 'react'
import Launch from './pages/Launch'
import { darkmodeContext } from './misc/DarkmodeContext'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/DashBoard';
import ColorPieChart from './Examples/Piechart';
import Test from './misc/Test';
import Start from './pages/Start';
import Transfer from './pages/Transfer';
import History from './pages/History';

function App() {

  const [darkmode, setDarkmode] = useState(false);

  return (
    <>
      <darkmodeContext.Provider value={{ darkmode, setDarkmode }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Start/>} />
            <Route path='/launch' element={<Launch />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/piechart' element={<ColorPieChart/>} />
            <Route path='/test' element={<Test/>}/>
            <Route path='/transfer' element={<Transfer/>}/>
            <Route path='/history' element={<History/>}/>
            {/* <Launch /> */}
            {/* <SignupCard/> */}
            {/* <Signup/> */}
            {/* <Signin /> */}
          </Routes>
        </BrowserRouter>
      </darkmodeContext.Provider>


    </>
  )
}

export default App
