import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    workoutBanners: ["workout1", "workout2", "workout3", "workout1", "workout2", "workout3", "workout1", "workout2", "workout3"],
    workoutCategories: [
        { "id": 1, "category": "Cardio" },
        { "id": 2, "category": "Strength Training" },
        { "id": 3, "category": "Flexibility" },
        { "id": 4, "category": "Balance" },
        { "id": 5, "category": "Endurance" },
        { "id": 6, "category": "HIIT" },
        { "id": 7, "category": "Yoga" },
        { "id": 8, "category": "Pilates" }
    ]
}


export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {

        getWorkoutBanners: (state, action) => {
            return state.workoutBanners;
        },

        orderFunc: (state, action) => {
            state.orderOption = action.payload;
            console.log("Order Option : ", state.orderOption);
        }
    }
})

export const { getWorkoutBanners, orderFunc, workoutBanners, workoutCategories } = workoutSlice.actions

export default workoutSlice.reducer