const paths = {
  home() {
    return "/";
  },
  nibblesList() {
    return "/nibbles";
  },
  nibblesShow(slug: string) {
    return `/nibbles/${slug}`;
  },
  signIn() {
    return "/api/auth/signin";
  },
};

export default paths;
