import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik'
import * as Yup from 'yup'

type User = {
  name: string
  email: string
}

function getUsers(): User[] {
  const users = localStorage.getItem('user')
  return users ? JSON.parse(users) : []
}

function FormikForm() {
  const [success, setSuccess] = useState(false)

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  })

  function onSubmit(data: User, helpers: FormikHelpers<User>) {
    const users = getUsers()

    localStorage.setItem('user', JSON.stringify([...users, data]))

    setSuccess(true)

    setTimeout(() => {
      setSuccess(false)
    }, 2000)

    helpers.resetForm()
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-4">
          <Field name="name" placeholder="Name" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200" />
          <ErrorMessage name="name" component="p" className="-mt-2 text-sm text-red-500" />

          <Field name="email" placeholder="Email" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200" />
          <ErrorMessage name="email" component="p" className="-mt-2 text-sm text-red-500" />

          <button type="submit" className="mt-2 py-2.5 rounded-lg font-semibold text-white bg-purple-600 shadow-md transition hover:bg-purple-700 cursor-pointer">
            Send
          </button>
        </Form>
      </Formik>

      <div
        className={
          success
            ? 'mt-4 text-center bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium px-4 py-3 rounded-lg transition-all duration-500 opacity-100 translate-y-0'
            : 'mt-4 text-center bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium px-4 py-3 rounded-lg transition-all duration-500 opacity-0 -translate-y-3 pointer-events-none'
        }
      >
        ✓ User added successfully!
      </div>
    </div>
  )
}

export default FormikForm
