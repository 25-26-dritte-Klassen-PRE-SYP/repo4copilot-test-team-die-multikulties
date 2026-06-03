export interface Course {
  id: string
  name: string
  language: string
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
  instructor: string
  price: number
  startDate: string
  endDate: string
  maxParticipants: number
  currentParticipants: number
  description: string
}

export type CourseFormData = Omit<Course, "id" | "currentParticipants">
