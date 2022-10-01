export interface BusinessRule {
  message: string;

  isBroken(): Promise<boolean> | boolean;
}
