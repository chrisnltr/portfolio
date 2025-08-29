<template>
  <div
    class="min-h-screen bg-background-primary"
    :class="{ 'overflow-hidden': !isMobile }"
    :style="!isMobile ? 'scroll-snap-type: y mandatory' : ''"
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
      v-if="!isMobile"
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
      <div class="container mx-auto px-6 py-4">
        <nav class="flex items-center justify-between">
          <div class="text-2xl md:text-3xl font-bold gradient-text">
            My Portfolio
          </div>
          <div class="hidden md:flex items-center space-x-10">
            <a href="#home" class="link cursor-glow text-lg font-medium">Home</a>
            <a href="#about" class="link cursor-glow text-lg font-medium">About</a>
            <a href="#experience" class="link cursor-glow text-lg font-medium">Experience</a>
            <a href="#projects" class="link cursor-glow text-lg font-medium">Projects</a>
            <a href="#contact" class="link cursor-glow text-lg font-medium">Contact</a>
          </div>
          <button class="md:hidden btn-ghost" @click="toggleMobileMenu">
            <svg
              class="w-7 h-7"
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

        <!-- Mobile Menu -->
        <div
          v-if="mobileMenuOpen"
          class="md:hidden mt-6 pb-6 border-t border-border-primary"
        >
          <div class="flex flex-col space-y-6 pt-6">
            <a
              href="#home"
              class="link cursor-glow text-xl font-medium"
              @click="closeMobileMenu"
              >Home</a
            >
            <a
              href="#about"
              class="link cursor-glow text-xl font-medium"
              @click="closeMobileMenu"
              >About</a
            >
            <a
              href="#experience"
              class="link cursor-glow text-xl font-medium"
              @click="closeMobileMenu"
              >Experience</a
            >
            <a
              href="#projects"
              class="link cursor-glow text-xl font-medium"
              @click="closeMobileMenu"
              >Projects</a
            >
            <a
              href="#contact"
              class="link cursor-glow text-xl font-medium"
              @click="closeMobileMenu"
              >Contact</a
            >
          </div>
        </div>
      </div>
    </header>

    <main class="pt-24 min-h-full">
                   <section
        id="home"
        class="min-h-screen flex items-center justify-center animated-bg px-4"
        :style="!isMobile ? 'scroll-snap-align: start' : ''"
      >
         <div class="container mx-auto text-center">
          <div class="animate-fade-in">
            <h1
              class="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text animate-slide-up"
              style="
                font-weight: 600;
                background-size: 200% 200%;
                animation: gradientShift 3s ease-in-out infinite;
              "
            >
              Hey, I'm
            </h1>
            <h1
              class="text-4xl md:text-6xl lg:text-7xl font-bold"
              style="font-weight: 600"
            >
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
              class="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mt-2 animate-slide-up"
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
              class="text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto animate-slide-up px-4"
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
        class="min-h-screen modern-section flex items-center py-8"
        :style="!isMobile ? 'scroll-snap-align: start' : ''"
      >
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 gradient-text animate-slide-up"
            >
              About Me
            </h2>
            <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div
                class="space-y-4 md:space-y-6 animate-slide-left order-2 md:order-1"
              >
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
        class="min-h-screen modern-section flex items-center py-8"
        :style="!isMobile ? 'scroll-snap-align: start' : ''"
      >
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 gradient-text animate-slide-up"
            >
              Experience & Education
            </h2>
            <div class="space-y-8">
              <!-- Work Experience -->
              <div class="card-elevated p-4 md:p-8">
                <h3
                  class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary"
                >
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
              <div class="card-elevated p-4 md:p-8">
                <h3
                  class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-text-primary"
                >
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
        class="min-h-screen modern-section flex items-center py-8 transition-all duration-800 ease-out"
        :style="!isMobile ? 'scroll-snap-align: start' : ''"
      >
        <div class="container mx-auto px-4">
          <div
            class="grid md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto min-h-[600px] md:min-h-[700px] items-start"
          >
            <div class="flex flex-col h-full justify-start">
               <h2
                 class="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text animate-slide-up text-center mb-6 md:mb-8 mt-28"
               >
                 My Projects
               </h2>

              <div
                class="space-y-3 pr-2 md:pr-4 flex-1 flex flex-col justify-start"
              >
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
                  <div class="flex gap-3 md:gap-4 p-3 md:p-4">
                    <div class="flex-shrink-0">
                      <div
                        class="w-20 h-12 md:w-24 md:h-16 bg-background-tertiary rounded-lg overflow-hidden image-hover"
                      >
                        <img
                          :src="project.images[0]"
                          :alt="project.title + ' Screenshot'"
                          class="w-full h-full object-cover transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <h3
                        class="text-base md:text-lg font-bold mb-2 text-text-primary truncate"
                      >
                        {{ project.title }}
                      </h3>
                      <p
                        class="text-text-secondary mb-3 text-xs md:text-sm line-clamp-2"
                      >
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
              class="bg-background-secondary border border-border-primary rounded-xl p-4 md:p-6 h-full flex flex-col justify-start mt-8"
            >
              <div class="animate-fade-in flex flex-col justify-start h-full">
                <div
                  class="aspect-video bg-background-tertiary rounded-lg mb-4 overflow-hidden cursor-pointer relative flex-shrink-0"
                  @click="openImageModal"
                  @mouseenter="showZoomIcon = true"
                  @mouseleave="showZoomIcon = false"
                >
                  <img
                    :src="
                      projectData[selectedProject]?.images[selectedImageIndex]
                    "
                    :alt="projectData[selectedProject]?.title + ' Screenshot'"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />

                  <!-- Navigation Arrows -->
                  <div
                    v-if="projectData[selectedProject]?.images.length > 1"
                    class="absolute inset-0 flex items-center justify-between p-2 pointer-events-none"
                  >
                    <button
                      @click.stop="previousImage"
                      class="bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-2 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"
                      :class="{ 'opacity-50': selectedImageIndex === 0 }"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click.stop="nextImage"
                      class="bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-2 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"
                      :class="{
                        'opacity-50':
                          selectedImageIndex ===
                          projectData[selectedProject]?.images.length - 1,
                      }"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <!-- Image Counter -->
                  <div
                    v-if="projectData[selectedProject]?.images.length > 1"
                    class="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none"
                  >
                    {{ selectedImageIndex + 1 }} /
                    {{ projectData[selectedProject]?.images.length }}
                  </div>

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
                  class="text-xl md:text-2xl font-bold text-text-primary mb-3 flex-shrink-0"
                >
                  {{ projectData[selectedProject]?.title }}
                </h2>

                <p
                  class="text-text-secondary mb-4 text-sm md:text-base flex-shrink-0 line-clamp-2"
                >
                  {{ projectData[selectedProject]?.description }}
                </p>

                <div class="mb-4 flex-1 min-h-0 overflow-y-auto">
                  <h3
                    class="text-base md:text-lg font-semibold text-text-primary mb-2"
                  >
                    Features
                  </h3>
                  <ul class="text-text-secondary space-y-1 text-xs md:text-sm">
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

                <div class="mb-4 flex-shrink-0">
                  <h3
                    class="text-base md:text-lg font-semibold text-text-primary mb-2"
                  >
                    Technologies
                  </h3>
                  <div class="flex flex-wrap gap-1 md:gap-2">
                    <span
                      v-for="tech in projectData[selectedProject]?.technologies"
                      :key="tech"
                      class="px-2 md:px-3 py-1 bg-accent-600/20 text-accent-400 rounded-full text-xs md:text-sm"
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
        class="min-h-screen modern-section flex flex-col justify-center py-8"
        :style="!isMobile ? 'scroll-snap-align: start' : ''"
      >
        <div class="container mx-auto px-4 flex-1 flex items-center">
          <div class="max-w-2xl mx-auto text-center">
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 gradient-text animate-slide-up"
            >
              Get In Touch
            </h2>
            <p
              class="text-base md:text-lg text-text-secondary mb-6 md:mb-8 px-4"
            >
              I'm always interested in new opportunities and exciting projects.
              Let's work together to bring your ideas to life!
            </p>
            <div
              class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
            >
              <button
                class="btn-primary text-base md:text-lg px-6 md:px-8 py-3 group relative overflow-hidden"
                @click="sendEmail"
              >
                <span class="relative z-10">Send Message</span>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                ></div>
              </button>
              <button
                class="btn-secondary text-base md:text-lg px-6 md:px-8 py-3"
              >
                View Resume
              </button>
            </div>
          </div>
        </div>
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

        <!-- Navigation Arrows for Modal -->
        <div
          v-if="projectData[selectedProject]?.images.length > 1"
          class="absolute inset-0 flex items-center justify-between p-4 pointer-events-none"
        >
          <button
            @click.stop="previousImage"
            class="bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-3 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"
            :class="{ 'opacity-50': selectedImageIndex === 0 }"
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
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            @click.stop="nextImage"
            class="bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-3 transition-all duration-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/30"
            :class="{
              'opacity-50':
                selectedImageIndex ===
                projectData[selectedProject]?.images.length - 1,
            }"
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
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Image Counter for Modal -->
        <div
          v-if="projectData[selectedProject]?.images.length > 1"
          class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full pointer-events-none"
        >
          {{ selectedImageIndex + 1 }} /
          {{ projectData[selectedProject]?.images.length }}
        </div>

        <!-- Image -->
        <img
          :src="projectData[selectedProject]?.images[selectedImageIndex]"
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
const selectedImageIndex = ref(0); // Default to first image
const imageModalOpen = ref(false);
const showZoomIcon = ref(false);
const mobileMenuOpen = ref(false);
const isMobile = ref(false);

