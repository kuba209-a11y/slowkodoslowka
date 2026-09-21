declare module "hypher" {
  export default class Hypher {
    constructor(patterns: unknown);
    hyphenate(word: string): string[];
  }
}
declare module "hyphenation.pl" {
  const patterns: unknown;
  export default patterns;
}
