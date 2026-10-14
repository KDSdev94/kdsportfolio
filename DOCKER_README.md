# 🐳 Docker Setup untuk DevPorto

Dokumentasi lengkap untuk menjalankan DevPorto menggunakan Docker.

## 📋 Prerequisites

Pastikan sudah terinstall:
- Docker (versi 20.10 atau lebih baru)
- Docker Compose (versi 1.29 atau lebih baru)

Cek versi:
```bash
docker --version
docker-compose --version
```

## 🚀 Quick Start

### 1. Production Mode (Build & Deploy)

Build dan jalankan aplikasi dalam production mode dengan Nginx:

```bash
# Build dan jalankan
docker-compose up -d

# Atau build ulang jika ada perubahan
docker-compose up -d --build
```

Akses aplikasi di: **http://localhost:3000**

### 2. Development Mode (Hot Reload)

Jalankan dalam development mode dengan hot reload:

```bash
# Jalankan dev mode
docker-compose --profile dev up devporto-dev

# Atau jalankan di background
docker-compose --profile dev up -d devporto-dev
```

Akses aplikasi di: **http://localhost:5173**

## 📦 Docker Commands

### Build & Run

```bash
# Build image
docker-compose build

# Jalankan container di background
docker-compose up -d

# Jalankan dan lihat logs
docker-compose up

# Jalankan dengan rebuild
docker-compose up -d --build
```

### Monitoring

```bash
# Lihat status container
docker-compose ps

# Lihat logs
docker-compose logs

# Lihat logs secara realtime
docker-compose logs -f

# Lihat logs specific service
docker-compose logs -f devporto
```

### Stop & Remove

```bash
# Stop containers
docker-compose stop

# Stop dan remove containers
docker-compose down

# Remove containers, networks, dan volumes
docker-compose down -v

# Remove containers dan images
docker-compose down --rmi all
```

### Access Container

```bash
# Masuk ke container
docker exec -it devporto-portfolio sh

# Untuk dev mode
docker exec -it devporto-dev sh
```

## 🔧 Configuration

### Port Configuration

Ubah port di `docker-compose.yml`:

```yaml
services:
  devporto:
    ports:
      - "8080:80"  # Ganti 3000 dengan port yang diinginkan
```

### Environment Variables

Buat file `.env` di root project:

```env
NODE_ENV=production
VITE_API_URL=https://api.example.com
```

Kemudian update `docker-compose.yml`:

```yaml
services:
  devporto:
    env_file:
      - .env
```

### Nginx Configuration

Edit `nginx.conf` untuk custom configuration seperti:
- SSL/HTTPS setup
- Custom headers
- Rate limiting
- Reverse proxy settings

## 📁 Docker Files Overview

### Dockerfile
Multi-stage build:
1. **Stage 1 (builder)**: Install dependencies dan build aplikasi
2. **Stage 2 (production)**: Serve dengan Nginx

### docker-compose.yml
Dua services:
1. **devporto**: Production mode dengan Nginx (port 3000)
2. **devporto-dev**: Development mode dengan Vite (port 5173)

### .dockerignore
Mengecualikan file yang tidak perlu di-copy ke Docker image untuk:
- Ukuran image lebih kecil
- Build lebih cepat
- Security lebih baik

## 🔍 Troubleshooting

### Port sudah digunakan

```bash
# Cek port yang digunakan
sudo lsof -i :3000

# Atau ganti port di docker-compose.yml
```

### Permission denied

```bash
# Tambahkan user ke docker group
sudo usermod -aG docker $USER

# Logout dan login kembali
```

### Build error

```bash
# Clean build
docker-compose down --rmi all
docker system prune -a
docker-compose up -d --build
```

### Container tidak bisa access network

```bash
# Restart Docker daemon
sudo systemctl restart docker

# Atau recreate network
docker-compose down
docker network prune
docker-compose up -d
```

## 🚢 Production Deployment

### Docker Hub

```bash
# Login ke Docker Hub
docker login

# Tag image
docker tag devporto-devporto:latest yourusername/devporto:latest

# Push ke Docker Hub
docker push yourusername/devporto:latest

# Pull dan run di server
docker pull yourusername/devporto:latest
docker run -d -p 80:80 yourusername/devporto:latest
```

### Docker Registry Pribadi

```bash
# Tag untuk registry pribadi
docker tag devporto-devporto:latest registry.example.com/devporto:latest

# Push ke registry
docker push registry.example.com/devporto:latest
```

## 📊 Resource Management

### Check resource usage

```bash
# Lihat penggunaan resource
docker stats

# Lihat disk usage
docker system df
```

### Limit resources

Edit `docker-compose.yml`:

```yaml
services:
  devporto:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## 🔐 Security Best Practices

1. **Jangan commit .env file** ke git
2. **Update base images** secara berkala
3. **Scan vulnerabilities**: 
   ```bash
   docker scan devporto-devporto:latest
   ```
4. **Run as non-root user** (sudah configured di Dockerfile)
5. **Keep secrets secure** menggunakan Docker secrets

## 📝 Notes

- Production mode menggunakan Nginx untuk serve static files (lebih cepat & efisien)
- Development mode menggunakan Vite dev server dengan hot reload
- Image production optimized dengan multi-stage build (size ~50MB)
- Nginx configured dengan compression, caching, dan security headers

## 🆘 Support

Jika ada masalah:
1. Check logs: `docker-compose logs -f`
2. Verify configuration files
3. Restart containers: `docker-compose restart`
4. Rebuild from scratch: `docker-compose down && docker-compose up -d --build`

---

**Happy Dockerizing! 🐳**
