"use client"

import type { Course } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Users, Calendar, Euro } from "lucide-react"

interface CourseCardProps {
  course: Course
  onEdit: (course: Course) => void
  onDelete: (id: string) => void
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-"
    return new Date(dateStr).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {course.level}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{course.language}</p>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description || "Keine Beschreibung"}
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {course.currentParticipants}/{course.maxParticipants} Teilnehmer
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(course.startDate)} - {formatDate(course.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Euro className="h-4 w-4" />
            <span>{course.price} EUR</span>
          </div>
        </div>
        <p className="text-sm">
          <span className="text-muted-foreground">Kursleiter:</span>{" "}
          {course.instructor}
        </p>
      </CardContent>
      <CardFooter className="gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(course)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Bearbeiten
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(course.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Löschen
        </Button>
      </CardFooter>
    </Card>
  )
}
