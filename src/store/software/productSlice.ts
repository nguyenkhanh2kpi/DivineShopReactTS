import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import env from 'react-dotenv';

export interface Software {
    id: number,
    name: string,
    description: string,
    warranty_policy: string,
    frequency_question: string,
    image_url: string,
    price: number,
    quantity: number,
    category : {
        id:number,
        name: string,
    }
    has_key: boolean,
    active_by_email: boolean,
    is_one_product_per_pay: boolean,
    old_price: number,
    key_word: number,
}

export interface SoftwareState {
    softwares: Software[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: SoftwareState = {
    softwares:[],
    loading: false,
    error: null,
};

export const getSoftwares = createAsyncThunk("software", async()=> {
    return fetch(`${env.API_URL}/divine/softwares/`)
    .then(res => res.json())
})


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getSoftwares.pending, (state)=> {
            state.loading = true
        })
        .addCase(getSoftwares.fulfilled, (state, action: PayloadAction<any>)=> {
            state.loading = false;
            state.error = null;
            state.softwares = action.payload;
        })
        .addCase(getSoftwares.rejected, (state, action: PayloadAction<any>)=> {
            state.loading = false;
            state.error = action.payload;
            state.softwares = [];
        })
    }
});

export default productSlice.reducer;


