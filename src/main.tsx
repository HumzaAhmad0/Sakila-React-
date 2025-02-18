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
import backgroundImg from './assets/seamless-repeating-pattern-movie-filming-web-sites-wrapping-printing-postcards_387335-741.png'
import GenresPage from './pages/GenresPage.tsx'
import MovieByGenrePage from './pages/MoviesByGenrePage.tsx'
import CreateFilmPage from './pages/CreateFilmPage.tsx'
import CreateActorPage from './pages/CreateActorPage.tsx'
// import ReplaceActorPage from './pages/ReplaceActorPage.tsx'
import UpdateActorPage from './pages/UpdateActorPage.tsx'

document.body.style.backgroundImage= `url(${backgroundImg})`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/films" element ={<FilmsPage/>}/>
        <Route path="/actors" element ={<ActorsPage/>}/>
        <Route path="/genres" element = {<GenresPage/>}/>
        <Route path="/createFilm" element = {<CreateFilmPage/>}/>
        <Route path="/createActor" element = {<CreateActorPage/>}/>
        {/* <Route path="/replaceActor/:id" element = {<ReplaceActorPage/>}/> */}
        <Route path="/updateActor/:id" element = {<UpdateActorPage/>}/>
        <Route path="/genre/:name" element ={<MovieByGenrePage/>}/>        
        <Route path="/film/:id" element ={<SpecificFilmPage/>}/>
        <Route path="/actor/:id" element ={<SpecificActorPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
