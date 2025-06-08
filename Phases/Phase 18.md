# 18. User Authentication System

## Role & Background
**Senior FANG Engineer Profile**: Senior Security Engineer with 10+ years experience at Google or Amazon, specializing in authentication systems, identity management, and secure user workflows. Experience with TypeScript, Next.js, OAuth/OIDC, and JWT implementation. Background in multi-factor authentication, session management, and secure API design is highly valuable.

## Feature Description
The User Authentication System feature provides comprehensive sign-up, sign-in, password recovery, and account management capabilities for the Vibe DevSquad platform. This feature implements a complete authentication solution with secure credential management, multi-factor authentication, and session handling in a new Next.js project.

⚠️ **IMPORTANT INSTRUCTIONS:**
1. Check off each subtask with [x] as you complete it
2. Do not proceed to the next task until ALL checkboxes in the current task are marked complete
3. Use Magic UI MCP with `/ui` command for all component generation
4. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/.aigent/design/Magic Ui templates/agent-template` for component patterns
5. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/` for styling consistency
6. Use Context7 MCP to fetch up-to-date documentation before starting each subtask
7. Use Perplexity MCP for any research needs or best practices
8. Create TaskMaster tasks for any complex implementation requirements

## Implementation Tasks:

### Tier 1 Task - Authentication Infrastructure Setup

#### Subtask 1.1: Set up authentication database schema
- [ ] Before starting, use Context7 MCP to fetch latest Supabase authentication documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/auth"` and topic: "database schema design"
- [ ] Use Perplexity MCP to research authentication data storage
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for storing user authentication data securely in a database"
- [ ] Create `users` table with fields: id, email, hashed_password, full_name, avatar_url, email_verified, active, created_at, updated_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `sessions` table with fields: id, user_id, token, expires_at, created_at, ip_address, user_agent
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `verification_tokens` table with fields: id, user_id, token, type, expires_at, created_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `mfa_methods` table with fields: id, user_id, method_type, identifier, secret, verified, created_at, updated_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `password_reset` table with fields: id, user_id, token, expires_at, created_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `login_attempts` table with fields: id, email, ip_address, success, created_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Set up appropriate relationships and constraints between tables
- [ ] Create database indexes for performance optimization
- [ ] Configure row-level security policies for user data protection

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for authentication
- [ ] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [ ] Use Perplexity MCP to research authentication API design
  - [ ] Use command: `mcp3_perplexity_ask` with query: "API design patterns for secure authentication systems in Next.js applications"
- [ ] Implement `/api/auth/signup` route for user registration
- [ ] Implement `/api/auth/signin` route for user authentication
- [ ] Implement `/api/auth/signout` route for session termination
- [ ] Implement `/api/auth/verify-email` route for email verification
- [ ] Implement `/api/auth/forgot-password` route for password reset requests
- [ ] Implement `/api/auth/reset-password` route for password reset completion
- [ ] Implement `/api/auth/mfa` route for multi-factor authentication
- [ ] Implement `/api/auth/session` route for session validation and refresh
- [ ] Implement `/api/auth/user` route for user profile management
- [ ] Create middleware for protected route authentication

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Set up authentication services
- [ ] Before starting, use Context7 MCP to fetch latest authentication security documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/owasp/authentication-cheatsheet"` and topic: "secure authentication"
- [ ] Use Perplexity MCP to research authentication services
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for implementing secure authentication services in TypeScript applications"
- [ ] Install required authentication libraries: `npm install bcrypt jsonwebtoken cookie zod`
- [ ] Create user service:
  ```typescript
  // src/services/userService.ts
  import bcrypt from 'bcrypt';
  import { db } from '@/lib/db';
  
  export class UserService {
    async createUser(userData: CreateUserData): Promise<User> {
      // Validate user data
      const { email, password, fullName } = userData;
      
      // Check if user already exists
      const existingUser = await db.users.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create user
      const user = await db.users.create({
        data: {
          email,
          hashed_password: hashedPassword,
          full_name: fullName,
          email_verified: false,
        },
      });
      
      // Generate verification token
      await this.createVerificationToken(user.id, 'email');
      
      return user;
    }
    
    async verifyPassword(email: string, password: string): Promise<User> {
      // Find user
      const user = await db.users.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Verify password
      const passwordValid = await bcrypt.compare(password, user.hashed_password);
      if (!passwordValid) {
        throw new Error('Invalid credentials');
      }
      
      return user;
    }
    
    async createVerificationToken(userId: string, type: string): Promise<string> {
      // Generate token
      const token = crypto.randomBytes(32).toString('hex');
      
      // Store token
      await db.verification_tokens.create({
        data: {
          user_id: userId,
          token,
          type,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      });
      
      return token;
    }
    
    // Additional methods for user management
  }
  ```
