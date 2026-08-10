import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import Movies from "./pages/Movies/Movies";
import TVShow from "./pages/TVShow/TVShow";
import TVShows from "./pages/TVShows/TVShows";
import WatchPage from "./pages/Watch/WatchPage";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";


function App(){

return(
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv/:id" element={<TVShow />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path="/watch/:type/:id" element={<WatchPage />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<NotFound/>}/>

        </Routes>
    </BrowserRouter>
);

}

export default App;