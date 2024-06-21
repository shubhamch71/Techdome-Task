module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "~> 18.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.subnets

  eks_managed_node_groups = var.node_groups
}
