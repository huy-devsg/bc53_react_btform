import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { studentAction } from '../store/slice'
import validate from '../utils/validate'

const StudentForm = () => {
  const dispatch = useDispatch()

  const [formValue, setFormValue] = useState({
    id: '',
    phoneNumber: '',
    fullName: '',
    email: '',
  })

  const { studentEdit } = useSelector((state) => state.studentForm)

  const [formError, setFormError] = useState({
    id: '',
    phoneNumber: '',
    fullName: '',
    email: '',
  })

  const handleFormValue = (name) => (event) => {
    setFormError({ ...formError, [name]: validate(name, event.target.value) })
    setFormValue({
      ...formValue,
      [name]: event.target.value,
    })
  }

  const renderValidate = (name) => {
    if (formError[name]) {
      return (
        <p className="notiVali">
          <small className="text-danger">{formError[name]}</small>
        </p>
      )
    } else {
      return <p className="notiVali"></p>
    }
  }

  useEffect(() => {
    if (studentEdit) {
      setFormValue(studentEdit)
    }
  }, [studentEdit])

  const handleFormSubmit = (ev) => {
    ev.preventDefault()

    const validationError = {}

    Object.keys(formValue).forEach((name) => {
      const error = validate(name, formValue[name])

      if (error && error.length > 0) {
        validationError[name] = error
      }
    })

    if (Object.keys(validationError).length > 0) {
      setFormError({ ...validationError })
      return
    }

    if (studentEdit) {
      dispatch(studentAction.editStudent(formValue))
    } else {
      dispatch(studentAction.addStudent(formValue))
    }
  }

  return (
    <div className="container">
      <form className="row" id="btForm" onSubmit={handleFormSubmit}>
        <div className="bg-dark text-white p-2 fs-5 fw-bold">
          Thông tin sinh viên
        </div>
        <div className="row my-3">
          <div className="col-6">
            <p>Mã SV</p>
            <input
              id="id"
              name="id"
              type=""
              value={formValue.id}
              disabled={studentEdit?.id === formValue.id}
              onChange={handleFormValue('id')}
            />

            {renderValidate('id')}
            <p>Số điện thọai</p>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type=""
              onChange={handleFormValue('phoneNumber')}
              value={formValue.phoneNumber}
            />
            {renderValidate('phoneNumber')}
          </div>
          <div className="col-6">
            <p>Họ tên</p>
            <input
              id="fullName"
              name="fullName"
              type=""
              onChange={handleFormValue('fullName')}
              value={formValue.fullName}
            />
            {renderValidate('fullName')}

            <p>Email</p>
            <input
              id="email"
              name="email"
              type=""
              onChange={handleFormValue('email')}
              value={formValue.email}
            />
            {renderValidate('email')}
          </div>
        </div>
        <div className="mt-4">
          {studentEdit ? (
            <button className="btn btn-info">Cập nhật sinh viên</button>
          ) : (
            <button className="btn btn-success">Thêm sinh viên</button>
          )}
        </div>
      </form>
    </div>
  )
}

export default StudentForm
