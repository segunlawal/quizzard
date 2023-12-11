import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const {
      quizTitle,
      numberOfQuestions,
      numberOfCorrectAnswers,
      percentageScored,
      takerId,
      takerName,
    } = await req.json();

    const quiz = await prisma.quizTaken.create({
      data: {
        quizTitle,
        numberOfQuestions,
        numberOfCorrectAnswers,
        percentageScored,
        takerId,
        takerName,
      },
      include: {
        takerIdentity: true,
        taker: true,
      },
    });

    return NextResponse.json({
      quiz: {
        success: 'Quiz submitted successfully',
      },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
