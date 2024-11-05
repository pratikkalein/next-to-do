import { NextResponse } from 'next/server';
import { getTodos, addTodo, updateTodo, deleteTodo } from '@/app/lib/store';

export async function GET(req: Request, { params }: { params: { user: string } }) {
  const todos = getTodos(params.user);
  return NextResponse.json(todos);
}

export async function POST(req: Request, { params }: { params: { user: string } }) {
  const { title, description } = await req.json();
  const newTodo = { id: Date.now(), title, description, completed: false };
  addTodo(params.user, newTodo);
  return NextResponse.json(newTodo);
}

export async function PUT(req: Request, { params }: { params: { user: string } }) {
  const { id, title, description, completed } = await req.json();
  updateTodo(params.user, id, { title, description, completed });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { user: string } }) {
  const { id } = await req.json();
  deleteTodo(params.user, id);
  return NextResponse.json({ success: true });
}
