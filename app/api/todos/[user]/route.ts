import { NextResponse } from 'next/server';
import { getTodos, addTodo, updateTodo, deleteTodo } from '@/app/lib/store';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const user = url.pathname.split('/').pop() || '';
  const todos = getTodos(user);
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const user = url.pathname.split('/').pop() || '';
  const { title, description } = await request.json();
  const newTodo = { id: Date.now(), title, description, completed: false };
  addTodo(user, newTodo);
  return NextResponse.json(newTodo);
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const user = url.pathname.split('/').pop() || '';
  const { id, title, description, completed } = await request.json();
  updateTodo(user, id, { title, description, completed });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const user = url.pathname.split('/').pop() || '';
  const { id } = await request.json();
  deleteTodo(user, id);
  return NextResponse.json({ success: true });
}
