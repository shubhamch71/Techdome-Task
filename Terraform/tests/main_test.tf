terraform {
  required_version = ">= 0.14.0"
  required_providers {
    test = {
      source = "terraform.io/builtin/test"
    }
  }
}

module "main" {
  source = "../environments/dev"
}

resource "test_assertions" "vpc" {
  component = "vpc"

  equal "vpc_cidr" {
    description = "Check VPC CIDR"
    got         = module.main.vpc.vpc_cidr_block
    want        = "10.0.0.0/16"
  }
}

resource "test_assertions" "eks" {
  component = "eks"

  check "cluster_version" {
    description = "Check EKS cluster version"
    condition   = can(regex("^1\\.24", module.main.eks.cluster_version))
  }
}
