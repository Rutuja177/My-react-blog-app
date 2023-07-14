import './App.css';
import Navbar from './NavBar';
import About from './pages/About';
import ArticleList from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/LoginPage';
import CreateAccount from './pages/createAccountPage';

import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div id='page-body'>
          <Routes>
            <Route path='/' element = {<Home />}></Route>
            <Route path='/about' element = {<About />}></Route>
            <Route path='/articles' element = {<ArticleList />}></Route>
            <Route path='/article/:articleId' element = { <ArticlePage />}></Route>
            <Route path='/create-account' element = { <CreateAccount />}></Route>
            <Route path='/login' element = { <Login />}></Route>
            <Route path='/notFound' element = {<NotFoundPage />}></Route>
            <Route path='*' element = {<NotFoundPage />}></Route>
          </Routes>
          </div>
        </div>
      </BrowserRouter>   
  );
}

export default App;
