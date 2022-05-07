import types from '../type_actions';

const initialState = {
    allDogs: [],
    preloadedDogs: [],
    temperaments: [],
    dogDetails: [],
};
export default function rootReducer (state = initialState, action) {
    switch (action.type) {
// -------------------------------------------
        case types.getDogs:
            return {
                ...state,
                allDogs: action.payload,
                preloadedDogs: action.payload,
            };

// -------------------------------------------        

        case types.getTemperaments:

            return {
                ...state,
                temperaments: action.payload,
            };

// -------------------------------------------

        case types.getDetails:
            return {
                ...state,
                dogDetails: action.payload,
            };

// -------------------------------------------
            
        case types.getDogsName: 
            return {
                ...state,
                allDogs: action.payload,
            };

// -------------------------------------------

        case types.sortName:
            if (action.payload === "abc") {
                return { ...state, allDogs: [...state.allDogs].sort( (a, b) => {
                    if (a.name < b.name) return -1;
                    else if (a.name > b.name) return 1;
                    return 0;
                })}
            } else if (action.payload === "cba") {
                return { ...state, allDogs: [...state.allDogs].sort( (a, b) => {
                    if (a.name > b.name) return -1;
                    else if (a.name < b.name) return 1;
                    return 0;
                })}
            } else return {...state, allDogs: [...state.preloadedDogs]}


// -------------------------------------------
 
        case types.sortWeight:
             if (action.payload == "des") {
                return {...state, allDogs: [...state.allDogs].filter(e => e.weightMin !== null).sort( (a, b) => {
                    if (a.weightMin < b.weightMin) return 1;
                    else if (a.weightMin > b.weightMin) return -1;
                    return 0;
                })}
            } else if (action.payload == "asc") {
                return {...state, allDogs: [...state.allDogs].filter(e => e.weightMin !== null).sort( (a, b) => {
                    if (a.weightMin > b.weightMin) return 1;
                    else if (a.weightMin < b.weightMin) return -1;
                    return 0;
                })}
            } else return {
                ...state,
                allDogs: state.preloadedDogs,
            };

// -------------------------------------------

        case types.sortHeight:
            if (action.payload == "All") {
                return { ...state, allDogs: [...state.preloadedDogs]}
            } else if (action.payload === "des") {
                return{ ...state, allDogs: [...state.allDogs].filter(e => e.heightMin !== null).sort( (a, b) => {
                    if (a.heightMin < b.heightMin) return 1;
                    else if (a.heightMin > b.heightMin) return -1;
                    return 0;
                })}
            } else if (action.payload === "asc") {
                return { ...state, allDogs: [...state.allDogs].filter(e => e.heightMin !== null).sort( (a, b) => {
                    if (a.heightMin > b.heightMin) return 1;
                    else if (a.heightMin < b.heightMin) return -1;
                    return 0;
                })}
            }

// -------------------------------------------

        case types.filterDogsTemp: 
            return action.payload == "All" 
                ? {...state, allDogs: state.preloadedDogs} 
                : {
                    ...state,
                    allDogs: [...state.preloadedDogs].filter(e => e.temperament 
                        ? e.temperament.includes(action.payload) 
                        : ""
                    )
            }
            

// -------------------------------------------

        case types.filterDogsCreated: 
            let filteredDogsCreated
            if (action.payload == "db") {
                filteredDogsCreated = state.allDogs.filter(e => e.createdInDb);
                if(!filteredDogsCreated.length) alert("there are no dogs in the database with the current filters")
                else return {...state, allDogs: filteredDogsCreated}
            } else if (action.payload == "api") {
                filteredDogsCreated = state.allDogs.filter(e => !e.createdInDb)
                if(!filteredDogsCreated.length) alert("there are no dogs in the api with the current filters")
                else return {...state, allDogs: filteredDogsCreated}

            }

// -------------------------------------------
        
        case types.postDog:
            return {
                ...state,

            };
    
// -------------------------------------------

        default: return state
        
    }
}

