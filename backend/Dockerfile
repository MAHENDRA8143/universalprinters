# -------- BUILD STAGE --------
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml first (for caching dependencies)
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests


# -------- RUNTIME STAGE --------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render uses dynamic PORT
ENV PORT=8080

# Expose port (not required but good practice)
EXPOSE 8080

# Start application using Render PORT
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]