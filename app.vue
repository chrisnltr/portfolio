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
              class="card-elevated group hover:glow hover:scale-105 transition-all duration-300 cursor-pointer"
              @click="toggleProject(0)"
            >
              <div
                class="aspect-video bg-background-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/images/UnfallApp.png"
                  alt="Accident App Screenshot"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
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
              class="card-elevated group hover:glow hover:scale-105 transition-all duration-300 cursor-pointer"
              @click="toggleProject(1)"
            >
              <div
                class="aspect-video bg-background-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/images/BilliardGame.png"
                  alt="Billiard Game Screenshot"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
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
              class="card-elevated group hover:glow hover:scale-105 transition-all duration-300 cursor-pointer"
              @click="toggleProject(2)"
            >
              <div
                class="aspect-video bg-background-tertiary rounded-lg mb-3 flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/images/HardwareManager.png"
                  alt="Hardware Management Screenshot"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
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

    <div
      v-if="selectedProject !== null"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div
        class="relative bg-background-secondary border border-border-primary rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
        @click.stop
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div
          class="aspect-video bg-background-tertiary rounded-lg mb-6 overflow-hidden cursor-pointer relative"
          @click="openImageModal"
          @mouseenter="showZoomIcon = true"
          @mouseleave="showZoomIcon = false"
        >
          <img
            :src="projectData[selectedProject]?.image"
            :alt="projectData[selectedProject]?.title + ' Screenshot'"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div
            v-if="showZoomIcon"
            class="absolute inset-0 bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none"
          >
            <svg
              class="w-8 h-8 text-white transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              ></path>
            </svg>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-text-primary mb-4">
          {{ projectData[selectedProject]?.title }}
        </h2>

        <p class="text-text-secondary mb-6 text-lg">
          {{ projectData[selectedProject]?.description }}
        </p>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 class="text-xl font-semibold text-text-primary mb-3">
              Features
            </h3>
            <ul class="text-text-secondary space-y-2">
              <li
                v-for="feature in projectData[selectedProject]?.features"
                :key="feature"
                class="flex items-start"
              >
                <span class="text-accent-400 mr-2 mt-1">•</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-text-primary mb-3">
              Technical Details
            </h3>
            <ul class="text-text-secondary space-y-2">
              <li
                v-for="detail in projectData[selectedProject]?.technicalDetails"
                :key="detail"
                class="flex items-start"
              >
                <span class="text-accent-400 mr-2 mt-1">•</span>
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold text-text-primary mb-3">
            Technologies
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in projectData[selectedProject]?.technologies"
              :key="tech"
              class="px-3 py-1 bg-accent-600/20 text-accent-400 rounded-full text-sm"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="imageModalOpen"
      class="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      @click="closeImageModal"
    >
      <div class="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

      <div
        class="relative max-w-[95vw] max-h-[95vh] animate-fade-in"
        @click.stop
      >
        <!-- Close Button -->
        <button
          @click="closeImageModal"
          class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <!-- Image -->
        <img
          :src="projectData[selectedProject]?.image"
          :alt="projectData[selectedProject]?.title + ' Screenshot'"
          class="w-full h-full object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const mousePosition = ref({ x: 0, y: 0 });
const cursorFollower = ref(null);
const isHoveringTarget = ref(false);
const animateName = ref(false);
const selectedProject = ref(null);
const imageModalOpen = ref(false);
const showZoomIcon = ref(false);

const projectData = ref([
  {
    title: "Accident App",
    description:
      "A mobile application built with Flutter for accident reporting and management, featuring intuitive UI design and real-time data synchronization.",
    image: "/images/UnfallApp.png",
    features: [
      "Real-time accident reporting",
      "GPS location tracking",
      "Photo documentation",
      "Offline data synchronization",
      "Multi-language support",
    ],
    technicalDetails: [
      "State management with Provider",
      "SQLite local database",
      "REST API integration",
      "Push notifications",
    ],
    technologies: ["Flutter", "Dart", "Mobile"],
    demoButton: "View Demo",
  },
  {
    title: "Billiard Game",
    description:
      "A 3D billiard game developed in Unity with realistic physics, multiplayer support, and immersive gameplay mechanics.",
    image: "/images/BilliardGame.png",
    features: [
      "Realistic 3D physics simulation",
      "Multiplayer support (local & online)",
      "Multiple game modes",
      "Customizable table designs",
      "Tournament system",
    ],
    technicalDetails: [
      "Unity 3D engine",
      "C# scripting",
      "Photon networking",
      "Advanced physics calculations",
    ],
    technologies: ["Unity", "C#", "3D Game"],
    demoButton: "Play Demo",
  },
  {
    title: "Hardware Management",
    description:
      "A comprehensive hardware management system built with FastAPI, featuring inventory tracking, device monitoring, and automated maintenance scheduling.",
    image: "/images/HardwareManager.png",
    features: [
      "Real-time inventory tracking",
      "Device health monitoring",
      "Automated maintenance scheduling",
      "User role management",
      "Reporting and analytics",
    ],
    technicalDetails: [
      "FastAPI REST API",
      "PostgreSQL database",
      "SQLAlchemy ORM",
      "Docker containerization",
    ],
    technologies: ["FastAPI", "Python", "PostgreSQL"],
    demoButton: "Live Demo",
  },
]);

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
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

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

const toggleProject = (index) => {
  selectedProject.value = index;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedProject.value = null;
  document.body.style.overflow = "auto";
};

const openImageModal = () => {
  imageModalOpen.value = true;
};

const closeImageModal = () => {
  imageModalOpen.value = false;
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
