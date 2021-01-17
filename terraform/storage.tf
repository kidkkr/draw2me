resource "aws_s3_bucket" "boards" {
  bucket = "draw2me-boards"
  acl = "public-read"
  policy = file("terraform/draw2me-boards-policy.json")
}
