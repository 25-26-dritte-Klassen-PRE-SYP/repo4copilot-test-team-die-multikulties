import { NextResponse } from "next/server"
import { getAllCourses, createCourse } from "@/lib/courses-store"
import type { CourseFormData } from "@/lib/types"

// GET all courses
export async function GET() {
  const courses = getAllCourses()
  return NextResponse.json(courses)
}

// POST create new course
export async function POST(request: Request) {
  try {
    const body: CourseFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.language || !body.level || !body.instructor) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen" },
        { status: 400 }
      )
    }

    const newCourse = createCourse(body)
    return NextResponse.json(newCourse, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage" },
      { status: 400 }
    )
  }
}
