# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /frontend

# Copy package files
COPY frontend/package*.json ./

# Install ALL dependencies (including cross-env from devDependencies)
RUN npm install

# Copy frontend source code
COPY frontend/ ./

# Build the React app (cross-env will now be available)
RUN npm run build

# Verify build output exists
RUN ls -la build/

# Stage 2: Build Spring Boot backend
FROM maven:3.8.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy backend pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy backend source code
COPY backend/src ./src

# Create static directory if it doesn't exist
RUN mkdir -p src/main/resources/static

# Copy built React files to Spring Boot static directory
COPY --from=frontend-build /frontend/build ./src/main/resources/static

# Verify React files were copied
RUN ls -la src/main/resources/static/

# Package the application
RUN mvn clean package -DskipTests

# Stage 3: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=backend-build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application with memory limits for Render free tier
ENTRYPOINT ["java", "-Xmx450m", "-Xms256m", "-jar", "app.jar"]