import { JSONFilePreset } from "lowdb/node";
import type { FastifyInstance } from "fastify";

import type { TodoItem } from "todolist-typings";

const dbPath =
  process.env.NODE_ENV === "development" ? "db.json" : "/tmp/data/db.json";
const db = await JSONFilePreset<{ todos: TodoItem[] }>(dbPath, { todos: [] });

export function initRoutes(fastify: FastifyInstance) {
  fastify.get("/api/v1/todos", async function handler() {
    await db.read();
    return db.data.todos;
  });

  fastify.post<{ Body: string }>(
    "/api/v1/add",
    async function handler(request) {
      const todoItem = JSON.parse(request.body);
      db.data.todos.push(todoItem);

      await db.write();
    }
  );

  fastify.get<{
    Params: {
      id: string;
    };
  }>("/api/v1/check/:id", async function handler(request, reply) {
    const { id } = request.params,
      todoItem = db.data.todos.find((item) => item.id === id);

    if (!todoItem) {
      return reply.code(500);
    }

    todoItem.checked = !todoItem.checked;

    await db.write();
  });

  fastify.post<{ Body: string }>(
    "/api/v1/delete",
    async function handler(request, reply) {
      let post;

      try {
        post = JSON.parse(request.body);
      } catch (err) {
        console.log(err);
        reply.code(500);
      }

      const idForDelete = post.id;
      db.data.todos = db.data.todos.filter((item) => item.id !== idForDelete);

      await db.write();
    }
  );
}
