import { NextResponse } from "next/server"
import { getCourseById, updateCourse, deleteCourse } from "@/lib/courses-store"
import type { Course } from "@/lib/types"

// GET single course
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const course = getCourseById(id)

  if (!course) {
    return NextResponse.json(
      { error: "Kurs nicht gefunden" },
      { status: 404 }
    )
  }

  return NextResponse.json(course)
}

// PUT update course
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: Partial<Course> = await request.json()

    const updatedCourse = updateCourse(id, body)

    if (!updatedCourse) {
      return NextResponse.json(
        { error: "Kurs nicht gefunden" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedCourse)
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage" },
      { status: 400 }
    )
  }
}

// DELETE course
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const success = deleteCourse(id)

  if (!success) {
    return NextResponse.json(
      { error: "Kurs nicht gefunden" },
      { status: 404 }
    )
  }

  return NextResponse.json({ message: "Kurs erfolgreich gelöscht" })
}
