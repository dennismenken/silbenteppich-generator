# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - using static-web-server
FROM ghcr.io/static-web-server/static-web-server:2-alpine AS production

# Copy the built app
COPY --from=builder /app/dist /public

# Create configuration for static-web-server
RUN echo '[general]' > /sws.toml && \
    echo 'host = "0.0.0.0"' >> /sws.toml && \
    echo 'port = 80' >> /sws.toml && \
    echo 'root = "/public"' >> /sws.toml && \
    echo 'log-level = "info"' >> /sws.toml && \
    echo 'directory-listing = false' >> /sws.toml && \
    echo '' >> /sws.toml && \
    echo '[advanced]' >> /sws.toml && \
    echo 'compression = true' >> /sws.toml && \
    echo 'compression-level = "best"' >> /sws.toml && \
    echo 'cache-control-headers = true' >> /sws.toml && \
    echo '' >> /sws.toml && \
    echo '[[advanced.headers]]' >> /sws.toml && \
    echo 'source = "**/*.{js,css,woff2}"' >> /sws.toml && \
    echo '[advanced.headers.headers]' >> /sws.toml && \
    echo 'Cache-Control = "public, max-age=31536000, immutable"' >> /sws.toml && \
    echo '' >> /sws.toml && \
    echo '[[advanced.headers]]' >> /sws.toml && \
    echo 'source = "**/*.html"' >> /sws.toml && \
    echo '[advanced.headers.headers]' >> /sws.toml && \
    echo 'Cache-Control = "no-cache"' >> /sws.toml && \
    echo 'X-Frame-Options = "SAMEORIGIN"' >> /sws.toml && \
    echo 'X-Content-Type-Options = "nosniff"' >> /sws.toml && \
    echo '' >> /sws.toml && \
    echo 'fallback = "/index.html"' >> /sws.toml

# Expose port
EXPOSE 80

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Run static-web-server
CMD ["static-web-server", "--config-file", "/sws.toml"]