# 🚀 Deployment Environments Guide

*Complete guide to development, staging, and production environments for Vibe DevSquad platform*

---

## 📋 Environment Overview

The Vibe DevSquad platform uses a three-tier environment strategy designed for optimal development velocity while ensuring production reliability.

| Environment | Purpose | Database | Services | Command |
|-------------|---------|----------|----------|---------|
| **Development** | Daily coding | Mock/Local | Mock | `npm run dev` |
| **Staging** | Testing & QA | Real Supabase | Mixed | `npm run preview` |
| **Production** | Live application | Real Supabase | All Real | `npm start` |

---

## 🛠️ Development Environment

### **Purpose**
Fast development with mock data for rapid iteration and UI development.

### **Configuration**
```bash
# Command
npm run dev

# Port
http://localhost:3000 (or next available)

# Environment File
.env.development (optional) or default Next.js behavior
```

### **Features**
- ⚡ **Fast Startup**: No external dependencies
- 🎭 **Mock Data**: Realistic sample data for development
- 🔥 **Hot Reload**: Instant updates during development
- 🐛 **Debug Mode**: Enhanced logging and error reporting
- 📊 **Performance Testing**: Built-in test scenarios

### **Data Sources**
- **Tasks**: Generated mock data (25-500 task scenarios)
- **Agents**: Mock AI agents with sample capabilities
- **Projects**: Sample project data
- **Database**: Local mock or optional staging connection

### **When to Use**
- ✅ Daily feature development
- ✅ UI/UX work and styling
- ✅ Component development
- ✅ Performance testing
- ✅ Rapid prototyping

### **Limitations**
- ❌ No data persistence between sessions
- ❌ No real service integrations
- ❌ Limited real-world testing scenarios

---

## 🧪 Staging Environment

### **Purpose**
Production-like environment with real database for comprehensive testing and QA.

### **Configuration**
```bash
# Commands
npm run preview        # Primary command
npm run staging:start  # Alternative
npm run qa            # QA-focused alias

# Port
http://localhost:3002

# Environment File
.env.staging
```

### **Infrastructure**
- **Database**: Real Supabase staging database
- **URL**: `https://svaokjkfcmqjrlsypabo.supabase.co`
- **Status**: ✅ Active and Healthy
- **Region**: us-east-1
- **Schema**: Complete production schema

### **Database Schema**
```sql
-- Core Tables
agents          # AI agent definitions and capabilities
tasks           # Task management with dependencies  
projects        # Project organization and metadata
conversations   # Agent interaction history

-- Sample Data
✅ Planning Agent, Development Agent, QA Agent
✅ Vibe DevSquad Platform project
✅ Sample tasks and conversations
```

### **Service Configuration**
| Service | Status | Control Flag | Notes |
|---------|--------|--------------|-------|
| **Database** | 🟢 Real | Always enabled | Supabase staging |
| **Authentication** | 🟢 Real | Always enabled | Supabase auth |
| **Real-time Sync** | 🟢 Real | `ENABLE_REALTIME=true` | Live updates |
| **Task Master API** | 🟡 Mock | `ENABLE_A2A=false` | Can be enabled |
| **Memory Service** | 🟡 Mock | `ENABLE_MEMORY=false` | Can be enabled |
| **Notifications** | 🟡 Mock | `ENABLE_NOTIFICATIONS=false` | Can be enabled |

### **Feature Flags**
```bash
# Current staging configuration
NEXT_PUBLIC_DISABLE_MOCK_DATA=false      # Mixed mode
NEXT_PUBLIC_ENABLE_A2A=false             # A2A disabled
NEXT_PUBLIC_ENABLE_REALTIME=true         # Real-time enabled
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=false   # Notifications disabled
NEXT_PUBLIC_ENABLE_MEMORY=false          # Memory disabled
```

### **When to Use**
- ✅ Feature testing with real data
- ✅ QA sessions and user acceptance testing
- ✅ Performance validation
- ✅ Integration testing
- ✅ Stakeholder demos
- ✅ Pre-production validation

### **Benefits**
- 🎯 **Real Data Persistence**: Changes saved to database
- 🔄 **Real-time Updates**: Multi-tab synchronization
- 🏗️ **Production Infrastructure**: Same setup as production
- 🛡️ **Safe Testing**: Isolated from production
- 📈 **Performance Metrics**: Real database performance

---

## 🌐 Production Environment

### **Purpose**
Live application with all real services enabled for end users.

### **Configuration**
```bash
# Commands (after deployment)
npm run build         # Build for production
npm start            # Start production server

# Environment File
.env.production (or deployment platform environment variables)
```

### **Service Configuration**
| Service | Status | Notes |
|---------|--------|-------|
| **Database** | 🟢 Real | Production Supabase |
| **Authentication** | 🟢 Real | Production auth |
| **Real-time Sync** | 🟢 Real | Live collaboration |
| **Task Master API** | 🟢 Real | Full API integration |
| **Memory Service** | 🟢 Real | Production memory |
| **Notifications** | 🟢 Real | Email/push notifications |

