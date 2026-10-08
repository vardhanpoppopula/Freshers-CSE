import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface StudentRecord {
  id: string;
  rollNumber: string;
  department: "CSE" | "CST" | "IT";
  batch: string;
  active: boolean;
  createdAt: string;
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  content: string;
  category: "GENERAL" | "SCHEDULE" | "VENUE" | "ACTIVITIES" | "IMPORTANT";
  priority: "NORMAL" | "HIGH" | "URGENT";
  published: boolean;
  date: string;
  createdAt: string;
}

export interface NoticeRecord {
  id: string;
  title: string;
  content: string;
  priority: "MANDATORY" | "INFO" | "CRITICAL";
  published: boolean;
  createdAt: string;
}

export interface ScheduleRecord {
  id: string;
  time: string;
  title: string;
  description: string;
  category: "CEREMONY" | "INTERACTION" | "CULTURAL" | "CELEBRATION";
  order: number;
  published: boolean;
}

export interface EventSettingsRecord {
  eventName: string;
  eventTitle: string;
  tagline: string;
  collegeName: string;
  collegeType: string;
  location: string;
  departments: string;
  dateDisplay: string;
  isoDate: string;
  timeDisplay: string;
  venue: string;
  videoUrl: string;
  announcementTicker: string;
  heroHeadline: string;
  contactEmail: string;
  contactPhone: string;
}

export interface InvitationLogRecord {
  id: string;
  rollNumber: string;
  studentName: string;
  generatedAt: string;
  ipHash: string;
}

export interface InvitationPassRecord {
  token: string;
  rollNumber: string;
  studentName: string;
  department: string;
  createdAt: string;
}

