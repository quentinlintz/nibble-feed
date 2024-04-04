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
};

export default paths;
