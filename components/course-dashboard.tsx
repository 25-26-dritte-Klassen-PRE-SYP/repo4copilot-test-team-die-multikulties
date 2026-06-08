"use client"

import type { Course, CourseFormData } from "@/lib/types"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CourseCard } from "@/components/course-card"
import { CourseForm } from "@/components/course-form"
import { Plus, Search, BookOpen } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function CourseDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch("/api/courses")
      if (res.ok) {
        const data = await res.json()
        setCourses(data)
      }
    } catch (error) {
      console.error("Fehler beim Laden der Kurse:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleCreate = async (data: CourseFormData) => {
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        fetchCourses()
      }
    } catch (error) {
      console.error("Fehler beim Erstellen:", error)
    }
  }

  const handleUpdate = async (data: CourseFormData) => {
    if (!editingCourse) return
    try {
      const res = await fetch(`/api/courses/${editingCourse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        fetchCourses()
        setEditingCourse(null)
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/courses/${deleteId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchCourses()
      }
    } catch (error) {
      console.error("Fehler beim Löschen:", error)
    } finally {
      setDeleteId(null)
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Multilingo</h1>
              <p className="text-sm text-muted-foreground">Kursverwaltung</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Kurse suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Neuer Kurs
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Keine Kurse gefunden</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery
                ? "Versuchen Sie eine andere Suche."
                : "Erstellen Sie Ihren ersten Kurs."}
            </p>
            {!searchQuery && (
              <Button className="mt-4" onClick={() => setFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Neuer Kurs
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={(c) => {
                  setEditingCourse(c)
                  setFormOpen(true)
                }}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>
        )}
      </main>

      <CourseForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingCourse(null)
        }}
        course={editingCourse}
        onSubmit={editingCourse ? handleUpdate : handleCreate}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kurs löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie diesen Kurs löschen möchten? Diese Aktion
              kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Löschen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