export interface DatabaseSchema {
  students: StudentRecord[];
  announcements: AnnouncementRecord[];
  notices: NoticeRecord[];
  schedule: ScheduleRecord[];
  settings: EventSettingsRecord;
  logs: InvitationLogRecord[];
  passes?: InvitationPassRecord[];
  adminPasswordHash: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Generate realistic Sri Vasavi Engineering College (SVEC) roll numbers
// SVEC JNTUK code is 91/A91. Typical format: 23A91A05xx (CSE), 23A91A06xx (CST), 23A91A12xx (IT)
function generateInitialStudents(): StudentRecord[] {
  const students: StudentRecord[] = [];
  const now = new Date().toISOString();

  // CSE Roll numbers: 23A91A0501 to 23A91A0560
  for (let i = 1; i <= 60; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    students.push({
      id: `s-cse-${num}`,
      rollNumber: `23A91A05${num}`,
      department: "CSE",
      batch: "2023-2027",
      active: true,
      createdAt: now,
    });
  }

  // CST Roll numbers: 23A91A0601 to 23A91A0630
  for (let i = 1; i <= 30; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    students.push({
      id: `s-cst-${num}`,
      rollNumber: `23A91A06${num}`,
      department: "CST",
      batch: "2023-2027",
      active: true,
      createdAt: now,
    });
  }

  // IT Roll numbers: 23A91A1201 to 23A91A1230
  for (let i = 1; i <= 30; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    students.push({
      id: `s-it-${num}`,
      rollNumber: `23A91A12${num}`,
      department: "IT",
      batch: "2023-2027",
      active: true,
      createdAt: now,
    });
  }

  // Add specific examples mentioned in prompt for quick testing:
  const demoRolls = ["23A91A0001", "23A91A0002", "23A91A0003", "24A91A0501", "24A91A0502"];
  demoRolls.forEach((roll, idx) => {
    students.push({
      id: `s-demo-${idx + 1}`,
      rollNumber: roll,
      department: "CSE",
      batch: "2023-2027",
      active: true,
      createdAt: now,
    });
  });

  return students;
}

function getInitialData(): DatabaseSchema {
  const now = new Date().toISOString();
  // Hash for default password: 'admin@nexora2026'
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync("admin@nexora2026", salt);

  return {
    students: generateInitialStudents(),
    announcements: [
      {
        id: "ann-1",
        title: "Official Invitation Card Portal Activated",
        content:
          "Eligible 1st-year students of CSE, CST, and IT departments can now generate their personalized NEXORA VIP invitations using their authorized college Roll Number.",
        category: "IMPORTANT",
        priority: "HIGH",
        published: true,
        date: "October 07, 2026",
        createdAt: now,
      },
      {
        id: "ann-2",
        title: "Flash Mob & Pre-Fest Energy Unleashed",
        content:
          "Catch the student organizing crew at the Central Amphitheatre tomorrow at 1:15 PM for an electrifying sneak peek of NEXORA 2K26!",
        category: "ACTIVITIES",
        priority: "NORMAL",
        published: true,
        date: "October 09, 2026",
        createdAt: now,
      },
      {
        id: "ann-3",
        title: "Special Transport & Shuttle Schedule for Hostellers",
        content:
          "Dedicated campus shuttles will be operating between College Main Gate, Hostel Blocks, and YNS Auditorium from 8:30 AM onwards.",
        category: "VENUE",
        priority: "NORMAL",
        published: true,
        date: "October 11, 2026",
        createdAt: now,
      },
    ],
    notices: [
      {
        id: "not-1",
        title: "Mandatory College ID Card Requirement",
        content:
          "All students must carry their physical or digital Sri Vasavi Engineering College ID card alongside their printed/digital NEXORA invitation card for auditorium entry.",
        priority: "MANDATORY",
        published: true,
        createdAt: now,
      },
      {
        id: "not-2",
        title: "Auditorium Entry Gates & Reporting Timeline",
        content:
          "Entry doors at YNS Auditorium open promptly at 9:00 AM. Students are strictly advised to take their seats by 9:20 AM to avoid inaugural commotion.",
        priority: "MANDATORY",
        published: true,
        createdAt: now,
      },
      {
        id: "not-3",
        title: "Authorized Department Verification",
        content:
          "NEXORA 2K26 is exclusively organized for CSE, CST, and IT department freshers and faculty. Non-departmental entries require prior organizing committee clearance.",
        priority: "CRITICAL",
        published: true,
        createdAt: now,
      },
      {
        id: "not-4",
        title: "Digital Code of Conduct & Photography Policy",
        content:
          "Tag @nexora2k26 and use #NexoraFreshers on your social stories! Please respect the performers during the inaugural lamp lighting and formal addresses.",
        priority: "INFO",
        published: true,
        createdAt: now,
      },
    ],
    schedule: [
      {
        id: "sch-1",
        time: "09:30 AM",
        title: "Grand Arrival & Red Carpet Entry",
        description:
          "Welcome of freshers with cyber wristbands, photo-booth moments, and batch mingling at the YNS Promenade.",
        category: "CEREMONY",
        order: 1,
        published: true,
      },
      {
        id: "sch-2",
        time: "09:50 AM",
        title: "Traditional Lamp Lighting & Inauguration",
        description:
          "Dignitary welcome by HODs of CSE, CST, and IT, followed by the auspicious inaugural address.",
        category: "CEREMONY",
        order: 2,
        published: true,
      },
      {
        id: "sch-3",
        time: "10:20 AM",
        title: "Ice-Breakers & Freshman Spotlight",
        description:
          "Interactive stage spotlight, fun trivia, crowd polls, and introduction of our brightest new minds.",
        category: "INTERACTION",
        order: 3,
        published: true,
      },
      {
        id: "sch-4",
        time: "11:15 AM",
        title: "Electrifying Cultural Extravaganza",
        description:
          "High-octane fusion dance battles, live musical acoustics, dramatic skits, and student band performances.",
        category: "CULTURAL",
        order: 4,
        published: true,
      },
      {
        id: "sch-5",
        time: "02:00 PM",
        title: "Mr. & Ms. Fresher 2K26 Grand Finale",
        description:
          "Rounds of wit, talent, and runway charisma crowned by our distinguished faculty panel.",
        category: "CULTURAL",
        order: 5,
        published: true,
      },
      {
        id: "sch-6",
        time: "03:30 PM",
        title: "Cyber DJ Celebration & Festival Climax",
        description:
          "Immersive light spectacle, festival music drops, and celebration of the new family journey.",
        category: "CELEBRATION",
        order: 6,
        published: true,
      },
    ],
    settings: {
      eventName: "Freshers Party 2K26",
      eventTitle: "NEXORA",
      tagline: "NEW FACES ✦ NEW VIBE ✦ ONE FAMILY",
      collegeName: "Sri Vasavi Engineering College",
      collegeType: "Autonomous",
      location: "Tadepalligudem, Andhra Pradesh",
      departments: "CSE | CST | IT",
      dateDisplay: "13th October 2026",
      isoDate: "2026-10-13T09:30:00+05:30",
      timeDisplay: "9:30 AM Onwards",
      venue: "YNS Auditorium",
      videoUrl: "", // Keep empty as requested: placeholder component
      announcementTicker:
        "⚡ NEXORA 2K26 LIVE • 13 OCT 2026 @ 9:30 AM • YNS AUDITORIUM • CSE, CST, IT FRESHERS WELCOME ⚡",
      heroHeadline: "WHERE INNOVATION MEETS CELEBRATION",
      contactEmail: "freshers2k26@srivasaviengg.ac.in",
      contactPhone: "+91 8818 284355",
    },
    logs: [
      {
        id: "log-seed-1",
        rollNumber: "23A91A0501",
        studentName: "Ananya Sharma",
        generatedAt: now,
        ipHash: "127.0.0.1",
      },
    ],
    adminPasswordHash,
  };
}

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error("Error reading database file, returning default data:", error);
    return getInitialData();
  }
}

