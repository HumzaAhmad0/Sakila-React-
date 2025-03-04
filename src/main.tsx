import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import NavBar from './components/Nav/NavBar.tsx'
import backgroundImg from './assets/seamless-repeating-pattern-movie-filming-web-sites-wrapping-printing-postcards_387335-741.png'
import ActorsPage from './pages/Actors/ActorsPage.tsx'
import CreateActorPage from './pages/Actors/CreateActorPage.tsx'
import SearchActorPage from './pages/Actors/SearchActorPage.tsx'
import SpecificActorPage from './pages/Actors/SpecificActorPage.tsx'
import UpdateActorPage from './pages/Actors/UpdateActorPage.tsx'
import CreateFilmPage from './pages/Films/CreateFilmPage.tsx'
import FilmsPage from './pages/Films/FilmsPage.tsx'
import SearchFilmPage from './pages/Films/SearchFilmPage.tsx'
import SpecificFilmPage from './pages/Films/SpecifcFilmPage.tsx'
import UpdateFilmPage from './pages/Films/UpdateFilmPage.tsx'
import GenresPage from './pages/Genres/GenresPage.tsx'
import MovieByGenrePage from './pages/Genres/MoviesByGenrePage.tsx'

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
        <Route path="/updateActor/:id" element = {<UpdateActorPage/>}/>
        <Route path="/updateFilm/:id" element = {<UpdateFilmPage/>}/>
        <Route path="/genre/:name" element ={<MovieByGenrePage/>}/>        
        <Route path="/film/:id" element ={<SpecificFilmPage/>}/>
        <Route path="/searchFilms" element ={<SearchFilmPage/>}/>
        <Route path="/searchActors" element ={<SearchActorPage/>}/>
        <Route path="/actor/:id" element ={<SpecificActorPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
