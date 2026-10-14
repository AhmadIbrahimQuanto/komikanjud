import { NextResponse } from 'next/server'

// Mock data storage (in-memory for demo)
let comics: any[] = []

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const comic = comics.find(c => c.id === parseInt(params.id))

  if (!comic) {
    return NextResponse.json({ error: 'Comic not found' }, { status: 404 })
  }

  return NextResponse.json(comic)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, volume, creator, photo } = body

    const index = comics.findIndex(c => c.id === parseInt(params.id))
    if (index === -1) {
      return NextResponse.json({ error: 'Comic not found' }, { status: 404 })
    }

    comics[index] = {
      ...comics[index],
      title,
      volume,
      creator,
      photo,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(comics[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update comic' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const index = comics.findIndex(c => c.id === parseInt(params.id))
    if (index === -1) {
      return NextResponse.json({ error: 'Comic not found' }, { status: 404 })
    }

    comics.splice(index, 1)
    return NextResponse.json({ message: 'Comic deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comic' }, { status: 500 })
  }
}
