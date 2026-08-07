import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import TVShow from "./pages/TVShow/TVShow";
import WatchPage from "./pages/Watch/WatchPage";
import Profile from "./pages/Profile/Profile.jsx";
import NotFound from "./pages/NotFound/NotFound";


function App(){

return(
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/movie/:id" element={<Movie />} />

            <Route path="/tv/:id" element={<TVShow />} />

            <Route path="/watch/:type/:id" element={<WatchPage />} />

            <Route path="/profile" element={<Profile/>}/>

            <Route path="*" element={<NotFound/>}/>

        </Routes>
    </BrowserRouter>
);

}

export default App;