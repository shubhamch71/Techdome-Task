# Automating using Terraform (ONLY FOR AWS) 

This project sets up an EKS cluster on AWS using Terraform, designed to deploy the app on EKS.

## Prerequisites

- Terraform 0.14+
- AWS CLI configured with appropriate credentials
- DockerHub account with the required images

## Usage

1. Navigate to the desired environment directory (e.g., `environments/dev`)(For now I have only kept dev as environment , you can also add prod, UAT as you please!).
2. Initialize Terraform in the `/environments/dev/' by running the following command:
    ```bash
    terraform init
    ```
3. Check you configuration by dry run i.e 
   ```bash
   terraform plan
   ```
   **This wil show you the resources that will be created and destroyed. A output file of the same has been attached in the same repo on the following location:- Terraform/environments/dev/plan.json**

4. Apply the plan 
   ```bash
   terraform apply
   ```
5. You can delete the app deployed on AWS using Terraform:
   ```bash
   terraform destroy
   ``` 
