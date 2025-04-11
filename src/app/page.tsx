import { db } from "@/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { deleteTodo } from "./actions";

export default async function Home() {

  await new Promise((a) => setTimeout(a,2000))

  const todos = await db.todo.findMany();

  return (
    <div className="container mx-auto p-4">
      <Link href={"/todo/create"}>Ir para criação</Link>
      <h1>Todos!</h1>
      <p className="space-y-4"></p>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`bg-gray-100 p-4 rounded-lg shadow ${
              todo.status === "completa" ? "bg-green-100" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{todo.titulo}</h2>
                <p>{todo.descricao}</p>
              </div>
              <div className="flex space-x-2 mt-3">
                <Link
                  href={`/todo/${todo.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Visualizar
                </Link>
                <Link
                  href={`/todo/${todo.id}/edit/`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </Link>
                {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Excluir
                </button> */}
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Excluir
                  </button>
                </form>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
