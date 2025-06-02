
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  level: 'primary' | 'secondary';
  category?: string;
}
