import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
    name:"slider",
    initialState:{
        imgSrc:["computersetup.jpg","pexels-dianne-230629.jpg","pexels-ruvim-miksanskiy-1438761.jpg"],
        imgNumber:0,
    },
    reducers:{
        nextImage: state => {
            state.imgNumber++;
            if(state.imgNumber === (state.imgSrc.length)){
                state.imgNumber = 0;
            }
        },
        previousImage: state => {
            state.imgNumber--;
            if(state.imgNumber === -1){
                state.imgNumber = (state.imgSrc.length - 1);
            }
        }
    }
});

export const { nextImage, previousImage} = sliderSlice.actions;
export default sliderSlice.reducer;