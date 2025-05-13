export interface CreditRecord {
  id: string;
  date: string;
  change: number;
  type: 'charge' | 'use';
}
