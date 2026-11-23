/**
 * WEEKLY COURSE FACTS — from the CPE102 2026 syllabus and each week's course materials.
 * Edit only to correct a fact. Your own writing and photos go in data/weeks.ts.
 */
import type { SyllabusWeek } from "@/types/journal";

export const syllabusWeeks: SyllabusWeek[] = [
  {
    week: 1,
    title: "What Engineers Do?",
    subtitle: "Class Introduction",
    date: "2026-08-06",
    endDate: "2026-08-07",
    instructor: "Asst. Prof. Jumpol Polvichai, Ph.D.",
    phase: "integrated",
    deliverable: "Viewbook initiation",
    milestone: "Grouping for the First Project",
    covered: [
      "What engineers do",
      "Elements of engineering design and analysis",
      "Course introduction and the Viewbook assignment",
      "Forming teams for the First Project"
    ]
  },
  {
    week: 2,
    title: "Working Foundation",
    subtitle: "Set Goals, Follow Up and Make Decision",
    date: "2026-08-13",
    endDate: "2026-08-14",
    instructor: "Asst. Prof. Nuttanart Muansuwan, Ph.D.",
    guest: "Tarntip Liuchalermvongs (guest lecturer)",
    phase: "integrated",
    deliverable: "Viewbook preparing",
    covered: [
      "Setting SMART goals",
      "A team project plan: goal, tasks, owner, timeline, risk and next step",
      "Consensus decision-making",
      "Following up: plan, execute, review, improve",
      "Adapting a plan when things change"
    ]
  },
  {
    week: 3,
    title: "Computer Aided Design",
    subtitle: "LibreCAD / TinkerCAD",
    date: "2026-08-20",
    endDate: "2026-08-21",
    instructor: "Prof. Chawisorn Samrit, Ph.D.",
    phase: "integrated",
    deliverable: "Assignment · Viewbook preparing",
    covered: [
      "Orthographic views: top, front and right side",
      "Third-angle projection (ISO method A)",
      "ISO line types for technical drawings",
      "National drawing standards compared",
      "3D modelling in Onshape"
    ],
    tools: [
      {
        label: "Onshape",
        href: "https://www.onshape.com"
      },
      {
        label: "LibreCAD",
        href: "https://librecad.org"
      },
      {
        label: "Tinkercad",
        href: "https://www.tinkercad.com"
      }
    ]
  },
  {
    week: 4,
    title: "Basic Embedded Systems",
    subtitle: "ESP32",
    date: "2026-08-27",
    endDate: "2026-08-28",
    instructor: "Prof. Chawisorn Samrit, Ph.D.",
    phase: "integrated",
    deliverable: "Assignment · Viewbook preparing",
    covered: [
      "Basic electronics",
      "Signals",
      "Integrating physics and mathematics",
      "Installing the class libraries in the Arduino IDE",
      "Exploring robot behaviour"
    ],
    tools: [
      {
        label: "ESP32"
      },
      {
        label: "Arduino IDE",
        href: "https://www.arduino.cc/en/software"
      },
      {
        label: "Class library repository",
        href: "https://github.com/zerotwobook/Embedded_System-_Expo_2026"
      }
    ]
  },
  {
    week: 5,
    title: "Intelligent Systems",
    subtitle: "Introduction to AI and Machine Learning",
    date: "2026-09-03",
    endDate: "2026-09-04",
    instructor: "Prof. Chawisorn Samrit, Ph.D.",
    phase: "integrated",
    deliverable: "Assignment · Viewbook preparing",
    covered: [
      "What artificial intelligence is",
      "Introduction to machine learning",
      "Popular tools",
      "Real-world applications",
      "Fundamentals of image processing"
    ]
  },
  {
    week: 6,
    title: "Natural Language Processing",
    subtitle: "Building Simple ChatBot",
    date: "2026-09-10",
    endDate: "2026-09-11",
    instructor: "Asst. Prof. Nuttanart Muansuwan, Ph.D.",
    phase: "integrated",
    deliverable: "Viewbook updating",
    covered: [
      "Natural language processing",
      "Building a simple chatbot"
    ]
  },
  {
    week: 7,
    title: "Programming Concept",
    subtitle: "Happy Coding",
    date: "2026-09-24",
    endDate: "2026-09-25",
    instructor: "Asst. Prof. Jumpol Polvichai, Ph.D.",
    phase: "integrated",
    deliverable: "Viewbook updating",
    covered: [
      "Writing C/C++ sketches for the POP-168 board",
      "Lab: connecting an LED, active-low and active-high",
      "Lab: music frequency output to a speaker",
      "Lab: reading a light sensor (LDR)",
      "Lab: showing values on an SLCD display"
    ],
    tools: [
      {
        label: "POP-168 board"
      },
      {
        label: "Arduino IDE",
        href: "https://www.arduino.cc/en/software"
      }
    ]
  },
  {
    week: 8,
    title: "The First Project Competition",
    subtitle: "Gemstone Color Sorting Robots at the CPE Rare Earth Mineral Yard",
    date: "2026-10-01",
    endDate: "2026-10-02",
    instructor: "Asst. Prof. Jumpol Polvichai, Ph.D.",
    phase: "integrated",
    deliverable: "An integrated project · Viewbook draft",
    project: "first-project",
    covered: [
      "Three 5-minute rounds: manual, autonomous, and the team's choice",
      "Autonomous runs score five times the base score",
      "A 10-minute presentation and Q&A in room CPE 1114"
    ]
  },
  {
    week: 9,
    title: "Midterm Exams",
    subtitle: "The Three Challenges",
    date: "2026-10-08",
    endDate: "2026-10-09",
    instructor: "Asst. Prof. Jumpol Polvichai, Ph.D.",
    phase: "midterm",
    deliverable: "Viewbook updating",
    milestone: "Grouping for the final project",
    covered: [
      "The Three Challenges",
      "Forming teams for the final project"
    ]
  },
  {
    week: 10,
    title: "Game",
    subtitle: "Build a Simple Game",
    date: "2026-10-29",
    endDate: "2026-10-30",
    instructor: "Asst. Prof. Jumpol Polvichai, Ph.D.",
    phase: "class",
    deliverable: "Viewbook updating",
    covered: [
      "Installing Unity Hub and the Unity editor",
      "Game Jam #40: build a game in pairs",
      "The game must remind players of CPE102 and support two players on one screen",
      "Submit a playable WebGL build on itch.io (deadline 12 November 2026)",
      "Judged on fun and gameplay, idea and creativity, and design"
    ],
    tools: [
      {
        label: "Unity",
        href: "https://unity.com"
      },
      {
        label: "CPE102 Game Jam #40 on itch.io",
        href: "https://itch.io/jam/cpe102-gamejam-40"
      }
    ]
  },
  {
    week: 11,
    title: "Network Security",
    subtitle: "Fundamental of Cyber Security/Threat",
    date: "2026-11-05",
    endDate: "2026-11-06",
    guest: "Rattasapa Meeprapai, Cyber Security Engineer, The Secretariat of the Cabinet",
    phase: "class",
    deliverable: "Viewbook updating",
    covered: [
      "Fundamentals of cyber security",
      "Cyber threats"
    ]
  },
  {
    week: 12,
    title: "Operating Systems",
    subtitle: "Windows, Linux, Virtual Machines",
    date: "2026-11-12",
    endDate: "2026-11-13",
    instructor: "Prof. Chawisorn Samrit, Ph.D.",
    phase: "class",
    deliverable: "Viewbook updating",
    covered: [
      "What an operating system does",
      "Host OS and guest OS",
      "Installing Ubuntu Server in a virtual machine",
      "Building a web server with Apache, PHP and MySQL",
      "Assignment: a web application on your own local server, with a report"
    ],
    tools: [
      {
        label: "VMware Workstation"
      },
      {
        label: "Ubuntu Server",
        href: "https://ubuntu.com/download/server"
      },
      {
        label: "Apache"
      },
      {
        label: "PHP"
      },
      {
        label: "MySQL"
      }
    ]
  },
  {
    week: 13,
    title: "Project Progress Presentations",
    date: "2026-11-19",
    endDate: "2026-11-20",
    instructor: "Asst. Prof. Nuttanart Muansuwan, Ph.D.",
    phase: "class",
    deliverable: "Viewbook updating",
    project: "final-project",
    covered: [
      "15 minutes per group: a 10-minute presentation and 5 minutes of questions",
      "Scored on a clear topic, interesting details, the work plan and the presentation (25% each)",
      "Slides cover the project and team, the problem and method, and the status and plan"
    ]
  },
  {
    week: 14,
    title: "Game Day",
    date: "2026-11-23",
    instructor: "All TAs",
    phase: "class",
    deliverable: "Viewbook updating"
  },
  {
    week: 15,
    title: "Final Exam",
    date: "2026-12-11",
    instructor: "All professors and TAs",
    phase: "class",
    deliverable: "Viewbook final submission"
  },
  {
    week: 16,
    title: "Final Project Presentations",
    subtitle: "Poster Presentations",
    date: "2026-12-14",
    instructor: "All professors and TAs",
    phase: "class",
    deliverable: "Poster presentation · Final project report",
    project: "final-project"
  }
];
