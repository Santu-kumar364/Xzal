# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci --only=production

# Copy frontend source code and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot backend
FROM maven:3.8.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy backend pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy backend source code
COPY backend/src ./src

# Copy built React files to Spring Boot static directory
COPY --from=frontend-build /frontend/build ./src/main/resources/static

# Package the application
RUN mvn clean package -DskipTests

# Stage 3: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=backend-build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]