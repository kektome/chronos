FROM postgres:18-alpine

ENV POSTGRES_DB=chronos \
    POSTGRES_USER=chronos

HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=10 \
  CMD pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" || exit 1
