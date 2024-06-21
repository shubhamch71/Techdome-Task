Rollback strategies:

For Kubernetes:

1. Use Kubernetes deployments with the `--record` flag to keep a history of rollouts:
   ```
   kubectl apply -f backend.yaml --record
   kubectl apply -f frontend.yaml --record
   ```
3. To rollback, use:
   ``` 
   kubectl rollout undo deployment/backend
   kubectl rollout undo deployment/frontend
   ```
For Terraform:

1. Use version control (e.g., Git) for your Terraform code.

2. Before applying changes, create a backup of your current state:
   `cp terraform.tfstate terraform.tfstate.backup`

3. To rollback, revert your Git changes and restore the state:
   ``` 
   git checkout <previous_commit>
   mv terraform.tfstate.backup terraform.tfstate
   terraform plan
   terraform apply
   ```
