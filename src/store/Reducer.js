
const initialState = {
    simpleData:[],
    simpleInput:'',
    

    lingo:{},
    kmeans:{},
    stc:{},
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
        case ('lingo'):
            return {
                ...state,
                lingo:action.data
            }
        case ('kmeans'):
            return {
                ...state,
                kmeans:action.data
            }
        case ('stc'):
            return {
                ...state,
                stc:action.data
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