# Terraform AWS EKS Project

This project sets up an EKS cluster on AWS using Terraform, designed to work with existing DockerHub images.

## Prerequisites

- Terraform 0.14+
- AWS CLI configured with appropriate credentials
- DockerHub account with the required images

## Usage

1. Navigate to the desired environment directory (e.g., `environments/dev`)(For now I have only kept dev as environment , you can also add prod, UAT as you please!).
2. Initialize Terraform:
