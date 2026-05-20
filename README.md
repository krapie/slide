# slide

## Local Setup

```bash
# build
docker build -t slide .

# run
docker run -p 8080:80 slide
```

## CI/CD

Push to `main` → GitHub Actions builds and pushes `krapi0314/slide:<sha>` → ArgoCD deploys to k8s.

## URL

https://slide.kevinprk.com
