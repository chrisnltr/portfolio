<template>
  <div
    class="min-h-screen bg-background-primary overflow-y-auto"
    style="scroll-snap-type: y mandatory"
  >
    <!-- Particle Animation Background -->
    <div class="particles">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
    <div
      ref="cursorFollower"
      class="fixed pointer-events-none z-[9999] rounded-full blur-xl transition-all duration-300 ease-out"
      :class="
        isHoveringTarget ? 'bg-blue-500/40 w-20 h-20' : 'bg-blue-400/20 w-6 h-6'
      "
      :style="{
        left: mousePosition.x + 'px',
        top: mousePosition.y + 'px',
        transform: 'translate(-50%, -50%)',
        boxShadow: isHoveringTarget
          ? '0 0 40px 20px rgba(59, 130, 246, 0.5)'
          : '0 0 20px 10px rgba(96, 165, 250, 0.3)',
      }"
    ></div>

    <header class="fixed top-0 left-0 right-0 z-50 glass-header">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <div class="text-2xl font-bold gradient-text">My Portfolio</div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="link cursor-glow">Home</a>
            <a href="#about" class="link cursor-glow">About</a>
            <a href="#experience" class="link cursor-glow">Experience</a>
            <a href="#projects" class="link cursor-glow">Projects</a>
            <a href="#contact" class="link cursor-glow">Contact</a>
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
        class="min-h-screen flex items-center justify-center animated-bg"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4 text-center -mt-20">
          <div class="animate-fade-in">
            <h1
              class="hero-title gradient-text animate-slide-up"
              style="
                font-weight: 600;
                background-size: 200% 200%;
                animation: gradientShift 3s ease-in-out infinite;
              "
            >
              Hey, I'm
            </h1>
            <h1 class="hero-title" style="font-weight: 600">
              <span
                class="text-text-primary hover:gradient-text transition-all duration-500 ease-out cursor-pointer animate-slide-up"
                style="animation-delay: 0.2s"
                @mouseenter="animateName = true"
                @mouseleave="animateName = false"
              >
                <span :class="[animateName ? 'animate-bounce' : '']">
                  Chris Leon Noltemeier
                </span>
              </span>
            </h1>
            <h1
              class="hero-title gradient-text mt-2 animate-slide-up"
              style="
                animation-delay: 0.4s;
                font-weight: 600;
                background-size: 200% 200%;
                animation: gradientShift 3s ease-in-out infinite;
              "
            >
              Full-Stack Developer
            </h1>
            <br />
            <p
              class="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto animate-slide-up"
              style="animation-delay: 0.6s"
            >
              I am passionate about learning new technologies and building
              efficient solutions
            </p>
            <!--
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
              style="animation-delay: 0.8s"
            >
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
            </div>-->
          </div>
        </div>
      </section>

      <section
        id="about"
        class="h-screen modern-section flex items-center"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4 -mt-10">
          <div class="max-w-6xl mx-auto">
            <h2
              class="section-title font-bold text-center mb-12 gradient-text animate-slide-up"
            >
              About Me
            </h2>
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="space-y-6 animate-slide-left">
                <p class="text-lg text-text-secondary leading-relaxed">
                  I’m Chris Leon Noltemeier, a full-stack developer passionate
                  about creating efficient, user-friendly applications that
                  solve real-world problems. I enjoy turning ideas into working
                  products and bringing them all the way from concept to
                  deployment.
                </p>
                <p class="text-lg text-text-secondary leading-relaxed">
                  My experience covers modern frontend frameworks, scalable
                  backend systems, and cloud infrastructure. I focus on writing
                  clean, maintainable code and building reliable solutions that
                  can grow with future needs.
                </p>
                <p class="text-lg text-text-secondary leading-relaxed">
                  I’m always eager to learn new technologies, improve workflows
                  through automation, and take on challenges across the full
                  stack—from intuitive interfaces to optimized backend
                  performance and cloud environments.
                </p>
              </div>

              <div class="scene animate-slide-right">
                <div class="cube">
                  <div class="face front">
                    <div class="tech-content">
                      <h3>Frontend</h3>
                      <ul>
                        <li>Vue.js</li>
                        <li>Nuxt.js</li>
                        <li>TypeScript</li>
                        <li>JavaScript</li>
                        <li>HTML/CSS</li>
                        <li>Tailwind CSS</li>
                      </ul>
                    </div>
                  </div>
                  <div class="face back">
                    <div class="tech-content">
                      <h3>Backend</h3>
                      <ul>
                        <li>Python</li>
                        <li>FastAPI</li>
                        <li>REST APIs</li>
                      </ul>
                      <br />
                      <h3>Database</h3>
                      <ul>
                        <li>PostgreSQL</li>
                        <li>SQLite</li>
                      </ul>
                    </div>
                  </div>
                  <div class="face left">
                    <div class="tech-content"></div>
                  </div>
                  <div class="face right">
                    <div class="tech-content"></div>
                  </div>
                  <div class="face top">
                    <div class="tech-content"></div>
                  </div>
                  <div class="face bottom">
                    <div class="tech-content">
                      <h3>DevOps</h3>
                      <ul>
                        <li>Docker</li>
                        <li>AWS</li>
                        <li>Terraform</li>
                        <li>CI/CD</li>
                        <li>Git</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        class="h-screen modern-section flex items-center"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4 -mt-10">
          <div class="max-w-4xl mx-auto">
            <h2
              class="section-title font-bold text-center mb-12 gradient-text animate-slide-up"
            >
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
        class="h-screen modern-section flex items-center transition-all duration-800 ease-out"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4 -mt-32">
          <div
            class="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto h-[700px] items-start"
          >
            <div class="flex flex-col h-full justify-start">
              <h2
                class="section-title font-bold gradient-text animate-slide-up text-center mt-12 -mb-12"
              >
                My Projects
              </h2>

              <div class="space-y-3 pr-4 flex-1 flex flex-col justify-center">
                <div
                  v-for="(project, index) in projectData"
                  :key="index"
                  class="card-elevated group hover:glow hover:scale-105 transition-all duration-300 cursor-pointer"
                  :class="{
                    'ring-2 ring-accent-400 bg-accent-600/10':
                      selectedProject === index,
                  }"
                  @click="selectProject(index)"
                >
                  <div class="flex gap-4 p-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-24 h-16 bg-background-tertiary rounded-lg overflow-hidden image-hover"
                      >
                        <img
                          :src="project.image"
                          :alt="project.title + ' Screenshot'"
                          class="w-full h-full object-cover transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <h3
                        class="text-lg font-bold mb-2 text-text-primary truncate"
                      >
                        {{ project.title }}
                      </h3>
                      <p class="text-text-secondary mb-3 text-sm line-clamp-2">
                        {{ project.description }}
                      </p>
                      <div class="flex gap-1 flex-wrap">
                        <span
                          v-for="tech in project.technologies"
                          :key="tech"
                          class="tech-tag text-xs px-2 py-1"
                        >
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-background-secondary border border-border-primary rounded-xl p-6 h-full flex flex-col justify-center"
            >
              <div class="animate-fade-in flex flex-col justify-center h-full">
                <div
                  class="aspect-video bg-background-tertiary rounded-lg mb-4 overflow-hidden cursor-pointer relative flex-shrink-0"
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

                <h2
                  class="text-2xl font-bold text-text-primary mb-3 flex-shrink-0"
                >
                  {{ projectData[selectedProject]?.title }}
                </h2>

                <p
                  class="text-text-secondary mb-4 text-base flex-shrink-0 line-clamp-2"
                >
                  {{ projectData[selectedProject]?.description }}
                </p>

                <div class="grid grid-cols-2 gap-6 mb-4 flex-1 min-h-0">
                  <div class="flex-1 min-h-0">
                    <h3 class="text-lg font-semibold text-text-primary mb-2">
                      Features
                    </h3>
                    <ul class="text-text-secondary space-y-1 text-sm">
                      <li
                        v-for="feature in projectData[selectedProject]
                          ?.features"
                        :key="feature"
                        class="flex items-start"
                      >
                        <span class="text-accent-400 mr-2 mt-1">•</span>
                        <span>{{ feature }}</span>
                      </li>
                    </ul>
                  </div>

                  <div class="flex-1 min-h-0">
                    <h3 class="text-lg font-semibold text-text-primary mb-2">
                      Technical Details
                    </h3>
                    <ul class="text-text-secondary space-y-1 text-sm">
                      <li
                        v-for="detail in projectData[selectedProject]
                          ?.technicalDetails"
                        :key="detail"
                        class="flex items-start"
                      >
                        <span class="text-accent-400 mr-2 mt-1">•</span>
                        <span>{{ detail }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="mb-4 flex-shrink-0">
                  <h3 class="text-lg font-semibold text-text-primary mb-2">
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
          </div>
        </div>
      </section>

      <section
        id="contact"
        class="h-screen modern-section flex flex-col justify-center"
        style="scroll-snap-align: start"
      >
        <div class="container mx-auto px-4 flex-1 flex items-center -mt-10">
          <div class="max-w-2xl mx-auto text-center">
            <h2
              class="section-title font-bold mb-12 gradient-text animate-slide-up"
            >
              Get In Touch
            </h2>
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
const selectedProject = ref(0); // Default to first project
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
  // Smooth cursor following with requestAnimationFrame
  requestAnimationFrame(() => {
    mousePosition.value = {
      x: e.clientX,
      y: e.clientY,
    };
  });
};

