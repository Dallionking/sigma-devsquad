
import { z } from 'zod';

export const profileSetupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  jobTitle: z.string().min(2, { message: "Job title is required." }),
  company: z.string().optional(),
  bio: z.string().max(500).optional(),
  profileImage: z.string().optional(),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  preferredLanguages: z.array(z.string()).min(1),
  interests: z.array(z.string()).min(1),
});

export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;
