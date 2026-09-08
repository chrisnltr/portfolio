import type { Profile } from "~/types/content";

export const profile: Profile = {
  name: "Chris Leon Noltemeier",
  shortName: "Chris Leon Noltemeier",
  location: "Bad Essen",
  email: "chris.noltemeier@gmail.com",
  openToWork: false,
  /** Place file at: public/images/chris-portrait.webp */
  portraitSrc: "/images/chris-portrait.webp",
  socialLinks: [
    {
      id: "github",
      type: "github",
      url: "https://github.com/chrisnltr",
    },
    {
      id: "linkedin",
      type: "linkedin",
      url: "https://www.linkedin.com/in/chris-leon-noltemeier",
    },
    {
      id: "email",
      type: "email",
      url: "mailto:chris.noltemeier@gmail.com",
    },
  ],
};
