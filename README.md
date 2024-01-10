# cdktf-construct-projen-template

A projen template for CDKTF constructs authored by HashiCorp (internal use only)

## Compatibility

- `node` >= 18.12.0
- `cdktf` >= 0.20.0
- `constructs` >= 10.0.25

## How to Use

1. Navigate to [github.com/cdktf/construct-projen-template](https://github.com/cdktf/construct-projen-template) using your browser
2. Click on "Use this template" in the top-right of the screen

See [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) for full instructions, including screenshots.

Once the repository is created, add the following [GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository):

- `PROJEN_GITHUB_TOKEN`: should be a Classic, nonexpiring token associated with the [team-tf-cdk](https://github.com/team-tf-cdk) account with the following scopes:
  - `read:user`
  - `repo`
  - `workflow`
- Depending on which language(s)/package manager(s) you'd like to publish to:
  - npm (TypeScript)
    - `NPM_TOKEN`
  - Maven Central (Java)
    - `MAVEN_GPG_PRIVATE_KEY`
    - `MAVEN_GPG_PRIVATE_KEY_PASSPHRASE`
    - `MAVEN_PASSWORD`
    - `MAVEN_USERNAME`
    - `MAVEN_STAGING_PROFILE_ID`
  - PyPI (Python)
    - `TWINE_USERNAME`
    - `TWINE_PASSWORD`
  - NuGet (C#)
    - `NUGET_API_KEY`
  - GitHub (Go)
    - `GO_GITHUB_TOKEN`
