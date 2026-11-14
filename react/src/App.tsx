import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormikForm from './components/FormikForm.tsx'

type User = {
  name: string
  email: string
}

function getUsers(): User[] {
  const users = localStorage.getItem('user')
  return users ? JSON.parse(users) : []
}

function App() {
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, reset, formState } = useForm<User>()
  const errors = formState.errors
  const isValid = formState.isValid

  function onSubmit(data: User) {
    const users = getUsers()

    localStorage.setItem('user', JSON.stringify([...users, data]))

    setSuccess(true)

    setTimeout(() => {
      setSuccess(false)
    }, 2000)

    reset()
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 px-4 py-12">
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">React Hook Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Minimum 3 characters',
                },
              })}
              placeholder="Name"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            {errors.name && <p className="-mt-2 text-sm text-red-500">{errors.name.message}</p>}

            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email',
                },
              })}
              placeholder="Email"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            {errors.email && <p className="-mt-2 text-sm text-red-500">{errors.email.message}</p>}

            <button
              disabled={!isValid}
              type="submit"
              className={isValid ? 'mt-2 py-2.5 rounded-lg font-semibold text-white bg-indigo-600 shadow-md transition hover:bg-indigo-700 cursor-pointer' : 'mt-2 py-2.5 rounded-lg font-semibold text-white bg-slate-300 cursor-not-allowed'}
            >
              Send
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800">Formik</h1>
          <FormikForm />
        </div>
      </div>

      <div
        className={
          success
            ? 'fixed top-6 left-1/2 -translate-x-1/2 w-80 text-center bg-emerald-500 text-white font-medium px-4 py-3 rounded-xl shadow-lg transition-all duration-500 opacity-100 translate-y-0'
            : 'fixed top-6 left-1/2 -translate-x-1/2 w-80 text-center bg-emerald-500 text-white font-medium px-4 py-3 rounded-xl shadow-lg transition-all duration-500 opacity-0 -translate-y-3 pointer-events-none'
        }
      >
        ✓ User added successfully!
      </div>
    </div>
  )
}

export default App
