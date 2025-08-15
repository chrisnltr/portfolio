<template>
  <div
    class="min-h-screen bg-background-primary overflow-y-auto"
    style="scroll-snap-type: y mandatory"
  >
    <div
      ref="cursorFollower"
      class="fixed pointer-events-none z-[9999] w-16 h-16 rounded-full blur-xl transition-all duration-500 ease-out"
      :class="
        isHoveringTarget ? 'bg-blue-500/40 w-24 h-24' : 'bg-blue-400/20 w-8 h-8'
      "
      :style="{
        left: mousePosition.x + 'px',
        top: mousePosition.y + 'px',
        transform: 'translate(-50%, -50%)',
        boxShadow: isHoveringTarget
          ? '0 0 60px 30px rgba(59, 130, 246, 0.6)'
          : '0 0 30px 15px rgba(96, 165, 250, 0.4)',
      }"
    ></div>

    <header
      class="fixed top-0 left-0 right-0 z-50 bg-background-primary/80 backdrop-blur-sm border-b border-border-primary"
    >
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <div class="text-2xl font-bold gradient-text">My Portfolio</div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="link">Home</a>
            <a href="#about" class="link">About</a>
            <a href="#experience" class="link">Experience</a>
            <a href="#projects" class="link">Projects</a>
            <a href="#contact" class="link">Contact</a>
          </div>
          <button class="md:hidden btn-ghost">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </nav>
      </div>
    </header>

    <main class="pt-20">
      <section
        id="home"
        class="min-h-screen flex items-center justify-center"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4 text-center -mt-20">
          <div class="animate-fade-in">
            <h1 class="text-5xl md:text-7xl font-bold mb-6">
              <span class="gradient-text">Hey, I'm</span>
              <br />
              <span
                class="text-text-primary hover:text-blue-400 transition-all duration-500 ease-out cursor-pointer"
                @mouseenter="animateName = true"
                @mouseleave="animateName = false"
              >
                <span
                  :class="[
                    animateName ? 'animate-bounce' : '',
                    animateName ? 'gradient-text' : '',
                  ]"
                >
                  Chris Leon Noltemeier
                </span>
              </span>
            </h1>
            <p
              class="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto"
            >
              I am passionate about learning new technologies and building
              efficient solutions
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                class="btn-primary text-lg px-8 py-3 group relative overflow-hidden"
                @click="scrollToProjects"
              >
                <span class="relative z-10">View My Work</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                ></div>
              </button>
              <button class="btn-secondary text-lg px-8 py-3">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        class="h-screen bg-background-secondary flex items-center"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-center mb-12 gradient-text">
              About Me
            </h2>
            <div class="max-w-3xl mx-auto">
              <div class="space-y-6">
                <p class="text-lg text-text-secondary leading-relaxed">
                  I'm a passionate full-stack developer with expertise in modern
                  web technologies and cloud infrastructure. I love creating
                  user-friendly applications that solve real-world problems.
                </p>
                <p class="text-lg text-text-secondary leading-relaxed">
                  With experience in Vue.js/Nuxt.js, Python (Django/FastAPI),
                  and cloud technologies, I bring ideas to life with clean,
                  maintainable code and robust infrastructure.
                </p>
                <p class="text-lg text-text-secondary leading-relaxed">
                  My technical skills include frontend development with Vue.js
                  and TypeScript, backend development with Python frameworks
                  like Django and FastAPI, database design with PostgreSQL, and
                  DevOps practices including Docker, AWS cloud services, and
                  Infrastructure as Code with Terraform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        class="h-screen flex items-center"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-center mb-12 gradient-text">
              Experience & Education
            </h2>
            <div class="space-y-8">
              <!-- Work Experience -->
              <div class="card-elevated p-8">
                <h3 class="text-2xl font-bold mb-6 text-text-primary">
                  Work Experience
                </h3>
                <div class="space-y-6">
                  <div class="border-l-4 border-accent-600 pl-6">
                    <div
                      class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                    >
                      <h4 class="text-xl font-semibold text-text-primary">
                        Software Developer
                      </h4>
                      <span class="text-sm text-accent-400 font-medium">
                        June 2025–Present
                      </span>
                    </div>
                    <p class="text-lg text-accent-400 font-medium mb-1">
                      Naue Group
                    </p>
                    <p class="text-text-secondary">Full-time</p>
                  </div>
                </div>
              </div>

              <!-- Education -->
              <div class="card-elevated p-8">
                <h3 class="text-2xl font-bold mb-6 text-text-primary">
                  Education
                </h3>
                <div class="space-y-6">
                  <div class="border-l-4 border-accent-600 pl-6">
                    <div
                      class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                    >
                      <h4 class="text-xl font-semibold text-text-primary">
                        IT Specialist Application Development
                      </h4>
                      <span class="text-sm text-accent-400 font-medium">
                        Aug. 2022–June 2025
                      </span>
                    </div>
                    <p class="text-lg text-accent-400 font-medium mb-1">
                      Berufskolleg Lübbecke
                    </p>
                    <p class="text-text-secondary">Apprenticeship</p>
                  </div>

                  <div class="border-l-4 border-accent-600 pl-6">
                    <div
                      class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                    >
                      <h4 class="text-xl font-semibold text-text-primary">
                        Technical College Certificate in Computer Science
                      </h4>
                      <span class="text-sm text-accent-400 font-medium">
                        Aug. 2020–July 2022
                      </span>
                    </div>
                    <p class="text-lg text-accent-400 font-medium mb-1">
                      Berufskolleg Lübbecke
                    </p>
                    <p class="text-text-secondary">High School Diploma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        class="h-screen flex items-center transition-all duration-800 ease-out"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4">
          <h2 class="text-4xl font-bold text-center mb-12 gradient-text">
            My Projects
          </h2>
          <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div
              class="card-elevated group hover:glow hover:scale-105 transition-all duration-300"
            >
              <div
                class="aspect-video bg-background-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden"
              >
                <!-- Placeholder for Flutter App Image -->
                <div
                  class="w-full h-full bg-background-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <div class="text-center">
                    <svg
                      class="w-12 h-12 text-accent-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p class="text-text-secondary text-xs">
                      Add your Flutter app image here
                    </p>
                  </div>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-3 text-text-primary">
                Accident App
              </h3>
              <p class="text-text-secondary mb-4 text-base">
                A mobile application built with Flutter for accident reporting
                and management, featuring intuitive UI design and real-time data
                synchronization.
              </p>
              <div class="flex gap-2">
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >Flutter</span
                >
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >Dart</span
                >
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >Mobile</span
                >
              </div>
            </div>

            <div
              class="card-elevated group hover:glow hover:scale-105 transition-all duration-300"
            >
              <div
                class="aspect-video bg-background-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden"
              >
                <!-- Placeholder for Unity Billiard Game Image -->
                <div
                  class="w-full h-full bg-background-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <div class="text-center">
                    <svg
                      class="w-12 h-12 text-accent-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p class="text-text-secondary text-xs">
                      Add your Unity game image here
                    </p>
                  </div>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-3 text-text-primary">
                Billiard Game
              </h3>
              <p class="text-text-secondary mb-4 text-base">
                A 3D billiard game developed in Unity with realistic physics,
                multiplayer support, and immersive gameplay mechanics.
              </p>
              <div class="flex gap-2">
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >Unity</span
                >
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >C#</span
                >
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >3D Game</span
                >
              </div>
            </div>

            <div
              class="card-elevated group hover:glow hover:scale-105 transition-all duration-300"
            >
              <div
                class="aspect-video bg-background-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden"
              >
                <!-- Placeholder for Hardware Management Image -->
                <div
                  class="w-full h-full bg-background-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <div class="text-center">
                    <svg
                      class="w-12 h-12 text-accent-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      ></path>
                    </svg>
                    <p class="text-text-secondary text-xs">
                      Add your hardware management image here
                    </p>
                  </div>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-3 text-text-primary">
                Hardware Management
              </h3>
              <p class="text-text-secondary mb-4 text-base">
                A comprehensive hardware management system built with FastAPI,
                featuring inventory tracking, device monitoring, and automated
                maintenance scheduling.
              </p>
              <div class="flex gap-2">
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >FastAPI</span
                >
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >Python</span
                >
                <span
                  class="px-2 py-1 bg-accent-600/20 text-accent-400 rounded text-xs"
                  >PostgreSQL</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        class="h-screen bg-background-secondary flex flex-col justify-center"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4 flex-1 flex items-center">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-4xl font-bold mb-12 gradient-text">Get In Touch</h2>
            <p class="text-lg text-text-secondary mb-8">
              I'm always interested in new opportunities and exciting projects.
              Let's work together to bring your ideas to life!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                class="btn-primary text-lg px-8 py-3 group relative overflow-hidden"
                @click="sendEmail"
              >
                <span class="relative z-10">Send Message</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                ></div>
              </button>
              <button class="btn-secondary text-lg px-8 py-3">
                View Resume
              </button>
            </div>
          </div>
        </div>

        <footer
          class="bg-background-primary border-t border-border-primary py-8"
        >
          <div class="container mx-auto px-4 text-center">
            <p class="text-text-secondary">
              © 2025 My Portfolio. Built with ❤️ using Nuxt.js and Tailwind CSS.
            </p>
          </div>
        </footer>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const mousePosition = ref({ x: 0, y: 0 });
