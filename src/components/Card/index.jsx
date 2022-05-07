import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

export default function Card ({id, image, name, weightMax, weightMin, temperament}) {
    return (
        <div className='container-card'>

            <div className='card'>

                <div className='face front'>
                    <img src={image} alt={name}/>
                    <h3>{name}</h3>
                </div>

                <div className='face back'>
                    <h3>{name}</h3>
                    <p>Temperaments: {temperament}</p>
                    <h4>Weight: {weightMin} - {weightMax}</h4>
                    <Link to={`/dogs/${id}`} className={"link"} style={{textDecoration: 'none', color: 'white'}}>
                        More details
                    </Link>
                </div>

            </div>
        </div>
    )
}