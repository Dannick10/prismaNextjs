"use server";

import { db } from "@/db";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTodo(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id") as string);

  await db.todo.delete({
    where: { id },
  });

  revalidatePath("/");

  redirect("/");
}

export async function addTodo(formData: FormData): Promise<void> {
  const titulo = formData.get("titulo");
  const descricao = formData.get("descricao");
  const status = "pendente";

  if (typeof titulo !== "string" || typeof descricao !== "string") {
    throw new Error("Título e descrição são obrigatórios.");
  }

  const todo = await db.todo.create({
    data: {
      titulo,
      descricao,
      status,
    },
  });

  console.log(todo);

  redirect("/");
}

export async function findTodoById(id: number) {
  // 11 - erro backend - error.js
  // throw new Error("Ops!");
  
  const todo = await db.todo.findFirst({
    where: { id },
  });

  return todo;
}

export async function updateTodo(
  formState: formState,
  formData: FormData
): Promise<any> {

    const id = parseInt(formData.get("id") as string);
    const titulo = formData.get("titulo");
    const descricao = formData.get("descricao");
    
    if (
      !titulo ||
      !descricao ||
      typeof titulo !== "string" ||
      typeof descricao !== "string"
    ) {
      throw new Error("Título e descrição são obrigatórios.");
    } 

    
    if (titulo.length < 5) {
      return {
        errors: "O título precisa de pelo menos 5 caracteres.",
      };
    }

  if (descricao.length < 10) {
    return {
      errors: "A descrição precisa de pelo menos 10 caracteres.",
    };
  }
  
  await db.todo.update({
    where: { id },
    data: {
      titulo,
      descricao,
    },
  });
  
  redirect("/");

}

export async function toggleTodoStatus(formData: FormData) {
  const todoId = parseInt(formData.get("id") as string);

  // Busca o todo com o ID fornecido.
  const todo = await db.todo.findUnique({
    where: {
      id: todoId,
    },
  });

  // Verifica se o todo existe; se não, lança um erro.
  if (!todo) {
    throw new Error("Todo não encontrado");
  }

  // Determina o novo status baseado no status atual.
  const novoStatus = todo.status === "pendente" ? "completa" : "pendente";

  // Atualiza o todo no banco de dados com o novo status.
  await db.todo.update({
    where: {
      id: todoId,
    },
    data: {
      status: novoStatus,
    },
  });

  // Redireciona o usuário para a página inicial (ou outra página conforme necessário).
  redirect("/");
}
