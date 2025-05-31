
export interface Testimonial {
  id: number;
  quote: string;
  author: {
    name: string;
    title: string;
    company?: string;
  };
  featured?: boolean;
}
