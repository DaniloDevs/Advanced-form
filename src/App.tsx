import './styles/global.css'


import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'



const createUserSchema = z.object({
  Name: z.string().nonempty("O Nome e obrigatorio!"),
  UserName: z.string().nonempty("Seu nome de usuario e obrigatorio!"),
  Email: z.string().email("Formato de e-mail invalido!"),
  Password: z.string().min(8, "Sua senha e pequena de mais!"),
  CellNumber: z.string().min(11, "Seu numero de telefone e invalido!"),
  Birthday: z.string().nonempty("Sua data de aniversario e obrigatoria!"),
  
})

function App() {
  const [ output, setOutput ] = useState('')
  const { 
    register, 
    handleSubmit, 
    formState: {errors} } = useForm({
    resolver: zodResolver(createUserSchema),
  })


  function createUser (data: any) { 
    setOutput(JSON.stringify(data, null, 2))
  }


  return (
    <>
      <main className='flex gap-12 items-center m-auto'>
        <div className="border-b  border-gray-400 pb-4  w-1/2 flex flex-col m-auto mt-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className=" text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <form onSubmit={handleSubmit(createUser)} >
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    autoComplete="given-name"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("Name")}
                  />

                  {errors.Name && <span>{errors.Name.message}</span>}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="UserName"
                    autoComplete="family-name"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("UserName")}
                  />

                  {errors.UserName && <span>{errors.UserName.message}</span>}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("Email")}
                  />

                  {errors.Email && <span>{errors.Email.message}</span>}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="Password"
                    autoComplete="address-level2"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("Password")}
                  />

                  {errors.Password && <span>{errors.Password.message}</span>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cell number" className="block text-sm font-medium leading-6 text-gray-900">
                  cell number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="cell number"
                    autoComplete="address-level1"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("CellNumber")}
                  />

                  {errors.CellNumber && <span>{errors.CellNumber.message}</span>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cell number" className="block text-sm font-medium leading-6 text-gray-900">
                  birthday
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="birthday"
                    autoComplete="address-level1"
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("Birthday")}
                  />

                  {errors.Birthday && <span>{errors.Birthday.message}</span>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md mt-5 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Save Form
            </button>
          </form>
        </div>

        <pre>{output}</pre>
      </main>
    </>
  )
}

export default App
