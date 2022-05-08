import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { getDetails } from "../../store/actions";
import Loading from "../Loading";
import './styles.css';


export default function Details () {

    let allDetails = useSelector((state) => state.dogDetails);
    const dispatch = useDispatch();
    
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));

        return () => {
            dispatch(getDetails(0))
        }
        
    }, []);
    
    
    return (
        <div className="container-details">
            <Link to="/home" className="btn-container">
                <div className="btn btn-exception">Back</div>
            </Link>
            {
                allDetails.length > 0 
                ?   allDetails.map(e => {

                        document.title = allDetails[0].name;
                        
                        return (

                            <div key={allDetails[0].id} className="details">
                                
                                <div className="info-left">
                                    <h2>{allDetails[0].name}</h2>
                                    <div className="temperaments">
                                        <h3>Temperaments</h3>
                                        <p>{allDetails[0].temperament}</p>
                                    </div>
                                </div>

                                <div className='img-container' style={{backgroundImage: `url(${allDetails[0].image})`}}>
                                </div>

                                <div className="info-right">
                                    <div className="temperaments">
                                        <h3>Life span</h3>
                                        <p>{allDetails[0].lifespan}</p>
                                        <h3>Height</h3>
                                        <p>{`min ${allDetails[0].heightMin} - ${allDetails[0].heightMax} max`}</p>
                                        <h3>Weight</h3>
                                        <p>{`min ${allDetails[0].weightMin} - ${allDetails[0].weightMax} max`}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                : <div className='img-container'><Loading/></div>
                
            
            }
        </div>
        
    )
    
    //  *    heightMax: 29
    //  *    heightMin: 23
    //  *    id: 1
    //  *    image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"     
    //  *    lifespan: "10 - 12 years"
    //  *    name: "Affenpinscher"
    //  *    temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
    //      weightMax: 6
    //      weightMin: 3
}