export interface IBcrypt {
  hash(current: string): Promise<string>;
  compare(current: string, original: string): Promise<boolean>;
}
