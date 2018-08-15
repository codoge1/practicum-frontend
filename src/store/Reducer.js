
const initialState = {
    simpleData:[],
    simpleInput:'',
    

    advancedData:{},
    classData:[],
    patent:{},
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ('simpleData'):
            return {
                ...state,
                simpleData:action.data
            }
        case ('simpleInput'):
            return {
                ...state,
                simpleInput:action.input
            }
        case ('simpleIndex'):
            return {
                ...state,
                simpleIndex:action.index,
                patent:state.simpleData[action.index]
            }
        case ('advancedData'):
            return {
                ...state,
                advancedData:action.data
            }
        case ('classData'):
            return {
                ...state,
                classData:action.classData
            }
        case ('patent'):
            return {
                ...state,
                patent:action.patent
            }
    }
}

export default reducer