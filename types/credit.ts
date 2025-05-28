export interface CreditRecord {
  id: number;
  date: string;
  change: number;
  type: 'USE' | 'CHARGE' | 'REFUND';
}
