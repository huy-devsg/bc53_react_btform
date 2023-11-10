const validate = (name, value) => {
  switch (name) {
    case 'id':
      if (value.trim() === '') {
        return 'Vui lòng nhập mã SV'
      } else {
        return ''
      }

    case 'phoneNumber':
      if (value.trim() === '') {
        return 'Vui lòng nhập số điện thoại'
      } else if (!/[0-9]/.test(value)) {
        return 'Vui lòng nhập số điện thoại đúng định dạng'
      } else {
        return ''
      }

    case 'fullName':
      if (value.trim() === '') {
        return 'Vui lòng nhập họ tên'
      } else if (!/^[^\d!@#\$%^&*()_+={}\[\]:;"'<>,.?/~`|\\-]*$/.test(value)) {
        return 'Vui lòng nhập họ tên là chữ và không có kí tự đặc biệt'
      } else {
        return ''
      }

    case 'email':
      if (value === '') {
        return 'Vui lòng nhập email'
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        return 'Email không đúng định dạng'
      } else {
        return ''
      }

    default:
      return ''
  }
}
export default validate
