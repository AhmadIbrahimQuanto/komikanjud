import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const comic = await prisma.comic.findUnique({
      where: { id: parseInt(id) }
    })

    if (!comic) {
      return NextResponse.json({ error: 'Comic not found' }, { status: 404 })
    }

    return NextResponse.json(comic)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comic' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, volume, creator, photo } = body

    const comic = await prisma.comic.update({
      where: { id: parseInt(id) },
      data: {
        title,
        volume,
        creator,
        photo
      }
    })

    return NextResponse.json(comic)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update comic' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.comic.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Comic deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comic' }, { status: 500 })
  }
}
