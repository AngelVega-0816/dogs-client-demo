import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Card from '../Card';
import Navbar from '../Navbar';
import Pagination from '../Pagination';
import './styles.css';
import Loading from '../Loading';



export default function Home () {
    let aux = [1];

    let allDogs = useSelector(state => state.allDogs);

    let [currentPage, setCurrentPage] = useState(1);

    let indexLastDogPage = currentPage * 8;
    let indexFirstDogPage = indexLastDogPage - 8
    let currentDogsPage = allDogs.slice(indexFirstDogPage, indexLastDogPage)

    const paginate = (numPag) => {
        setCurrentPage(numPag)
    }

    //Cambio el title
    document.title = "Home" 





    return (
        <div className='Home'>
            
            <Navbar/>
            <div className="cards">
                {

                    
                    currentDogsPage.length > 0 ?
                    currentDogsPage.map((e) => (
                        <Card 
                        key={e.id}
                        id={e.id} 
                        image={e.image} 
                        name={e.name} 
                        weightMax={e.weightMax} 
                        weightMin={e.weightMin} 
                        temperament={e.temperament}
                        />
                    )): <Loading/>
                }
            </div>
            <Pagination 
                dogsPages={8}
                allDogs={allDogs.length}
                paginate={paginate}
            />

        </div>
        
        
        
    )


}