const cursorFollower = ref(null);
const isHoveringTarget = ref(false);
const animateName = ref(false);

const updateMousePosition = (e) => {
  mousePosition.value = {
    x: e.clientX,
    y: e.clientY,
  };
};

const checkHover = (e) => {
  const target = e.target;
  const isTargetElement =
    target.closest("nav") ||
    target.closest("button") ||
    target.closest("span") ||
    target.closest("h2") ||
    target.closest("p");
  isHoveringTarget.value = isTargetElement;
};

const scrollToProjects = () => {
  const projectsSection = document.getElementById("projects");
  if (projectsSection) {
    // Smooth scroll mit easing animation
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Zusätzliche Animation für die Projects-Sektion
    setTimeout(() => {
      projectsSection.style.transform = "translateY(20px)";
      projectsSection.style.opacity = "0.8";

      setTimeout(() => {
        projectsSection.style.transition =
          "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        projectsSection.style.transform = "translateY(0)";
        projectsSection.style.opacity = "1";
      }, 100);
    }, 500);
  }
};

const sendEmail = () => {
  const email = "chris.noltemeier@gmail.com";
  const subject = "Portfolio Contact - New Project Inquiry";
  const body =
    "Hello Chris,\n\nI'm interested in discussing a potential project with you.\n\nBest regards,\n[Your Name]";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.open(mailtoLink, "_blank");
};

let isScrolling = false;
let currentSectionIndex = 0;
const sections = ["home", "about", "experience", "projects", "contact"];

const handleWheel = (e) => {
  e.preventDefault();

  if (isScrolling) return;

  const direction = e.deltaY > 0 ? 1 : -1;
  const newIndex = Math.max(
    0,
    Math.min(sections.length - 1, currentSectionIndex + direction)
  );

  if (newIndex !== currentSectionIndex) {
    isScrolling = true;
    currentSectionIndex = newIndex;

    const targetSection = document.getElementById(
      sections[currentSectionIndex]
    );
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1200);
  }
};

onMounted(() => {
  document.addEventListener("mousemove", updateMousePosition);
  document.addEventListener("mouseover", checkHover);
  document.addEventListener("wheel", handleWheel, { passive: false });
});

onUnmounted(() => {
  document.removeEventListener("mousemove", updateMousePosition);
  document.removeEventListener("mouseover", checkHover);
  document.removeEventListener("wheel", handleWheel);
});
</script>
