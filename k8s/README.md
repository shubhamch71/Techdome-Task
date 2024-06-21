### DEPLOYMENT USING KUBERNETES


1. **Create a Kubernetes cluster** (e.g., using Minikube, GKE, EKS).
   
    For minikube you can find the steps here--> [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download)
   
   For others you can check the respective Official Documentation.
   
3. **Deploy the application** using the Kubernetes manifest files (YAML):

   ```bash
   kubectl apply -f k8s/backend.yaml
   kubectl apply -f k8s/frontend.yaml
   kubectl apply -f k8s/database.yaml
   ```

4. **Expose the services** if not already exposed in the manifest files:
   (This is not needed as I have already exposed services in the manifest files)
   ```bash
   kubectl expose deployment frontend --type=LoadBalancer --port=80
   kubectl expose deployment backend --type=LoadBalancer --port=8080
   ```
5. **Scale the application** (You can also directly change the manifest files if you don't want to change it dynamically) :
   ```bash
   kubectl scale deployment frontend --replicas=3 #Change the no of replicas as you need
   kubectl scale deployment backend --replicas=3  #Change the no of replicas as you need
   ```
