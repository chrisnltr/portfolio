import type { Profile } from "~/types/content";

// TODO: Replace CV file names with your actual PDFs in /public/cv.
export const profile: Profile = {
  name: "Chris Leon Noltemeier",
  location: "Bad Essen / Remote",
  openToWork: true,
  cv: {
    en: "/cv/chris-leon-noltemeier-en.pdf",
    de: "/cv/chris-leon-noltemeier-de.pdf",
  },
  socialLinks: [
    {
      id: "github",
      type: "github",
      url: "https://github.com/chrisnltr",
    },
    {
      id: "linkedin",
      type: "linkedin",
      url: "https://www.linkedin.com/in/chris-leon-noltemeier-811142315",
    },
    {
      id: "email",
      type: "email",
      url: "mailto:chris.noltemeier@gmail.com",
    },
  ],
};

