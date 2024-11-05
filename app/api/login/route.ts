import { NextResponse } from 'next/server';
import { users } from '@/app/lib/data';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    return NextResponse.json({ success: true, message: 'Login successful' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}