const checkHover = (e) => {
  const target = e.target;
  const isTargetElement =
    target.closest("nav") ||
    target.closest("button") ||
    target.closest("a") ||
    target.closest("span") ||
    target.closest("h1") ||
    target.closest("h2") ||
    target.closest("h3") ||
    target.closest("p") ||
    target.closest(".card-elevated");

  // Smooth transition for hover state
  if (isHoveringTarget.value !== isTargetElement) {
    isHoveringTarget.value = isTargetElement;
  }
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

const scrollToSection = (index) => {
  if (index >= 0 && index < sections.length) {
    currentSectionIndex = index;
    const targetSection = document.getElementById(sections[index]);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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

const selectProject = (index) => {
  selectedProject.value = index;
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

<style scoped>
.scene {
  width: 400px;
  height: 400px;
  perspective: 1000px;
  margin: 30px auto;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(59, 130, 246, 0.05);
  border: 2px solid rgba(59, 130, 246, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  padding: 20px;
  box-sizing: border-box;
}

.tech-content {
  text-align: center;
  color: rgba(59, 130, 246, 0.9);
  width: 100%;
}

.tech-content h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: rgba(59, 130, 246, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tech-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-content li {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  opacity: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out;
}

.cube:hover {
  transform: rotateY(180deg) rotateX(-45deg) scaleZ(1.2) scaleX(1.2) scaleY(1.2);
}

.front {
  transform: rotateY(0deg) translateZ(200px);
}

.back {
  transform: rotateY(180deg) translateZ(200px);
}

.left {
  transform: rotateY(-90deg) translateZ(200px);
}

.right {
  transform: rotateY(90deg) translateZ(200px);
}

.top {
  transform: rotateX(90deg) translateZ(200px);
}

.bottom {
  transform: rotateX(-90deg) translateZ(200px) rotateZ(180deg);
}
</style>
