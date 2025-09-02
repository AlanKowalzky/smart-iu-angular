# 🔗 Endpoint Configuration Guide

## Overview
Centralized endpoint configuration for different backend modes.

## Configuration File: `src/app/config.ts`

```typescript
export const APP_DI_CONFIG: AppConfig = {
  useMockApi: false,
  apiBaseUrl: 'http://localhost:3000',
  endpoints: {
    // Current: JSON Server endpoints
    dashboards: '/dashboards',
    users: '/users',
    login: '/users',
    profile: '/users',
    
    // Future: Real API endpoints (uncomment when ready)
    // dashboards: '/api/v1/dashboards',
    // users: '/api/v1/users', 
    // login: '/api/v1/auth/login',
    // profile: '/api/v1/auth/profile',
  },
};
```

## Backend Modes

### 🚀 Mock API Mode
```typescript
useMockApi: true
```
**Endpoints used by mockApiInterceptor:**
- Login: `/api/auth/login`
- Profile: `/api/auth/profile`
- Dashboards: `/api/v1/dashboards`

### 🖥️ JSON Server Mode  
```typescript
useMockApi: false
```
**Endpoints transformed by apiInterceptor:**
- Login: `http://localhost:3000/users`
- Profile: `http://localhost:3000/users`
- Dashboards: `http://localhost:3000/dashboards`

### 🌐 Future Real API Mode
```typescript
useMockApi: false
// Update endpoints in config to:
endpoints: {
  dashboards: '/api/v1/dashboards',
  users: '/api/v1/users',
  login: '/api/v1/auth/login', 
  profile: '/api/v1/auth/profile',
}
```

## Migration Path

### Step 1: JSON Server → Real API
1. Update `apiBaseUrl` to real server
2. Uncomment real API endpoints in config
3. Comment out JSON Server endpoints

### Step 2: Mock API → Real API  
1. Set `useMockApi: false`
2. Update `apiBaseUrl` and endpoints
3. Update mockApiInterceptor URLs if needed

## Benefits
- ✅ Single source of truth for all endpoints
- ✅ Easy switching between backends
- ✅ Future-proof configuration
- ✅ No hardcoded URLs in services