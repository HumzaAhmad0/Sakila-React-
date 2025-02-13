import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import FilmsPage from './pages/FilmsPage.tsx'
import NavBar from './components/NavBar.tsx'
import ActorsPage from './pages/ActorsPage.tsx'
import SpecificFilmPage from './pages/SpecifcFilmPage.tsx'
import SpecificActorPage from './pages/SpecificActorPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/films" element ={<FilmsPage/>}/>
        <Route path="/actors" element ={<ActorsPage/>}/>
        <Route path="/film/:id" element ={<SpecificFilmPage/>}/>
        <Route path="/actor/:id" element ={<SpecificActorPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
