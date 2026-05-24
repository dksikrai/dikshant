export const siteConfig = {
  name: "Dikshant Goyal",
  tagline: "AI-Powered Backend & Product Engineer",
  headline: "I build scalable backend systems, AI workflows & production-ready SaaS platforms.",
  email: "webwithdikshant@gmail.com",
  phone: "+919829641370",
  location: "Jaipur, India (IST)",
  whatsappText: "Hi Dikshant, I saw your portfolio and I'd like to discuss a project with you!",
  get whatsappUrl() {
    return `https://wa.me/${this.phone.replace('+', '')}?text=${encodeURIComponent(this.whatsappText)}`;
  },
  links: {
    linkedin: "https://in.linkedin.com/in/csdikshant",
    github: "https://github.com/dksikrai",
    twitter: "https://twitter.com/csdikshant",
    instagram: "https://instagram.com/dksikrai",
  },
  resume: "/resume.pdf",
  resumeFilename: "Dikshant_Goyal_Resume.pdf",
};
