import { useEffect, useState } from "react"
import type { Course, CourseWorkWithSubmission } from "shared"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

// MOCK DATA untuk demo UI
const MOCK_COURSES: Course[] = [
  { id: "1", name: "Perak 2025", section: "Sistem Informasi" },
  { id: "2", name: "PPSI 2024", section: "Sistem Informasi" },
  { id: "3", name: "Praktikum PWL 2024 A", section: "Kelas A" },
  { id: "4", name: "Etika Profesi Kelas A", section: "2023/2024 - Genap" },
]

const MOCK_COURSEWORK: CourseWorkWithSubmission[] = [
  {
    courseWork: {
      id: "1",
      courseId: "1",
      title: "Pengumpulan Prototipe dan Aplikasi",
      description: "Untuk tugas selanjutnya, perwakilan anggota link Figma Prototype aplikasi dan link GitHub program yang telah dibuat.",
      dueDate: { year: 2024, month: 5, day: 16 },
      maxPoints: 100,
      materials: [],
    },
    submission: {
      state: "TURNED_IN",
      assignedGrade: 85,
      assignmentSubmission: { attachments: [] },
      late: false,
    },
  },
  {
    courseWork: {
      id: "2",
      courseId: "1",
      title: "Slide Presentasi Startup Day Sisfo",
      description: "Slide dikumpulkan dalam format pptx. Jumlah slide disesuaikan dengan waktu presentasi yang dilaksanakan dalam kurun waktu 7 menit.",
      dueDate: { year: 2024, month: 5, day: 16 },
      maxPoints: 100,
      materials: [],
    },
    submission: {
      state: "TURNED_IN",
      assignedGrade: 90,
      assignmentSubmission: { attachments: [] },
      late: false,
    },
  },
  {
    courseWork: {
      id: "3",
      courseId: "1",
      title: "Pengumpulan Business Plan",
      description: "Harap mencetak business plan sebanyak 2 rangkap. Dokumen dikumpulkan di jurusan 16 Mei 2024 di ruang jurusan Sistem Informasi.",
      dueDate: { year: 2024, month: 5, day: 16 },
      maxPoints: 100,
      materials: [],
    },
    submission: {
      state: "CREATED",
      assignmentSubmission: { attachments: [] },
      late: true,
    },
  },
  {
    courseWork: {
      id: "4",
      courseId: "1",
      title: "Poster Produk",
      description: "Contoh Poster Produk dapat dilihat pada link berikut",
      dueDate: { year: 2024, month: 5, day: 13 },
      maxPoints: 100,
      materials: [],
    },
    submission: {
      state: "TURNED_IN",
      assignedGrade: 88,
      assignmentSubmission: { attachments: [] },
      late: false,
    },
  },
]

function formatDueDate(dueDate?: { year: number; month: number; day: number }) {
  if (!dueDate) return "Tidak ada deadline"
  return new Date(dueDate.year, dueDate.month - 1, dueDate.day).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  })
}

function stateLabel(state?: string) {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    TURNED_IN: { label: "Dikumpulkan", variant: "default" },
    RETURNED: { label: "Dinilai", variant: "secondary" },
    CREATED: { label: "Belum Dikumpulkan", variant: "destructive" },
    NEW: { label: "Belum Dimulai", variant: "outline" },
  }
  return map[state ?? ""] ?? { label: state ?? "–", variant: "outline" }
}

function CourseWorkCard({ item }: { item: CourseWorkWithSubmission }) {
  const { courseWork, submission } = item
  const { label, variant } = stateLabel(submission?.state)
  const score = submission?.assignedGrade

  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">
            {courseWork.title}
          </CardTitle>
          <Badge variant={variant} className="shrink-0">
            {label}
          </Badge>
        </div>
        <CardDescription className="text-xs mt-1">
          🗓 {formatDueDate(courseWork.dueDate)}
        </CardDescription>
      </CardHeader>

      <Separator />

      <ScrollArea className="flex-1 min-h-0">
        <CardContent className="flex flex-col gap-3 pt-3 pb-4">
          {courseWork.description && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-muted-foreground">DESKRIPSI</p>
              <p className="text-sm text-foreground whitespace-pre-wrap line-clamp-4">
                {courseWork.description}
              </p>
            </div>
          )}

          {submission && (
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-muted-foreground">SKOR</p>
              {score !== undefined ? (
                <span className="text-sm font-bold text-primary">
                  {score} / {courseWork.maxPoints}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">Belum dinilai</span>
              )}
            </div>
          )}

          {submission?.late && (
            <Badge variant="destructive">⚠ Terlambat</Badge>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  )
}

export default function App() {
  const [courses] = useState<Course[]>(MOCK_COURSES)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [items, setItems] = useState<CourseWorkWithSubmission[]>([])

  const loadSubmissions = (courseId: string) => {
    setSelectedCourse(courseId)
    // Mock: selalu return MOCK_COURSEWORK
    setItems(MOCK_COURSEWORK)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">📚 Google Classroom Viewer</h1>
        <Badge variant="outline">🎭 Demo Mode (Mock Data)</Badge>
      </div>

      {/* Pilih Course */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-muted-foreground mb-2">PILIH MATA KULIAH</p>
        <div className="flex flex-wrap gap-2">
          {courses.map((c) => (
            <Button
              key={c.id}
              variant={selectedCourse === c.id ? "default" : "outline"}
              size="sm"
              onClick={() => loadSubmissions(c.id)}
            >
              {c.name}
              {c.section && <span className="ml-1 text-xs opacity-70">· {c.section}</span>}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Grid tugas */}
      {selectedCourse && items.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground mb-4">{items.length} tugas ditemukan</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <CourseWorkCard key={item.courseWork.id} item={item} />
            ))}
          </div>
        </>
      )}

      {!selectedCourse && (
        <div className="text-center py-12 text-muted-foreground">
          Pilih mata kuliah untuk melihat tugas
        </div>
      )}
    </div>
  )
}
