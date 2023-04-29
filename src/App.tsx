import { useState } from "react";
import "./styles/global.css";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail invalido")
    .refine((email) => {
      return email.endsWith("@gmail.com");
    }, "O e-mail precisa ser do google"),
  password: z.string().min(6, "A senha precisa ter no minimo 6 caracteres"),
  techs: z.array(
    z.object({
      title: z.string().nonempty("O titulo é obrigatório"),
      knowledge: z.number()
      .min(1)
      .max(100)
      
    })
  ),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function App() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  function addNweTech() {
    append({ title: "", knowledge: 0 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <>
      <main className="h-screen bg-zinc-950  text-zinc-50 flex flex-col gap-10  items-center justify-center">
        <form
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <div className="flex flex-col gap-1">
            <label>Nome</label>
            <input
              type="text"
              {...register("name")}
              className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label>E-mail</label>
            <input
              type="email"
              {...register("email")}
              className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Senha </label>
            <input
              type="password"
              {...register("password")}
              className="border border-zinc-800 shadow-sm rounded h-10 bg-zinc-900 text-white px-3"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="flex items-center justify-between">
              Tecnologias
              <button
                type="button"
                onClick={addNweTech}
                className="text-emerald-500 text-xs"
              >
                Adicionar
              </button>
            </label>

            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex gap-2">
                  <div className="flex-1 flex-col gap-1">
                    <input
                      type="text"
                      {...register(`techs.${index}.title`)}
                      className=" flex-1 border border-zinc-800 shadow-sm rounded h-10 bg-zinc-900 text-white px-3"
                    />

                    {errors.techs?.[index]?.title && (
                      <span>{errors.techs?.[index]?.title?.message}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      type="number"
                      {...register(`techs.${index}.knowledge`)}
                      className="w-16 border border-zinc-800 shadow-sm rounded h-10 bg-zinc-900 text-white px-3"
                    />
                    {errors.techs?.[index]?.knowledge && (
                      <span>{errors.techs?.[index]?.knowledge?.message}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
          >
            Salvar
          </button>
        </form>

        <pre>{output}</pre>
      </main>
    </>
  );
}

export default App;
