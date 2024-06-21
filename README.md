
# TechDome Blog Application

## Table of Contents
- [Overview](#Overview)
- [Architecture](#Architecture)
- [Directory Structure](#Directory-Structure)
- [Application Deployment Steps](#Application-Deployment-Steps)
- [Challenges Faced](#Challenges-Faced)
- [Potential Solutions](#Potential-Solution)
- [Conclusion](#Conclusion)

## Overview

TechDome is a web application consisting of a frontend built with React and a backend built with Node.js. The application is containerized using Docker and deployed on a Kubernetes cluster. Additionally, Terraform scripts are used for automating the deployment process.

## Architecture

The TechDome application follows a microservices architecture, consisting of three main services:

1. **Frontend**: A React application served by Nginx.
2. **Backend**: A Node.js application providing RESTful APIs connecting to Cloudinary and other services such as frontend and DB.
3. **Database**: A MongoDB instance for data storage.

## Directory Structure

### Frontend Directory
```

front end dir
├── Dockerfile
├── nginx.conf
├── package.json
├── package-lock.json
├── public
│ ├── favicon.ico
│ ├── index.html
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ └── robots.txt
├── README.md
└── src
├── actions
│ ├── blogAction.js
│ └── userAction.js
├── apiConfig
│ └── api.js
├── App.js
├── assests
│ ├── bg.png
│ ├── img1.png
│ └── img2.png
├── components
│ ├── blogCard
│ │ ├── BlogCard.jsx
│ │ └── blogCard.scss
│ └── navbar
│ ├── NavBar.jsx
│ └── navBar.scss
├── constants
│ ├── blogConstants.js
│ └── userConstants.js
├── index.css
├── index.js
├── pages
│ ├── blog
│ │ ├── Blog.jsx
│ │ └── blog.scss
│ ├── form
│ │ ├── Form.jsx
│ │ └── form.scss
│ ├── login
│ │ ├── Login.jsx
│ │ └── login.scss
│ └── signup
│ ├── Signup.jsx
│ └── signup.scss
├── reducer
│ ├── blogReducer.js
│ ├── rootReducer.js
│ └── userReducer.js
└── store.js

```

### Backend Directory
```

backend dir
.
├── controller
│ ├── blogController.js
│ └── userController.js
├── database
│ └── conn.js
├── Dockerfile
├── models
│ ├── blogModel.js
│ └── userModel.js
├── package.json
├── package-lock.json
├── routes
│ ├── blogRoutes.js
│ └── userRoutes.js
└── server.js

````

## Application Deployment Steps

### Docker

1. **Build the Docker images** for both frontend and backend:

   ```bash
   docker build -t username/<image-name> ./Techdome-frontend
   docker build -t username/<image-name> ./Techdome-backend
   ```

2. **Push the images** to Docker Hub or another container registry:
   
   (Make sure you have created account on DockerHub and have configured it)

   ```bash
   docker push username/<image-name>
   docker push username/<image-name>
   ```

4. **Run the application using Docker Compose**:
   ```bash
   docker-compose up -d 
   ```
### For Deploying it on Kubernetes 
You can refer to this --> [Deploy it on Kubernetes](K8s/README.md)

### Terraform Automation 
You can refer to this --> [Automating Deployment using Terraform](Terraform/README.md)

## Challenges Faced

### 1.Unable to use Kubernetes Secrets due to API not able to correctly read the secrets values and map them (CORS Error)

While using Kubernetes secrets, the application encountered a CORS error:

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:8080/api/get_blog. (Reason: CORS request did not succeed). Status code: (null).
Object { stack: "fr@http://192.168.49.2:32081/static/js/main.a16b5dbf.js:2:278965\nQr.xhr</</u.onerror@http://192.168.49.2:32081/static/js/main.a16b5dbf.js:2:294206\n", message: "Network Error", name: "AxiosError", code: "ERR_NETWORK", config: {…}, request: XMLHttpRequest }
```

**Reason**: The frontend application was trying to access the backend API without proper CORS configuration.

### Potential Solution
 **Ensure that the backend API is configured to allow CORS requests from the frontend's origin and also can read the Kubernetes secrets and map them correctly.**  

 **After resolving the error , we can follow the below steps for integrating Kubernetes Secrets into the app**

1. **Store sensitive information** in Kubernetes secrets:

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: techdome-secrets
   type: Opaque
   data:
     API_KEY: base64_encoded_api_key
     API_SECRET: base64_encoded_api_secret
     DB_URI: base64_encoded_db_uri
   ```

2. **Reference the secrets** in the Kubernetes deployment:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: backend
   spec:
     containers:
     - name: backend
       image: username/<image-name>
       env:
       - name: API_KEY
         valueFrom:
           secretKeyRef:
             name: techdome-secrets
             key: API_KEY
       - name: API_SECRET
         valueFrom:
           secretKeyRef:
             name: techdome-secrets
             key: API_SECRET
       - name: DB_URI
         valueFrom:
           secretKeyRef:
             name: techdome-secrets
             key: DB_URI
   ```
 
By implementing these changes, the application will be more secure.

## Conclusion

This document provides a comprehensive overview of the TechDome application architecture, deployment strategy, and instructions for building, deploying, and managing the application. By following the steps outlined, you can ensure a smooth and secure deployment process.

