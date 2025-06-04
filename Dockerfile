# Stage 1: Build Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend

RUN npm install -g pnpm

COPY src/main/frontend/package.json ./
COPY src/main/frontend/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY src/main/frontend/ ./
RUN pnpm run build

# Stage 2: Build Backend
FROM maven:3.9-amazoncorretto-17 as backend-build
WORKDIR /app

COPY pom.xml ./
RUN mvn dependency:go-offline -B

COPY src/ ./src/

COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static/

RUN mvn clean package -DskipTests -q

# Stage 3: Runtime
FROM amazoncorretto:17-alpine
WORKDIR /app

RUN apk add --no-cache wget sqlite sqlite-dev sqlite-libs

COPY --from=backend-build /app/target/enroller-0.0.1-SNAPSHOT.jar app.jar

RUN addgroup -g 1001 -S spring && \
    adduser -S spring -u 1001 -G spring

RUN mkdir -p /app/data && chown spring:spring /app/data
RUN chmod 755 /app/data

RUN chown spring:spring /tmp && chmod 755 /tmp

USER spring:spring

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

ENTRYPOINT ["java", \
  "-Xmx400m", \
  "-Xms200m", \
  "-XX:+UseG1GC", \
  "-XX:+UseStringDeduplication", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-Dspring.profiles.active=prod", \
  "-jar", "app.jar"]
