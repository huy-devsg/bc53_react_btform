import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentList: [
    {
      id: '123',
      phoneNumber: '09111111111',
      fullName: 'Nguyễn Văn A',
      email: 'huy656363@gmail.com',
    },
    {
      id: '124',
      phoneNumber: '09222222222',
      fullName: 'Nguyễn Văn C',
      email: 'huy656363@gmail.com',
    },
    {
      id: '125',
      phoneNumber: '09333333333',
      fullName: 'Nguyễn Văn D',
      email: 'huy656363@gmail.com',
    },
  ],
  studentEdit: undefined,
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, { payload }) => {
      state.studentList.push(payload)
    },
    setStudentEdit: (state, { payload }) => {
      state.studentEdit = payload
    },
    editStudent: (state, { payload }) => {
      const index = state.studentList.findIndex(
        (value) => value.id === payload.id
      )
      if (index !== -1) {
        state.studentList[index] = payload
      }
      state.studentEdit = undefined
    },
    delStudent: (state, { payload }) => {
      state.studentList = state.studentList.filter(
        (value) => value.id !== payload.id
      )
    },
  },
})
export const { reducer: studentReducer, actions: studentAction } = studentSlice
