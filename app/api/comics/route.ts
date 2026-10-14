import { NextResponse } from 'next/server'

// Mock data storage (in-memory for demo)
let comics: any[] = []

export async function GET() {
  return NextResponse.json(comics)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, volume, creator, photo } = body

    if (!title || !volume || !creator || !photo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newComic = {
      id: Date.now(),
      title,
      volume,
      creator,
      photo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    comics.push(newComic)
    return NextResponse.json(newComic, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comic' }, { status: 500 })
  }
}