const projectData = ref([
  {
    title: "Accident Report App",
    description:
      "Digital accident documentation system built with Flutter, enabling users to create complete insurance-ready accident reports with photos, sketches, and map integration.",
    images: [
      "/images/UnfallApp1.png",
      "/images/UnfallApp2.png",
      "/images/UnfallApp3.png",
    ],
    features: [
      "Accident Report Creation: Collect all relevant insurance data in structured forms",
      "Interactive Accident Sketch: Draw accident scenarios on a Google Maps background",
      "Photo Upload: Attach accident images directly within the report",
      "PDF Export: Generate and share a standardized accident report PDF",
      "Multi-language Support: Automatic translations for international usability",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Google Maps API",
      "SQLite",
      "flutter_localizations",
      "flutter_gen",
    ],
    demoButton: "View Demo",
  },
  {
    title: "Billiard Battle 3D",
    description:
      "Online 3D billiards game built with Unity, featuring real-time 1v1 matches with friends, realistic physics, smooth cue controls, private rooms, and a clean, responsive UI.",
    images: [
      "/images/BilliardGame1.png",
      "/images/BilliardGame2.png",
      "/images/BilliardGame3.png",
      "/images/BilliardGame4.png",
      "/images/BilliardGame5.png",
    ],
    features: [
      "Online 1v1 Matches: Challenge friends via invite codes or quick join",
      "Realistic Physics: Accurate ball collisions, spin/English, cushions, and powerful breaks",
      "Cue Controls & Aiming: Aim line, spin selector, and variable shot power",
      "Private Rooms: Create and share room codes for frictionless friend matches",
      "Rules & Timers: Standard pool rules (8-Ball/9-Ball) with optional shot timer and fouls",
      "Custom Themes: Table/cue customization and AI-generated menu backgrounds",
    ],
    technologies: [
      "Unity",
      "C#",
      "Unity Input System",
      "Mirror Networking",
      "Steamworks",
    ],
  },
  {
    title: "Hardware Management",
    description:
      "Hardware management system with Nuxt 3 and Vue.js, featuring search, filter, Microsoft OAuth, CSV export, history tracking, and responsive UI.",
    images: [
      "/images/HardwareManager1.png",
      "/images/HardwareManager2.png",
      "/images/HardwareManager3.png",
    ],
    features: [
      "Hardware Data Sheet Management: Create, edit, delete hardware data sheets",
      "Advanced Search & Filtering: Multiple search criteria",
      "User Authentication: Login/logout with password hashing",
      "CSV Export: Complete export of all hardware data",
      "Hardware History: Track changes to hardware data sheets",
    ],
    technologies: [
      "Vue.js",
      "Nuxt 3",
      "Nuxt UI",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "Drizzle ORM",
      "PostgreSQL",
      "bcrypt",
      "Docker",
      "Terraform",
      "Cypress",
    ],
  },
]);

