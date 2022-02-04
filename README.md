### Download file from artifactory

```
...
jobs:
  - name: Download from Artifactory
    uses: jagadish-k/download-from-artifactory@v1.0.2
    with:
      aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
      aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      artifactory-bucket: ${{ secrets.AWS_ARTIFACTORY_BUCKET }}
      app-path: app/subpath
      artifact: build-dev-12345.zip
...
```