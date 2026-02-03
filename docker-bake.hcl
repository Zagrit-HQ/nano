group "default" {
  targets = ["api"]
}

target "api-meta" {}
target "api" {
  inherits = ["api-meta"]
  context="."
  dockerfile = "Dockerfile"
  platforms = ["linux/arm64", "linux/amd64"]
}
