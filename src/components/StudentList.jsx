import { useDispatch, useSelector } from 'react-redux'
import { studentAction } from '../store/slice'
import { useEffect, useState } from 'react'

const StudentList = () => {
  const { studentList, studentEdit } = useSelector((state) => state.studentForm)

  const dispatch = useDispatch()

  const [searchResult, setSearchResult] = useState(studentList)
  useEffect(() => {
    setSearchResult(studentList)
  }, [studentList])
  return (
    <div className="container my-3">
      <div className="input-group rounded my-3">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Tìm kiếm theo tên hoặc ID"
          aria-label="Tìm kiếm theo tên hoặc ID"
          aria-describedby="search-addon"
          onChange={(ev) => {
            let keyWord = ev.target.value.toLowerCase()
            if (keyWord) {
              const result = studentList.filter((value) => {
                return (
                  value.id.toLowerCase().includes(keyWord) ||
                  value.fullName.toLowerCase().includes(keyWord)
                )
              })
              setSearchResult(result)
            } else {
              setSearchResult(studentList)
            }
          }}
        />
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col">Mã SV</th>
              <th scope="col">Họ Tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.fullName}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-warning text-black"
                    onClick={() => {
                      dispatch(studentAction.setStudentEdit(student))
                    }}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger  text-white mx-3"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Bạn chắc chắn muốn xóa Student : ${student.id} ?`
                        )
                      ) {
                        dispatch(studentAction.delStudent(student))
                      }
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
            {searchResult.length === 0 && (
              <tr>
                <td colSpan="5">Không có sinh viên</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentList
