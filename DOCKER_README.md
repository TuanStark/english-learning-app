# Docker Setup for English Learning App

## Overview
This project uses Docker and Docker Compose for containerization and orchestration. The setup includes:

- **Frontend**: Next.js application
- **Backend**: NestJS API
- **AI Assistant**: Python FastAPI
- **Database**: PostgreSQL
- **Cache**: Redis
- **Reverse Proxy**: Nginx
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

## Quick Start

### Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Production
```bash
# Copy environment file
cp env.example .env

# Edit environment variables
nano .env

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Services

### Frontend (Port 3000)
- **Service**: `frontend`
- **Technology**: Next.js 13+ with App Router
- **Features**: SSR, SEO optimization, PWA support
- **Health Check**: `http://localhost:3000/api/health`

### Backend (Port 3001)
- **Service**: `backend`
- **Technology**: NestJS with TypeScript
- **Features**: REST API, Authentication, Database integration
- **Health Check**: `http://localhost:3001/health`

### AI Assistant (Port 3002)
- **Service**: `ai-assistant`
- **Technology**: Python FastAPI
- **Features**: AI-powered learning assistance, Chat functionality
- **Health Check**: `http://localhost:3002/health`

### Database (Port 5432)
- **Service**: `postgres`
- **Technology**: PostgreSQL 15
- **Features**: Persistent data storage, ACID compliance
- **Credentials**: `postgres/password`

### Cache (Port 6379)
- **Service**: `redis`
- **Technology**: Redis 7
- **Features**: Session storage, API caching, Rate limiting

### Reverse Proxy (Port 80/443)
- **Service**: `nginx`
- **Technology**: Nginx Alpine
- **Features**: Load balancing, SSL termination, Static file serving

## Environment Variables

### Required Variables
```env
POSTGRES_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret
GRAFANA_PASSWORD=admin_password
```

### Optional Variables
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BACKEND_URL=https://api.your-domain.com
NEXT_PUBLIC_AI_URL=https://ai.your-domain.com
```

## Docker Commands

### Build and Run
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build frontend

# Run with rebuild
docker-compose up --build

# Run in background
docker-compose up -d
```

### Management
```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs [service_name]

# Execute command in container
docker-compose exec frontend sh
docker-compose exec backend npm run migration:run

# Scale services
docker-compose up --scale frontend=3
```

### Database Operations
```bash
# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d english_learning

# Backup database
docker-compose exec postgres pg_dump -U postgres english_learning > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres english_learning < backup.sql
```

## Monitoring

### Prometheus (Port 9090)
- **URL**: `http://localhost:9090`
- **Purpose**: Metrics collection and alerting
- **Features**: Service health monitoring, Performance metrics

### Grafana (Port 3001)
- **URL**: `http://localhost:3001`
- **Username**: `admin`
- **Password**: Set in `GRAFANA_PASSWORD`
- **Features**: Dashboards, Visualization, Alerting

### Kibana (Port 5601)
- **URL**: `http://localhost:5601`
- **Purpose**: Log analysis and visualization
- **Features**: Log search, Analytics, Monitoring

## SSL/HTTPS Setup

### Development
```bash
# Generate self-signed certificates
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/key.pem -out ssl/cert.pem
```

### Production
1. Obtain SSL certificates from Let's Encrypt or your CA
2. Place certificates in `./ssl/` directory
3. Update `nginx.prod.conf` with correct paths
4. Uncomment HTTPS server block in nginx config

## Performance Optimization

### Resource Limits
```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 512M
```

### Scaling
```bash
# Scale frontend to 3 replicas
docker-compose up --scale frontend=3

# Scale backend to 2 replicas
docker-compose up --scale backend=2
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check port usage
   netstat -tulpn | grep :3000
   
   # Change ports in docker-compose.yml
   ports:
     - "3001:3000"  # Host:Container
   ```

2. **Database Connection Issues**
   ```bash
   # Check database logs
   docker-compose logs postgres
   
   # Test connection
   docker-compose exec backend npm run migration:status
   ```

3. **Memory Issues**
   ```bash
   # Check container stats
   docker stats
   
   # Increase memory limits
   deploy:
     resources:
       limits:
         memory: 2G
   ```

4. **Build Failures**
   ```bash
   # Clean build cache
   docker-compose build --no-cache
   
   # Remove unused images
   docker image prune -a
   ```

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f --tail=100
```

## Security

### Best Practices
1. **Use strong passwords** for all services
2. **Enable SSL/TLS** in production
3. **Regular updates** of base images
4. **Network isolation** between services
5. **Resource limits** to prevent DoS
6. **Health checks** for all services

### Security Headers
Nginx is configured with security headers:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## Backup and Recovery

### Database Backup
```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec postgres pg_dump -U postgres english_learning > "backup_${DATE}.sql"
```

### Volume Backup
```bash
# Backup volumes
docker run --rm -v english-learning-app_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .
```

## Development Workflow

1. **Local Development**
   ```bash
   # Start only required services
   docker-compose up postgres redis
   
   # Run frontend locally
   npm run dev
   ```

2. **Testing**
   ```bash
   # Run tests in container
   docker-compose exec frontend npm test
   docker-compose exec backend npm run test:e2e
   ```

3. **Deployment**
   ```bash
   # Build production images
   docker-compose -f docker-compose.prod.yml build
   
   # Deploy to production
   docker-compose -f docker-compose.prod.yml up -d
   ```
