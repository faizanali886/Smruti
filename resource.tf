provider "google" {
  project = "githubcoudrun"
  region  = "us-central1"
  credentials = file("C:\\Users\\Faizan Ali\\AppData\\Roaming\\gcloud\\githubcoudrun-637cf49f1f4e.json")
}

resource "google_cloud_run_service" "cloudrun" {
  name     = "terraform-cloud-run"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/githubcoudrun/cloudrun@sha256:a5aad7031ccbb4507d4695f0d38d2c25ce118a492a541dca756edca8aa4ca55e"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  # Disable automatic revision name generation
  autogenerate_revision_name = false
}

resource "google_cloud_run_service_iam_policy" "cloudrun_policy" {
  service = google_cloud_run_service.cloudrun.name

  policy_data = <<EOF
{
  "bindings": [
    {
      "role": "roles/run.invoker",
      "members": [
        "allUsers"
      ]
    }
  ]
}
EOF
}
