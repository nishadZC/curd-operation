# curd-operation
CRUD operation using MERN stack

# To run frontend docker
- Go to frontend directory
- docker build -t frontend .
- docker run --rm -p 8000:80 frontend

# To run backend docker
- Go to back-end folder
-  docker build -t back-end .
-  docker run --rm -p 3001:3001 -e MONGODB_URI=mongodb+srv://vn07244_db_user:OMAqyd5PnOt7Ddbx@cluster0.mfjfyb8.mongodb.net/EventManagement back-end

# To see container running status
- docker ps 

# Use Docker compose to run everything at once
- docker compose down
- docker compose -f /home/vboxuser/task/curd-operation/docker-compose.yml up -d --build


# To push in docker hub (registry)
# frontend
-  docker build -t nishadzc/curd-operation-frontend:latest ./frontend
-  docker push nishadzc/curd-operation-frontend:latest
# backend
-  docker build -t nishadzc/curd-operation-backend:latest ./back-end
-  docker push nishadzc/curd-operation-backend:latest 




# Jenkins CI/CD
- Add this repo as a Jenkins multibranch pipeline or pipeline job.
- Point Jenkins to the root `Jenkinsfile`.
- Make sure the Jenkins agent has Docker and Docker Compose installed.
- Make sure `back-end/.env` is available on the agent, or inject `MONGODB_URI` and other runtime values through Jenkins credentials.
- The pipeline will install dependencies, validate the frontend build, validate the compose file, build images, and deploy on `main` or `master`.
