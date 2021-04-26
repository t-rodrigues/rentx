export interface LoadAccountByToken {
  load(token: string): Promise<void>;
}
