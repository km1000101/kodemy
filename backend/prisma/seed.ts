import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/client";
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    // prisma init set DATABASE_URL to something like `file:./dev.db`
    url: process.env.DATABASE_URL as string,
  }),
});

async function main() {
  const demoEmail = process.env.DEMO_EMAIL ?? "demo@kodemy.local";
  const demoPassword = process.env.DEMO_PASSWORD ?? "demo12345";
  const demoName = process.env.DEMO_NAME ?? "Demo Learner";

  const passwordHash = await bcrypt.hash(demoPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: demoEmail },
    update: { passwordHash, name: demoName },
    create: {
      email: demoEmail,
      passwordHash,
      name: demoName,
    },
  });

  async function ensureVideos(
    items: Array<{
      section: { id: number };
      orderIndex: number;
      title: string;
      description: string;
      youtubeVideoId: string;
      durationSeconds: number;
    }>
  ) {
    for (const v of items) {
      await prisma.video.upsert({
        where: { sectionId_orderIndex: { sectionId: v.section.id, orderIndex: v.orderIndex } },
        update: {
          title: v.title,
          description: v.description,
          youtubeVideoId: v.youtubeVideoId,
          durationSeconds: v.durationSeconds,
        },
        create: {
          sectionId: v.section.id,
          orderIndex: v.orderIndex,
          title: v.title,
          description: v.description,
          youtubeVideoId: v.youtubeVideoId,
          durationSeconds: v.durationSeconds,
        },
      });
    }
  }

  // Subject 1: Getting Started
  const subject1 = await prisma.subject.upsert({
    where: { slug: "getting-started" },
    update: {
      title: "Getting Started",
      description: "A small demo curriculum to test Kodemy LMS flows. Learn the basics of the platform.",
      isPublished: true,
    },
    create: {
      title: "Getting Started",
      slug: "getting-started",
      description: "A small demo curriculum to test Kodemy LMS flows. Learn the basics of the platform.",
      isPublished: true,
    },
  });

  const s1A = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject1.id, orderIndex: 0 } },
    update: { title: "Introduction", orderIndex: 0, subjectId: subject1.id },
    create: { title: "Introduction", orderIndex: 0, subjectId: subject1.id },
  });
  const s1B = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject1.id, orderIndex: 1 } },
    update: { title: "Next Steps", orderIndex: 1, subjectId: subject1.id },
    create: { title: "Next Steps", orderIndex: 1, subjectId: subject1.id },
  });

  await ensureVideos([
    { section: s1A, orderIndex: 0, title: "Welcome", description: "Intro video (unlocked by default).", youtubeVideoId: "ysz5S6PUM-U", durationSeconds: 60 },
    { section: s1A, orderIndex: 1, title: "Basics", description: "Unlocked after completing the previous video.", youtubeVideoId: "dQw4w9WgXcQ", durationSeconds: 120 },
    { section: s1B, orderIndex: 0, title: "Next Steps", description: "Unlocked after completing the previous video.", youtubeVideoId: "kJQP7kiw5Fk", durationSeconds: 180 },
    { section: s1B, orderIndex: 1, title: "Wrap Up", description: "Final demo video.", youtubeVideoId: "3GwjfUFyY6M", durationSeconds: 150 },
  ]);

  // Subject 2: Web Development
  const subject2 = await prisma.subject.upsert({
    where: { slug: "web-development" },
    update: {
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript to build modern websites. From structure to interactivity.",
      isPublished: true,
    },
    create: {
      title: "Web Development Fundamentals",
      slug: "web-development",
      description: "Learn HTML, CSS, and JavaScript to build modern websites. From structure to interactivity.",
      isPublished: true,
    },
  });

  const s2A = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject2.id, orderIndex: 0 } },
    update: { title: "HTML Basics", orderIndex: 0, subjectId: subject2.id },
    create: { title: "HTML Basics", orderIndex: 0, subjectId: subject2.id },
  });
  const s2B = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject2.id, orderIndex: 1 } },
    update: { title: "CSS Styling", orderIndex: 1, subjectId: subject2.id },
    create: { title: "CSS Styling", orderIndex: 1, subjectId: subject2.id },
  });
  const s2C = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject2.id, orderIndex: 2 } },
    update: { title: "Putting It Together", orderIndex: 2, subjectId: subject2.id },
    create: { title: "Putting It Together", orderIndex: 2, subjectId: subject2.id },
  });

  await ensureVideos([
    { section: s2A, orderIndex: 0, title: "What is HTML?", description: "Understanding the structure of web pages.", youtubeVideoId: "pQN-pnXPaVg", durationSeconds: 300 },
    { section: s2A, orderIndex: 1, title: "Tags and Elements", description: "Core HTML elements every developer needs.", youtubeVideoId: "Dxcc6YCZxAY", durationSeconds: 420 },
    { section: s2A, orderIndex: 2, title: "Forms and Inputs", description: "Building user input with HTML forms.", youtubeVideoId: "rsd4FNGTBNc", durationSeconds: 360 },
    { section: s2B, orderIndex: 0, title: "Intro to CSS", description: "Making your pages beautiful with styles.", youtubeVideoId: "1Rs2ND1ryYc", durationSeconds: 480 },
    { section: s2B, orderIndex: 1, title: "Layout with Flexbox", description: "Modern layout techniques with Flexbox.", youtubeVideoId: "JJSoEo8JSnc", durationSeconds: 540 },
    { section: s2C, orderIndex: 0, title: "Your First Website", description: "Combine HTML and CSS in a complete project.", youtubeVideoId: "PlxWf493en4", durationSeconds: 600 },
  ]);

  // Subject 3: JavaScript Fundamentals
  const subject3 = await prisma.subject.upsert({
    where: { slug: "javascript-fundamentals" },
    update: {
      title: "JavaScript Fundamentals",
      description: "Master the language of the web. Variables, functions, async, and more.",
      isPublished: true,
    },
    create: {
      title: "JavaScript Fundamentals",
      slug: "javascript-fundamentals",
      description: "Master the language of the web. Variables, functions, async, and more.",
      isPublished: true,
    },
  });

  const s3A = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject3.id, orderIndex: 0 } },
    update: { title: "Getting Started with JS", orderIndex: 0, subjectId: subject3.id },
    create: { title: "Getting Started with JS", orderIndex: 0, subjectId: subject3.id },
  });
  const s3B = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject3.id, orderIndex: 1 } },
    update: { title: "Functions and Scope", orderIndex: 1, subjectId: subject3.id },
    create: { title: "Functions and Scope", orderIndex: 1, subjectId: subject3.id },
  });
  const s3C = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject3.id, orderIndex: 2 } },
    update: { title: "Async and APIs", orderIndex: 2, subjectId: subject3.id },
    create: { title: "Async and APIs", orderIndex: 2, subjectId: subject3.id },
  });

  await ensureVideos([
    { section: s3A, orderIndex: 0, title: "Variables and Types", description: "let, const, and data types in JavaScript.", youtubeVideoId: "W6NZfCO5SIk", durationSeconds: 600 },
    { section: s3A, orderIndex: 1, title: "Arrays and Objects", description: "Working with collections and key-value pairs.", youtubeVideoId: "oigfaZ5ApsM", durationSeconds: 720 },
    { section: s3A, orderIndex: 2, title: "Conditionals and Loops", description: "Control flow in your programs.", youtubeVideoId: "SydnKbGc7W8", durationSeconds: 540 },
    { section: s3B, orderIndex: 0, title: "Functions", description: "Declaring and calling functions.", youtubeVideoId: "N8ap4k_1QEQ", durationSeconds: 660 },
    { section: s3B, orderIndex: 1, title: "Closures", description: "Understanding scope and closures.", youtubeVideoId: "3a0I8ICR1Vg", durationSeconds: 480 },
    { section: s3C, orderIndex: 0, title: "Promises", description: "Asynchronous programming with Promises.", youtubeVideoId: "DHvZLI7Db8E", durationSeconds: 720 },
    { section: s3C, orderIndex: 1, title: "async/await", description: "Clean async code with async/await.", youtubeVideoId: "V_Kr9OSfDeU", durationSeconds: 600 },
  ]);

  // Subject 4: React Basics
  const subject4 = await prisma.subject.upsert({
    where: { slug: "react-basics" },
    update: {
      title: "React Basics",
      description: "Build dynamic user interfaces with React. Components, hooks, and state management.",
      isPublished: true,
    },
    create: {
      title: "React Basics",
      slug: "react-basics",
      description: "Build dynamic user interfaces with React. Components, hooks, and state management.",
      isPublished: true,
    },
  });

  const s4A = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject4.id, orderIndex: 0 } },
    update: { title: "React Introduction", orderIndex: 0, subjectId: subject4.id },
    create: { title: "React Introduction", orderIndex: 0, subjectId: subject4.id },
  });
  const s4B = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject4.id, orderIndex: 1 } },
    update: { title: "Components and Props", orderIndex: 1, subjectId: subject4.id },
    create: { title: "Components and Props", orderIndex: 1, subjectId: subject4.id },
  });
  const s4C = await prisma.section.upsert({
    where: { subjectId_orderIndex: { subjectId: subject4.id, orderIndex: 2 } },
    update: { title: "Hooks", orderIndex: 2, subjectId: subject4.id },
    create: { title: "Hooks", orderIndex: 2, subjectId: subject4.id },
  });

  await ensureVideos([
    { section: s4A, orderIndex: 0, title: "What is React?", description: "Introduction to the React library.", youtubeVideoId: "SqcY0GlETpg", durationSeconds: 600 },
    { section: s4A, orderIndex: 1, title: "Create React App", description: "Setting up your first React project.", youtubeVideoId: "6s0OVdoo4Q4", durationSeconds: 420 },
    { section: s4B, orderIndex: 0, title: "Components", description: "Building reusable UI with components.", youtubeVideoId: "DLX62G4lc44", durationSeconds: 720 },
    { section: s4B, orderIndex: 1, title: "Props", description: "Passing data between components.", youtubeVideoId: "IYvD9oBCuJI", durationSeconds: 540 },
    { section: s4C, orderIndex: 0, title: "useState", description: "Managing state with the useState hook.", youtubeVideoId: "O6P86uwfdR0", durationSeconds: 660 },
    { section: s4C, orderIndex: 1, title: "useEffect", description: "Side effects and lifecycle with useEffect.", youtubeVideoId: "0ZJgIjI8Ymc", durationSeconds: 600 },
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log("Seed completed");
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