const updateMousePosition = (e) => {
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
  selectedImageIndex.value = 0;
};

const nextImage = () => {
  const currentProject = projectData.value[selectedProject.value];
  if (
    currentProject &&
    selectedImageIndex.value < currentProject.images.length - 1
  ) {
    selectedImageIndex.value++;
  }
};

const previousImage = () => {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--;
  }
};

const openImageModal = () => {
  imageModalOpen.value = true;
};

const closeImageModal = () => {
  imageModalOpen.value = false;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

let isScrolling = false;
let currentSectionIndex = 0;
const sections = ["home", "about", "experience", "projects", "contact"];

const handleWheel = (e) => {
  // Only apply custom scroll behavior on desktop
  if (isMobile.value) return;

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
  // Check if device is mobile
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768 || 'ontouchstart' in window;
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Only add mouse events on desktop
  if (!isMobile.value) {
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", checkHover);
  }
  document.addEventListener("wheel", handleWheel, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  // Only remove mouse events if they were added
  if (!isMobile.value) {
    document.removeEventListener("mousemove", updateMousePosition);
    document.removeEventListener("mouseover", checkHover);
  }
  document.removeEventListener("wheel", handleWheel);
});
</script>

<style scoped>
.scene {
  width: 200px;
  height: 200px;
  perspective: 1000px;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .scene {
    width: 400px;
    height: 400px;
    margin: 30px auto;
  }
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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: rgba(59, 130, 246, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (min-width: 768px) {
  .tech-content h3 {
    font-size: 24px;
    margin-bottom: 15px;
  }
}

.tech-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-content li {
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 600;
  opacity: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) {
  .tech-content li {
    font-size: 20px;
    margin-bottom: 10px;
  }
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out;
}

@media (min-width: 768px) {
  .cube:hover {
    transform: rotateY(180deg) rotateX(-45deg) scaleZ(1.2) scaleX(1.2) scaleY(1.2);
  }
}

.front {
  transform: rotateY(0deg) translateZ(100px);
}

.back {
  transform: rotateY(180deg) translateZ(100px);
}

.left {
  transform: rotateY(-90deg) translateZ(100px);
}

.right {
  transform: rotateY(90deg) translateZ(100px);
}

.top {
  transform: rotateX(90deg) translateZ(100px);
}

.bottom {
  transform: rotateX(-90deg) translateZ(100px) rotateZ(180deg);
}

@media (min-width: 768px) {
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
}
</style>
