import { createSlice,PayloadAction,createAsyncThunk  } from '@reduxjs/toolkit';

type Origin = {
    name:string,
    url:string,
}
type Location = {
    name:string,
    url:string,
}


type Char = {
    [index: string]: string | Origin | Location | Array<string>;
    id:string,
    name:string,
    status:string,
    species:string,
    type:string,
    gender:string,
    origin:Origin,
    location:Location,
    image:string,
    episode:Array<string>,
    url:string,
    created:string,
}

type RickAndMortyState = {
    chars: Char[],
    loading: boolean,
    error: boolean,
    selectedId: string | null,
    selectedChar:Char | null,
}

const initialState:RickAndMortyState = {
    chars: [],
    loading: false,
    error: false,
    selectedId: null,
    selectedChar: null
}

export const fetchChars = createAsyncThunk<Char[],number,{rejectValue: string}>(
    'rickAndMorty/fetchChars',
    async function(page, {rejectWithValue}) {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            
        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }
        const data = await response.json();
        const chars:Char[] = data.results;
        return chars;          
    }
)

export const fetchChar = createAsyncThunk<Char,string,{rejectValue: string}>(
    'rickAndMorty/fetchChar',
    async function(id,{rejectWithValue}) {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            
        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }
        const char = await response.json();
        
        return char;  
    }
)


const rickAndMorty = createSlice({
    name:'rickAndMorty',
    initialState,
    reducers: {
        setSelectedId(state,action:PayloadAction<string>) {
            state.selectedId = action.payload;
        }
    },extraReducers:(builder) => {
        builder
            .addCase(fetchChars.pending, (state,action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchChars.fulfilled, (state,action) => {
                return {
                    ...state,
                    chars: [...state.chars,...action.payload],
                    loading: false,
                }
            })
            .addCase(fetchChars.rejected,(state,action) => {
                state.loading = false;
                state.error = true;
            })


            .addCase(fetchChar.pending, (state,action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchChar.fulfilled, (state,action) => {
                state.selectedChar = action.payload;
                state.loading = false;
            })
            .addCase(fetchChar.rejected,(state,action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export const {setSelectedId} = rickAndMorty.actions;

export default rickAndMorty.reducer;