- [ ] Create authentication service:
  ```typescript
  // src/services/authService.ts
  import jwt from 'jsonwebtoken';
  import { db } from '@/lib/db';
  import { UserService } from './userService';
  
  export class AuthService {
    private userService: UserService;
    
    constructor() {
      this.userService = new UserService();
    }
    
    async signIn(email: string, password: string): Promise<{ user: User; token: string }> {
      // Verify password
      const user = await this.userService.verifyPassword(email, password);
      
      // Check if email is verified
      if (!user.email_verified) {
        throw new Error('Email not verified');
      }
      
      // Generate token
      const token = this.generateToken(user);
      
      // Create session
      await db.sessions.create({
        data: {
          user_id: user.id,
          token: token,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });
      
      return { user, token };
    }
    
    async signOut(token: string): Promise<void> {
      // Delete session
      await db.sessions.deleteMany({ where: { token } });
    }
    
    async verifyToken(token: string): Promise<User> {
      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      
      // Check if session exists
      const session = await db.sessions.findFirst({
        where: {
          token,
          expires_at: { gt: new Date() },
        },
      });
      
      if (!session) {
        throw new Error('Invalid session');
      }
      
      // Get user
      const user = await db.users.findUnique({ where: { id: session.user_id } });
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    }
    
    private generateToken(user: User): string {
      return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
      );
    }
    
    // Additional methods for authentication
  }
  ```
- [ ] Implement password hashing and validation
- [ ] Create JWT token generation and verification
- [ ] Implement email verification system
- [ ] Create password reset functionality
- [ ] Implement multi-factor authentication
- [ ] Develop session management
- [ ] Create rate limiting for login attempts
- [ ] Implement secure cookie handling

📎 Use Context7 MCP for authentication security documentation

#### Subtask 1.4: Create UI components for authentication
- [ ] Before starting, use Context7 MCP to fetch latest React form documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react-hook-form/react-hook-form"` and topic: "form validation"
- [ ] Use Perplexity MCP to research authentication UI design
  - [ ] Use command: `mcp3_perplexity_ask` with query: "UI design patterns for authentication forms with best practices for security and usability"
- [ ] Use Magic UI MCP to create `SignUpForm` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "sign up form with validation"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/auth/sign-up-form.tsx`
- [ ] Use Magic UI MCP to create `SignInForm` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "sign in form with remember me"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/auth/sign-in-form.tsx`
- [ ] Use Magic UI MCP to create `ForgotPasswordForm` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "forgot password form with email input"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/auth/forgot-password-form.tsx`
- [ ] Use Magic UI MCP to create `ResetPasswordForm` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "reset password form with confirmation"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/auth/reset-password-form.tsx`
- [ ] Use Magic UI MCP to create `MFASetup` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "multi-factor authentication setup with QR code"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/auth/mfa-setup.tsx`
- [ ] Use Magic UI MCP to create `MFAVerify` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "multi-factor authentication verification form"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/auth/mfa-verify.tsx`
- [ ] Use Magic UI MCP to create `EmailVerification` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "email verification page with resend option"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/auth/email-verification.tsx`
- [ ] Set up responsive layout with Tailwind CSS
- [ ] Follow Vibe DevSquad design system guidelines in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/vibe-devsquad/.aigent/design/vibe_devsquad_design_system.md`

