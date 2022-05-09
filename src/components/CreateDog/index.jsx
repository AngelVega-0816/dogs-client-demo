import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../store/actions';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

export default function CreateDog () {
    let navigate = useNavigate()
    let dispatch = useDispatch();
    let temperaments = useSelector((state) => state.temperaments);    
    let [selected, setSelected] = useState(""); //para no perder la opcion elegida
    let [inputSelected, setInputSelected] = useState("");
    let [count, setCount] = useState(0);
    

    const[input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifespan: '',
        image: '',
        temperament: [],
    })
    const [error, setError] = useState({});

    const validations = function(input){
        const error = {}
        if(!input.name){
            error.name = 'Name is required';
        }
        else if(!/^[a-zA-Z\s]*$/.test(input.name)) {
            error.name = "Must contain letters and spaces only";
        }
        else if(!input.heightMin){
            error.heightMin = 'Height Min is required';
        }
        else if(!input.heightMax){
            error.heightMax = 'Height Max is required';
        }
        else if(!input.weightMin){
            error.weightMin = 'Weight Min is required';
        }
        else if(!input.weightMax){
            error.weightMax = 'Weight Max is required';
        }
        else if(input.heightMin < 0){
            error.heightMin = 'Height Min must be greater than 0';
        }
        else if(input.heightMin > input.heightMax){
            error.heightMin = 'Height Min cannot be greater than Height Max';
        }
        
        else if(input.heightMax < 0){
            error.heightMax = 'Height Max must be greater than 0';
        }
        
        else if(input.weightMin< 0){
            error.weightMin = 'Weight Min must be greater than 0';
        }
        else if(input.weightMin > input.weightMax){
            error.weightMin = 'Weight Min cannot be greater than Weight Max';
        }
        else if(input.weightMax < 0){
            error.weightMax = 'Weight Max must be greater than 0';
        }
        else if(input.lifespan < 0 && input.lifespan > 99){
            error.lifespan = 'Must be greater than 0 and less than 99';
        }
        return error;
    }


    //=======================================

    const handleChangeInput = (e) => {
        e.preventDefault();
        setInput(input => {
            const newInput = {
                ...input,
                [e.target.name] : e.target.value
        }
        const error = validations(newInput);
        setError(error);
        return newInput;
        })
    }
    let handleChangeInputSelect = (e) => {
        setSelected(e.target.value);
        if(e.target.value !== "default" && typeof e.target.value == "string"){setInput({
            ...input,
            temperament: [... new Set([...input.temperament, e.target.value])]
        })}
        upText(e.target.value)

    }

    let handleDelete = (temp) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(e => e !== temp)
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(error).length == 0) {
            if(input.name && input.heightMin && input.heightMax && input.weightMin
                && input.weightMax && input.lifespan && input.temperament){
                dispatch(postDog(input));
                alert('Dog created!')
                setInput({
                    name: '',
                    heightMin: '',
                    heightMax: '',
                    weightMin: '',
                    weightMax: '',
                    lifespan: '',
                    image: '',
                    temperament: [],
                });
                navigate('/home');
            }
        }else {
            alert('Please, fill in all the required fields')
        }
    };
    //=======================================

    let upText = (e) => {
        let tag = document.getElementById("temperaments-options");
        if (e == "default") {
            tag.style.transform = "translateY(0px)";
            tag.style.fontSize = "16px";
            tag.style.color = "grey";
        } else {
            tag.style.transform = "translateY(-24px)";
            tag.style.fontSize = "20px";
            tag.style.color = "azure";
        }
        
    }
    let showMenuTemp = () => {
        if(!count && input.temperament.length > 0) {
            document.getElementById("menu-temperaments").style.left = "0%";
            setCount(1)
        }
        else {
            document .getElementById("menu-temperaments").style.left = "-60%"
            setCount(0)
        }
    }


    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    return (

        <div className='form-container'>
            
            <div className='btn-form-back'>
                <Link to="/home" className='btn btn-exception'>Back</Link>
            </div>

            <div id="menu-temperaments">
                    <div className='btn btn-exception btn-temp-sel' onClick={() => {showMenuTemp()}}>{">"}</div>
                    <div className='content-temps'>
                        {/* {
                            input.temperament.map(e => (
                                div
                                ))
                            } */}
                    <div className='temperaments-selected'>
                            {/* <div className='temperaments-info'>
                                <div className='btn btn-exception'>Amigable</div>
                            </div>
                            <div className='temperaments-info'>
                                <div className='btn btn-exception'>Amigable</div>
                            </div> */}
                            {
                                input.temperament.map((temp, i) => (
                                    <div className='temperaments-info' key={i}>
                                        <div 
                                            className='btn btn-exception'
                                            onClick={e => handleDelete(temp)}
                                        >
                                            {temp}
                                        </div>
                                    </div>
                                ))
                            }

                    </div>
                </div>
            </div>


            <form className="form" onSubmit={e => handleSubmit(e)}>

                {/* input para crear nombre */}
                <div className='form-create create-name'>

                    <div className="input-data">
                        <input 
                            name="name" 
                            type="text" 
                            required
                            autoComplete='off'
                            onChange={e => handleChangeInput(e)}
                            placeholder='Enter letters and spaces only'
                        />
                        <div className="underline"></div>
                        <label>Name</label>
                        {error.name && <p className='err'>{error.name}</p>}
                    </div>

                </div>

                {/* Opciones para temperaments */}
                <div className="form-create create-temperament">
                    <div className='input-data'>

                        <h3 
                            id="temperaments-options"className='temperaments-options'
                        >
                            Temperaments
                        </h3>
                        <select 
                            value={selected}        
                            className="select-temperaments"  
                            onChange={e => handleChangeInputSelect(e)}
                            name="temperament"
                        >
                            <option default value="default"></option>
                            {
                                //si hay temperaments, renderiza options
                                temperaments.length > 0
                                ? (
                                    temperaments.map(e => (
                                        <option
                                            value={e.temperament} 
                                            key={e.id}
                                        >
                                            {e.temperament}
                                        </option>))
                                ) : <option value=""></option>
                            }
                        </select>

                    </div>
                </div>

                
                

                <div className='form-create create-minweight'>

                    <div className="input-data">
                        <input 
                            name="weightMin" 
                            type="text" 
                            required
                            autoComplete='off'
                            placeholder='Enter numbers only'
                            onChange={e => handleChangeInput(e)}
                        />
                        <div className="underline"></div>
                        <label>Min Weight</label>
                        {error.weightMin && <p className='err'>{error.weightMin}</p>}
                    </div>

                </div>


                <div className='form-create create-maxweight'>

                    <div className="input-data">
                        <input 
                            name="weightMax"
                            type="text" 
                            required 
                            autoComplete='off'
                            placeholder='Enter numbers only'
                            onChange={e => handleChangeInput(e)}
                        />
                        <div className="underline"></div>
                        <label>Max Weight</label>
                        {error.weightMax && <p className='err'>{error.weightMax}</p>}
                    </div>

                </div>


                <div className='form-create create-minheight'>

                    <div className="input-data">
                        <input 
                            name="heightMin"
                            type="text" 
                            required
                            autoComplete='off'
                            placeholder='Enter numbers only'
                            onChange={e => handleChangeInput(e)}
                        />
                        <div className="underline"></div>
                        <label>Min Height</label>
                        {error.heightMin && <p className='err'>{error.heightMin}</p>}
                    </div>

                </div>


                <div className='form-create create-maxheight'>

                    <div className="input-data">
                        <input 
                            name="heightMax" 
                            type="text" 
                            required
                            autoComplete='off'
                            placeholder='Enter numbers only'
                            onChange={e => handleChangeInput(e)}
                        />
                        <div className="underline"></div>
                        <label>Max Height</label>
                        {error.heightMax && <p className='err'>{error.heightMax}</p>}
                    </div>

                </div>


                <div className='form-create create-lifespan'>

                    <div className="input-data">
                        <input 
                            name="lifespan" 
                            type="text" 
                            autoComplete='off'
                            placeholder='00 - 99 years'
                            onChange={e => handleChangeInput(e)}
                        />
                        <div className="underline"></div>
                        <label id="static">Life Span</label>
                        {error.lifespan && <p className='err'>{error.lifespan}</p>}
                    </div>

                </div>


                <div className='form-create-image create-imageurl'>

                    <div className="input-data">
                        <input
                            name="image" 
                            type="text" 
                            autoComplete='off'
                            placeholder='Image URL'
                            onChange={e => {
                                handleChangeInput(e)
                            }}
                        />
                        <div className="underline"></div>
                        <label id='static'>Image URL</label>
                    </div>

                </div>

                <div className='btn-form-create'>
                    <button  className='btn btn-exception' type='submit'>Create</button>
                </div>

            </form>


        </div>

    )


}