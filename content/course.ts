/**
 * ─────────────────────────────────────────────────────────────
 *  COURSE FACTS — taken from the official course documents.
 * ─────────────────────────────────────────────────────────────
 *  Source: "1_2026_syllabus_CPE 102 Engineering Exploration.pdf" (semester 1/2569)
 *  and the First Project details. Keep this file factual; your own writing goes in
 *  content/site.ts, content/weeks/*.mdx and content/projects/*.mdx.
 */

export const course = {
  code: "CPE102",
  name: "Engineering Exploration",
  university: "King Mongkut's University of Technology Thonburi",
  universityShort: "KMUTT",
  department: "Department of Computer Engineering",
  semester: "Semester 1/2569 (2026)",
  labRoom: "CPE 1114",
  textbook: "Exploring Engineering: An Introduction to Engineering and Design (2nd ed.) — Kosky, Balmer, Keat & Wise",

  instructors: [
    { name: "Asst. Prof. Jumpol Polvichai, Ph.D." },
    { name: "Prof. Chawisorn Samrit, Ph.D." },
    { name: "Asst. Prof. Nuttanart Muansuwan, Ph.D." },
  ],

  /** Syllabus, "Course Description" (verbatim). */
  description:
    "Introduction to practical concepts of engineering. Engineering principles, analysis, design, and experimentation are introduced with project-based learning approach. In addition, projects as student teams are assigned at the end involving laws of physics, mathematics, management, and communication. Hands-on experience is essential in all activities.",

  /** Syllabus, "Learning Outcomes" (verbatim). */
  learningOutcomes: [
    "Recognize roles and responsibilities of various engineering fields.",
    "Recognize the necessary problems of each engineering field.",
    "Apply basic scientific knowledge to address the issue raised.",
    "Work in a team as a leader or member.",
    "Communicate efficiently in speaking and writing.",
    "Understand and be aware of social and engineering professional issues.",
  ],

  /** Syllabus, "Grading Policy". Weights in percent. */
  grading: [
    { label: "The Final Project", weight: 30, parts: "Progress presentation 10 · Final report 10 · Project presentation 10" },
    { label: "The First Project", weight: 20, parts: "Design 10 · Execution 10" },
    { label: "Final Exam", weight: 20, parts: "" },
    { label: "The Viewbook", weight: 15, parts: "Every week 5 · Precise and effective 10", isViewbook: true },
    { label: "Lab work, assignments, quizzes, activities", weight: 10, parts: "" },
    { label: "Attendance, participation, reflection", weight: 5, parts: "" },
  ],

  /** Syllabus, "Viewbook Assignment": what this website must contain. */
  viewbookContents: [
    "A summary of the weekly topics learned in the course and labs, and the learning experience",
    "Our midterm project",
    "Our final project",
    "Our attitude towards the course",
  ],

  /** The semester's three parts, from the "Projects" column of the class schedule. */
  phases: [
    { id: "integrated", weeks: "Weeks 1–8", title: "An Integrated Project", note: "Topics that build up to the First Project competition." },
    { id: "midterm", weeks: "Week 9", title: "Midterm Exams", note: "The Three Challenges, and grouping for the second project." },
    { id: "class", weeks: "Weeks 10–16", title: "The Class Project", note: "New topics alongside the open final project." },
  ],
} as const;

export type PhaseId = (typeof course.phases)[number]["id"];
