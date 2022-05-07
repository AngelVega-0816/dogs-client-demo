import React, { useEffect, useState } from "react";
import { getDogs, getDogsName, getTemperaments, sortName, sortWeight, sortHeight, filterDogsCreated, filterDogsTemp } from './../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './styles.css'

export default function Navbar () {
    //variable para ocultar o mostrar navbar
    let count = 0;

    let dispatch = useDispatch();
    let temperaments = useSelector((state) => state.temperaments);

    
    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);
    
    // estado para saber cual option está seleccionada y resetear
    let [selected, setSelected] = useState('');

    // estado para buscar
    let [searchDog, setSearchDog] = useState('');

//---------------------------------------------
// HANDLE FUNCTIONS
//---------------------------------------------
    let handleSubmit = (e) => {
        e.preventDefault();
        if (searchDog.length === 0) {
            return alert("Enter a valid name")
        } else {
            dispatch(getDogsName(searchDog))
            setSearchDog('');
        }
        e.target[0].value = "";
    }

    let handleSortName = (e) => {
        dispatch(sortName(e.target.value));
    };

    let handleSortWeight = (e) => {
        dispatch(sortWeight(e.target.value));
    };

    let handleSortHeight = (e) => {
        dispatch(sortHeight(e.target.value));
    };

    let handleFilterDogsCreated = (e) => {
        dispatch(filterDogsCreated(e.target.value));
    };

    let handleFilterDogsTemp = (e) => {
        dispatch(filterDogsTemp(e.target.value));
    };


    // =======================================
    // reset options

    let resetOptionsRadio = () => {
        let optionsRadio = document.getElementsByClassName("options");

        for (let i = 0 ; i < optionsRadio.length ; i++) {            
            if(optionsRadio[i].checked) optionsRadio[i].checked = false;
        };
    };

    let resetAllOptions = () => {
        let options = document.querySelectorAll('.select-temp selected');
        options.selected = options.defaultSelected
    }
    // =======================================

    // hide navbar
    let hideNav = () => {
        if(count % 2 ===0) {
            document.getElementById("btn-show").style.left = "295px";
            document.getElementById("show").style.left = "0px";
            count = 1;
        } else {
            document.getElementById("btn-show").style.left = "25px";
            document.getElementById("show").style.left = "-270px";
            count = 0;
        }

    }


    return (
        <nav className="navbar">
            
            {/* button to show or hide the menu */}
            <div id="btn-show" className="btn-mostrar">
                <div className="icon btn btn-exception" onClick={() => hideNav()}>
                🔍
                </div>
            </div>

            {/* navbar */}
            <div id="show" className="side-bar">
                
                <div className="menu">
                    

                    {/* Input search */}
                    <form className="search" onSubmit={(e) => handleSubmit(e)}>
                        <input id="input-submit" type="text" autoComplete="false" placeholder="Search name" onChange={(e) => {
                            setSearchDog(e.target.value);
                        }}/>
                        <div id="search-btn" >
                            <button type="submit" className="btn">GO</button>
                        </div>
                    </form>


                    {/* Options sort */}
                    <div className="sort-options">


                        {/* Temperaments */}
                        <div className="temperaments">
                            <h3>Temperaments</h3>
                            <select value={selected} className="select-temp"  onChange={(e) => {
                                setSelected(e.target.value)
                                handleFilterDogsTemp(e) 
                                resetOptionsRadio()
                            }}>
                                <option default value="All">All temp</option>
                                {
                                    //si hay temperaments, renderiza options
                                    temperaments.length > 0
                                    ? (
                                        temperaments.map(e => (<option value={e.temperament} key={e.id}>{e.temperament}</option>))
                                    ) : <option value="">Loading...</option>
                                }
                            </select>
                        </div>


                        {/* Sort by name */}
                        <div className="option name" onChange={(e) => handleSortName(e)}>
                            <h3>Name</h3>
                            <div className="contain">
                                <label>ABC
                                    <input id="alfABC" className="options" type="radio" name="sort" value="abc"/>
                                </label>
                                <label>
                                    <input id="alfCBA" className="options" type="radio" name="sort" value="cba"/>
                                ZYX</label>
                            </div>
                        </div>


                        {/* Sort by weight */}
                        <div className="option weight"onChange={(e) => handleSortWeight(e)}>
                            <h3>Weight</h3>
                            <div className="contain">
                                <label>ASC
                                    <input id="123W" className="options" type="radio" name="sort" value="asc"/>
                                </label>
                                <label>
                                    <input className="options" type="radio" name="sort" value="des"/>
                                DESC</label>
                            </div>
                        </div>
                        

                        {/* Sort by height */}
                        <div className="option height" onChange={(e) => handleSortHeight(e)}>
                            <h3>Height</h3>
                            <div className="contain">
                                <label>ASC
                                    <input id="123H" className="options" type="radio" name="sort" value="asc"/>
                                </label>
                                <label>
                                    <input id="321H" className="options" type="radio" name="sort" value="des"/>
                                DESC</label>
                            </div>
                        </div>


                        {/* Sort by dogs from db or api */}
                        <div className="option dbapi" onChange={(e) => handleFilterDogsCreated(e)}>
                            <h3>Dogs in</h3>
                            <div className="contain">
                                <label>DB
                                    <input className="options" type="radio" name="dogs" value="db"/>
                                </label>
                                <label>
                                    <input className="options" type="radio" name="dogs" value="api"/>
                                API</label>
                            </div>
                        </div>
                        

                        {/* Reset button */}
                        <div className="btn" onClick={() => {
                            setSelected("");
                            resetOptionsRadio();
                            resetAllOptions();
                            setSearchDog("");
                            document.getElementById("input-submit").value = "";
                            dispatch(getDogs());
                        }}>
                            Reset
                        </div>

                        <Link to="/dog" className='btn btn-create'>Create</Link>
                        


                    </div>
                
                
                </div>

            </div>

        </nav>
    )
};