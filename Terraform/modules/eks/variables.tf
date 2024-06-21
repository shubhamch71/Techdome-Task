variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "cluster_version" {
  description = "Kubernetes version to use for the EKS cluster"
  type        = string
}

variable "vpc_id" {
  description = "VPC where the cluster and workers will be deployed"
  type        = string
}

variable "subnets" {
  description = "A list of subnets to place the EKS cluster and workers within"
  type        = list(string)
}

variable "node_groups" {
  description = "Map of map of node groups to create"
  type        = any
  default     = {}
}