📎 Use Magic UI MCP for component styling guidelines

✅ **Tier 1 Checkpoint**: Ensure all Tier 1 subtasks are complete and the database schema, API routes, authentication services, and UI components are properly implemented before proceeding to Tier 2

**🔄 Git Commit and Push After Tier 1:**
```bash
git add .
git commit -m "feat: implement Phase 18 Tier 1 - User Authentication infrastructure setup

- Set up authentication database schema with users and sessions tables
- Created Next.js API routes for authentication operations
- Built authentication and user services
- Developed UI components for sign-up, sign-in, and account management"
git push origin main
```

### Tier 2 Task - Authentication Business Logic and Integration

#### Subtask 2.1: Implement user registration and verification
- [ ] Before starting, use Context7 MCP to fetch latest email verification documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/nodemailer/nodemailer"` and topic: "email verification"
- [ ] Use Perplexity MCP to research user registration
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for secure user registration and email verification workflows"
- [ ] Create sign-up form validation
- [ ] Implement email verification process
- [ ] Develop verification link generation
- [ ] Create verification email templates
- [ ] Implement verification token expiration
- [ ] Develop resend verification functionality
- [ ] Create account activation process
- [ ] Implement registration analytics

📎 Use Context7 MCP for email verification documentation

#### Subtask 2.2: Implement authentication and session management
- [ ] Before starting, use Context7 MCP to fetch latest session management documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/owasp/session-management-cheatsheet"` and topic: "secure session management"
- [ ] Use Perplexity MCP to research session security
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for secure session management and authentication in web applications"
- [ ] Create sign-in form validation
- [ ] Implement JWT token generation
- [ ] Develop secure cookie handling
- [ ] Create session persistence
- [ ] Implement session expiration
- [ ] Develop session refresh mechanism
- [ ] Create concurrent session management
- [ ] Implement authentication analytics

📎 Use Context7 MCP for session management documentation

#### Subtask 2.3: Implement password management
- [ ] Before starting, use Context7 MCP to fetch latest password security documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/owasp/password-storage-cheatsheet"` and topic: "secure password storage"
- [ ] Use Perplexity MCP to research password management
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for secure password management, reset workflows, and storage"
- [ ] Create password strength validation
- [ ] Implement forgot password workflow
- [ ] Develop password reset token generation
- [ ] Create password reset email templates
- [ ] Implement password reset form validation
- [ ] Develop password history tracking
- [ ] Create password expiration policies
- [ ] Implement password change notifications

📎 Use Context7 MCP for password security documentation

#### Subtask 2.4: Implement multi-factor authentication
- [ ] Before starting, use Context7 MCP to fetch latest MFA documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/speakeasy/speakeasy"` and topic: "totp authentication"
- [ ] Use Perplexity MCP to research MFA implementation
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for implementing multi-factor authentication in web applications"
- [ ] Create TOTP (Time-based One-Time Password) implementation
- [ ] Implement QR code generation for authenticator apps
- [ ] Develop MFA setup workflow
- [ ] Create MFA verification process
- [ ] Implement backup codes generation
- [ ] Develop MFA recovery options
- [ ] Create MFA enforcement policies
- [ ] Implement MFA analytics

📎 Use Context7 MCP for MFA documentation

✅ **Tier 2 Checkpoint**: Ensure all Tier 2 subtasks are complete and user registration, authentication, password management, and MFA work correctly before proceeding to Tier 3

