import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const comics = await prisma.comic.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(comics)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comics' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, volume, creator, photo } = body

    if (!title || !volume || !creator || !photo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newComic = await prisma.comic.create({
      data: {
        title,
        volume,
        creator,
        photo
      }
    })

    return NextResponse.json(newComic, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comic' }, { status: 500 })
  }
}
