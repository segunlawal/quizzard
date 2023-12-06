import { hash } from 'bcrypt';
import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const hashed = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    return NextResponse.json({
      user: {
        email: user.email,
      },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return new NextResponse(
        JSON.stringify({ error: 'User already exists' }),
        {
          status: 400,
        },
      );
    }
    return new NextResponse(
      JSON.stringify({ error: 'Error signing up. Try again' }),
      {
        status: 500,
      },
    );
  }
}