**🔄 Git Commit and Push After Tier 2:**
```bash
git add .
git commit -m "feat: implement Phase 18 Tier 2 - User Authentication business logic

- Built user registration and email verification system
- Created authentication and session management
- Implemented secure password management and reset workflows
- Developed multi-factor authentication with TOTP"
git push origin main
```

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance authentication UI
- [ ] Before starting, use Context7 MCP to fetch latest UI animation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/framer/motion"` and topic: "animation and transitions"
- [ ] Use Perplexity MCP to research authentication UI enhancements
  - [ ] Use command: `mcp3_perplexity_ask` with query: "UI enhancements and animations for authentication forms to improve user experience"
- [ ] Add form transition animations (150ms)
- [ ] Implement loading states for form submissions
- [ ] Create success/error animations
- [ ] Develop password strength indicator
- [ ] Implement inline validation feedback
- [ ] Create social proof elements
- [ ] Develop branded authentication experience
- [ ] Implement dark/light mode support

📎 Use Operative.sh MCP for visual verification with `mcp7_web_eval_agent`

#### Subtask 3.2: Implement responsive design optimizations
- [ ] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "responsive design"
- [ ] Use Perplexity MCP to research responsive authentication
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Responsive design patterns for authentication forms across different device sizes"
- [ ] Optimize mobile layout (simplified forms, touch-friendly inputs)
- [ ] Create tablet layout (side-by-side forms and information)
- [ ] Enhance desktop layout (branded experience with illustrations)
- [ ] Ensure touch targets are appropriate size (min 44px×44px)
- [ ] Implement responsive form validation
- [ ] Create mobile-optimized MFA setup
- [ ] Develop responsive email templates

📎 Use Operative.sh MCP for responsive testing with `mcp7_web_eval_agent`

#### Subtask 3.3: Implement accessibility enhancements
- [ ] Before starting, use Context7 MCP to fetch latest accessibility documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/w3c/wcag"` and topic: "form accessibility"
- [ ] Use Perplexity MCP to research authentication accessibility
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Accessibility best practices for authentication forms and workflows"
- [ ] Add screen reader support for form elements
- [ ] Create keyboard navigation for all forms
- [ ] Implement high contrast mode for authentication UI
- [ ] Add ARIA attributes for dynamic content
- [ ] Create text alternatives for visual elements
- [ ] Implement focus management for form fields
- [ ] Develop accessible error messaging

📎 Use Operative.sh MCP for accessibility verification with `mcp7_web_eval_agent`

#### Subtask 3.4: Implement security enhancements
- [ ] Before starting, use Context7 MCP to fetch latest security documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/owasp/web-security-testing-guide"` and topic: "authentication testing"
- [ ] Use Perplexity MCP to research authentication security
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Advanced security enhancements for authentication systems in web applications"
- [ ] Implement rate limiting for authentication attempts
- [ ] Add CAPTCHA for suspicious login attempts
- [ ] Create IP-based security checks
- [ ] Implement device fingerprinting
- [ ] Develop suspicious activity detection
- [ ] Create security notification emails
- [ ] Implement account lockout policies
- [ ] Develop security audit logging

📎 Use Operative.sh MCP for security testing with `mcp7_web_eval_agent`

✅ **Tier 3 Checkpoint**: Ensure all Tier 3 subtasks are complete and the authentication system is visually polished, responsive, accessible, and secure before saying it's complete

**🔄 Git Commit and Push After Tier 3 (Phase 18 Complete):**
```bash
git add .
git commit -m "feat: complete Phase 18 - User Authentication UI polish and security enhancements

- Enhanced authentication UI with animations and visual feedback
- Implemented responsive design optimizations for all screen sizes
- Added accessibility enhancements for inclusive usage
- Implemented advanced security features for authentication
- Completed comprehensive QA verification through Operative.sh MCP"
git push origin main
```

---

## 🎉 Phase 18 Complete!
The User Authentication System feature is now fully implemented with:
- ✅ Complete user registration and email verification
- ✅ Secure sign-in and session management
- ✅ Password reset and management workflows
- ✅ Multi-factor authentication with TOTP
- ✅ Responsive and accessible authentication UI
- ✅ Advanced security features for authentication
- ✅ Comprehensive QA verification
