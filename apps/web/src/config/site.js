export const siteConfig = {
  name: "Dikshant Goyal",
  email: "webwithdikshant@gmail.com",
  phone: "+919829641370",
  whatsappText: "Hi Dikshant, I saw your portfolio and I'd love to discuss a project with you!",
  get whatsappUrl() {
    return `https://wa.me/${this.phone.replace('+', '')}?text=${encodeURIComponent(this.whatsappText)}`;
  },
  links: {
    linkedin: "https://in.linkedin.com/in/csdikshant",
    instagram: "https://instagram.com/dksikrai"
  }
};