export function writeDb(data: DatabaseSchema): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (error) {
    console.error("Error writing to database:", error);
    return false;
  }
}

// Student roll number authorization check
export function checkRollNumberAuthorization(rawRollNumber: string): {
  authorized: boolean;
  student?: StudentRecord;
} {
  if (!rawRollNumber) return { authorized: false };
  const normalized = rawRollNumber.trim().toUpperCase();

  const db = readDb();
  const student = db.students.find(
    (s) => s.rollNumber.toUpperCase() === normalized && s.active
  );

  if (student) {
    return { authorized: true, student };
  }
  return { authorized: false };
}

// Log invitation generation
export function logInvitation(
  rollNumber: string,
  studentName: string,
  ipHash: string = "anon"
): void {
  try {
    const db = readDb();
    const normalized = rollNumber.trim().toUpperCase();
    db.logs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      rollNumber: normalized,
      studentName: studentName.trim(),
      generatedAt: new Date().toISOString(),
      ipHash,
    });
    // Keep max 500 logs
    if (db.logs.length > 500) {
      db.logs = db.logs.slice(0, 500);
    }
    writeDb(db);
  } catch (err) {
    console.error("Failed to log invitation generation:", err);
  }
}

export function saveInvitationPass(pass: InvitationPassRecord): void {
  try {
    const db = readDb();
    if (!db.passes) db.passes = [];
    const existing = db.passes.findIndex(
      (p) => p.rollNumber.toUpperCase() === pass.rollNumber.toUpperCase()
    );
    if (existing >= 0) {
      db.passes[existing] = pass;
    } else {
      db.passes.push(pass);
    }
    writeDb(db);
  } catch (err) {
    console.error("Failed to save invitation pass:", err);
  }
}

export function getInvitationPassByToken(token: string): InvitationPassRecord | null {
  try {
    const db = readDb();
    if (!db.passes) return null;
    return db.passes.find((p) => p.token === token) || null;
  } catch {
    return null;
  }
}

export function getInvitationPassByRoll(rollNumber: string): InvitationPassRecord | null {
  try {
    const db = readDb();
    if (!db.passes) return null;
    const clean = rollNumber.trim().toUpperCase();
    return db.passes.find((p) => p.rollNumber.toUpperCase() === clean) || null;
  } catch {
    return null;
  }
}

