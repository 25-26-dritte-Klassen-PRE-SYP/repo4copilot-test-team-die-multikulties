import type { Course } from "./types"

// In-memory storage for courses
const courses: Map<string, Course> = new Map()

// Initialize with sample data
const sampleCourses: Course[] = [
  {
    id: "1",
    name: "Deutsch Intensiv",
    language: "Deutsch",
    level: "A1",
    instructor: "Maria Schmidt",
    price: 299,
    startDate: "2026-07-01",
    endDate: "2026-08-31",
    maxParticipants: 15,
    currentParticipants: 8,
    description: "Intensivkurs für Anfänger ohne Vorkenntnisse",
  },
  {
    id: "2",
    name: "English Business",
    language: "Englisch",
    level: "B2",
    instructor: "John Miller",
    price: 399,
    startDate: "2026-07-15",
    endDate: "2026-09-15",
    maxParticipants: 12,
    currentParticipants: 10,
    description: "Business English für Fortgeschrittene",
  },
  {
    id: "3",
    name: "Español para Viajeros",
    language: "Spanisch",
    level: "A2",
    instructor: "Carlos García",
    price: 249,
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    maxParticipants: 20,
    currentParticipants: 5,
    description: "Spanisch für Reisende und Urlauber",
  },
]

// Initialize store with sample data
sampleCourses.forEach((course) => courses.set(course.id, course))

let nextId = 4

export function getAllCourses(): Course[] {
  return Array.from(courses.values())
}

export function getCourseById(id: string): Course | undefined {
  return courses.get(id)
}

export function createCourse(courseData: Omit<Course, "id" | "currentParticipants">): Course {
  const id = String(nextId++)
  const newCourse: Course = {
    ...courseData,
    id,
    currentParticipants: 0,
  }
  courses.set(id, newCourse)
  return newCourse
}

export function updateCourse(id: string, courseData: Partial<Omit<Course, "id">>): Course | null {
  const existingCourse = courses.get(id)
  if (!existingCourse) return null

  const updatedCourse: Course = {
    ...existingCourse,
    ...courseData,
  }
  courses.set(id, updatedCourse)
  return updatedCourse
}

export function deleteCourse(id: string): boolean {
  return courses.delete(id)
}
