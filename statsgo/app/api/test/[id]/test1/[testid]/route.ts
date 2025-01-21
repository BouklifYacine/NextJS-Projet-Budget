import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string; testid: string } }
) {
  const { id, testid } = await params;

  return NextResponse.json({
    message: `Vous avez accédé à la route test/${id}/test1/${testid}`,
    id: id,
    testid: testid,
  });
}

