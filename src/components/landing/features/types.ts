
import { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  details: string[];
  color: string;
  gradient: string;
}
