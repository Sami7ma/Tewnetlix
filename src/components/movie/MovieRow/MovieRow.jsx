import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import MovieCard from "../MovieCard";
import "./MovieRow.css";


function MovieRow({title, movies}){

    const rowRef = useRef(null);


    function scrollLeft(){

        rowRef.current.scrollBy({
            left:-500,
            behavior:"smooth"
        });

    }


    function scrollRight(){

        rowRef.current.scrollBy({
            left:500,
            behavior:"smooth"
        });

    }


    return(
        <section className="movie-row">

            <div className="row-header">

                <h2 className="row-title">
                    {title}
                </h2>


                <div className="row-buttons">

                    <button onClick={scrollLeft}>
                        <ChevronLeft />
                    </button>


                    <button onClick={scrollRight}>
                        <ChevronRight />
                    </button>

                </div>


            </div>



            <div 
                className="movie-list"
                ref={rowRef}
            >

                {
                    movies.map(movie=>(
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))
                }

            </div>


        </section>
    );
}


export default MovieRow;