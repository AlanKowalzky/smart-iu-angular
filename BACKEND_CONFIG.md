# 🔧 Backend Configuration

This application supports two backend modes that can be switched via configuration.

## ⚙️ Configuration

Edit `src/app/config.ts`:

```typescript
export const APP_CONFIG = {
  USE_MOCK_API: true,  // true = Mock API, false = JSON Server
  API_BASE_URL: 'http://localhost:3000'
};
```

---

## 🚀 Mode 1: Mock API (Default - Recommended for Development)

**Configuration:**
```typescript
USE_MOCK_API: true
```

**Setup:**
1. No additional setup required
2. Run: `ng serve`
3. Ready to develop!

**Features:**
- ✅ Instant startup
- ✅ No external dependencies
- ✅ Hardcoded responses
- ✅ Perfect for UI development

**Login Credentials:**
- Username: `admin`
- Password: `admin`

---

## 🖥️ Mode 2: JSON Server (Backend Simulation)

**Configuration:**
```typescript
USE_MOCK_API: false
```

**Setup:**
1. Install JSON Server: `npm install -g json-server`
2. Start server: `npx json-server --watch db.json --port 3000`
3. Run Angular: `ng serve`

**Features:**
- ✅ Simulates real backend behavior
- ✅ File-based data storage
- ✅ RESTful API endpoints
- ✅ Good for testing HTTP interceptors

**Available Endpoints:**
- `GET /users?userName=admin&password=admin` - Login
- `GET /users?token=xyz` - User profile
- `GET /dashboards` - Dashboard list
- `GET /dashboards/:id` - Dashboard details

**Login Credentials:**
- Username: `admin`
- Password: `admin`

---

## 🔄 Switching Between Modes

1. **Stop** the Angular dev server (`Ctrl+C`)
2. **Edit** `src/app/config.ts`
3. **Change** `USE_MOCK_API` value
4. **Restart** `ng serve`
5. For JSON Server mode: **Start** JSON Server in separate terminal

---

## 📊 Comparison

| Feature | Mock API | JSON Server |
|---------|----------|-------------|
| Setup Time | Instant | 2 minutes |
| External Dependencies | None | JSON Server |
| Data Persistence | No | File-based |
| Network Simulation | No | Yes |
| Best For | UI Development | Backend Testing |

---

## 🎯 Recommended Workflow

1. **Start with Mock API** (`USE_MOCK_API: true`) for rapid UI development
2. **Switch to JSON Server** (`USE_MOCK_API: false`) when testing HTTP logic
3. **Deploy with Real Backend** by changing `API_BASE_URL` in production

Both modes provide identical functionality and user experience!