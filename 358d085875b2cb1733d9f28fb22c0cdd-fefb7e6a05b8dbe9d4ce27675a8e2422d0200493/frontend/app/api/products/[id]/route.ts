import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${API_URL}/api/products/${params.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
