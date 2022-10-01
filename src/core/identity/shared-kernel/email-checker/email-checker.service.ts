export interface EmailChecker {
  isUnique(email: string): Promise<boolean>;
}