### **Production Readiness**
- ✅ **Database**: Production Supabase project
- ✅ **Service Factory**: Automatic real service selection
- ✅ **Error Handling**: Graceful error boundaries
- ✅ **Performance**: Optimized builds and caching
- ✅ **Security**: Production security headers
- ✅ **Monitoring**: Error tracking and analytics

---

## 🔄 Environment Switching

### **Quick Commands**
```bash
# Development (default)
npm run dev

# Staging/Testing
npm run preview

# Development with staging database
npm run dev:staging-db

# Build for staging
npm run staging:build

# Run staging tests
npm run staging:test
```

### **Service Factory System**
The platform automatically detects the environment and switches services:

```typescript
// Automatic environment detection
const environment = getEnvironment(); // 'development' | 'staging' | 'production'

// Automatic service selection
const taskService = ServiceFactory.getTaskMasterClient();
// Returns mock in development, real in staging/production

// Feature flag control
const useRealNotifications = config.features.enableNotifications;
```

### **Configuration Validation**
```bash
# Test staging configuration
node scripts/test-staging-config.js

# Validates:
✅ Environment files exist
✅ Required variables configured
✅ Database connectivity
✅ Service availability
✅ Script configuration
```

---

## 📊 Environment Comparison

### **Development vs Staging vs Production**

| Feature | Development | Staging | Production |
|---------|-------------|---------|------------|
| **Startup Speed** | ⚡ Instant | 🟡 Fast | 🟡 Fast |
| **Data Persistence** | ❌ None | ✅ Real | ✅ Real |
| **Real Services** | ❌ None | 🟡 Mixed | ✅ All |
| **Performance** | 🟡 Mock | ✅ Real | ✅ Real |
| **Testing** | ✅ Unit | ✅ Integration | ✅ E2E |
| **Debugging** | ✅ Full | 🟡 Limited | ❌ Minimal |
| **Cost** | 💰 Free | 💰 $10/month | 💰 Variable |

### **Data Flow**
```
Development (Mock) → Staging (Real DB) → Production (All Real)
     ↓                    ↓                     ↓
   Fast Dev          Real Testing         Live Users
```

---

## 🚀 Deployment Workflow

### **Recommended Development Flow**

1. **Feature Development**
   ```bash
   npm run dev  # Fast development with mocks
   ```

2. **Feature Testing**
   ```bash
   npm run preview  # Test with real database
   ```

3. **QA Validation**
   ```bash
   npm run qa  # Staging environment for QA team
   ```

4. **Production Deployment**
   ```bash
   npm run build && npm start  # Production deployment
   ```

### **Service Migration Strategy**

**Phase 1: Database (✅ Complete)**
- Real Supabase database in staging
- Data persistence and real-time sync

**Phase 2: Core Services (Ready)**
```bash
# Enable when ready
NEXT_PUBLIC_ENABLE_A2A=true
NEXT_PUBLIC_ENABLE_MEMORY=true
```

**Phase 3: Full Production**
```bash
# All services enabled
NEXT_PUBLIC_DISABLE_MOCK_DATA=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

---

## 🔧 Troubleshooting

### **Common Issues**

**Environment Detection Problems**
```bash
# Check current environment
console.log(process.env.NEXT_PUBLIC_APP_ENV);

# Force environment
NEXT_PUBLIC_APP_ENV=staging npm run dev
```

**Database Connection Issues**
```bash
# Test staging database
node scripts/test-staging-config.js

# Check Supabase status
# Visit: https://supabase.com/dashboard/project/svaokjkfcmqjrlsypabo
```

**Service Factory Issues**
```bash
# Check service selection
const service = ServiceFactory.getTaskMasterClient();
console.log(service.constructor.name); // MockTaskMasterClient or RealTaskMasterClient
```

**Port Conflicts**
```bash
# Development: 3000 (or next available)
# Staging: 3002 (or next available)
# Check ports: lsof -i :3000
```

### **Reset Commands**
```bash
# Reset to clean development
rm .env.local && npm run dev

# Reset to staging
npm run preview

# Clear build cache
rm -rf .next && npm run build
```

---

## 📈 Monitoring & Analytics

### **Development Monitoring**
- Hot reload performance
- Build time optimization
- Component render tracking

### **Staging Monitoring**
- Database query performance
- Real-time sync latency
- Service integration health

### **Production Monitoring**
- User analytics and behavior
- Error tracking and reporting
- Performance metrics and optimization

---

## 🎯 Best Practices

### **Development**
- Use `npm run dev` for daily coding
- Test performance scenarios regularly
- Keep mock data realistic and up-to-date

### **Staging**
- Use `npm run preview` for all testing
- Test with real user scenarios
- Validate performance with production data volumes

### **Production**
- Deploy only after staging validation
- Monitor error rates and performance
- Have rollback plan ready

### **Environment Management**
- Keep environment files secure
- Document configuration changes
- Test environment switching regularly

---

*This guide covers the complete environment strategy for the Vibe DevSquad platform. Each environment serves a specific purpose in the development lifecycle, ensuring both development velocity and production reliability.*
