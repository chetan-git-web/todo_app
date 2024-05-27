import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    loggingUser:(state,action)=>{
        state.value = action.payload
    },
    logoutUser: (state) => {
      state.value = {}
    },
  },
})


// Action creators are generated for each case reducer function
export const { loggingUser, logoutUser} = userSlice.actions

export default userSlice.reducer