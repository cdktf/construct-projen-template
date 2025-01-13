# Maintenance Guide

This document is intended for maintainers of this repository and outlines how to perform various maintenance-related activities, including descriptions of what processes are currently automated and which are not (yet).

This repository contains extensive GitHub Actions [workflows](https://github.com/cdktf/construct-projen-template/tree/main/.github/workflows) that automate as much of the project's lifecycle as possible. The project is built using [Projen](https://projen.io/) and as such **these workflows should not be edited directly**. Their sources can be found in the [`.projenrc/`](https://github.com/cdktf/construct-projen-template/tree/main/projenrc) directory, and new workflows are added to the project in [`.projenrc.ts`](https://github.com/cdktf/construct-projen-template/blob/main/.projenrc.ts).

This project is considered experimental, and does not offer any support or maintenance guarantees. One interesting thing to note about this specific repository is that it's intended to only be used by HashiCorp internally – there are no known external consumers – and as such it has historically served as a test-bed for our Projen-based projects. For example, if we think a given JSII upgrade could cause problems, this repo is a great place to test the waters before rolling the update out to other projects.


## Security & Dependency Management

Dependency upgrades (for security purposes as well as a best practice) can be divided into three categories: fully-automated, semi-automated, and not automated.

### Fully Automated

The following Actions exist to automate various dependency upgrades:

- [upgrade-main](https://github.com/cdktf/construct-projen-template/actions/workflows/upgrade-main.yml): This is a Projen built-in/default workflow that handles automated dependency updates. It currently runs on a weekly basis, which can be configured [here](https://github.com/cdktf/construct-projen-template/blob/447d872d8f030ebd3d45ad519f78db5768842f14/.projenrc.ts#L52). Projen will upgrade itself as part of this process. This process is 100% automated; as long as the build succeeds and any tests pass, the PR that is generated will be automatically merged without any human intervention.
- [upgrade-node](https://github.com/cdktf/construct-projen-template/actions/workflows/upgrade-node.yml): This is a custom workflow (source [here](https://github.com/cdktf/construct-projen-template/blob/main/projenrc/upgrade-node.ts)) that runs once a day to check if the current minimum version of Node.js supported by this project is less than 30 days away from EOL; this check is done by [this](https://github.com/cdktf/construct-projen-template/blob/main/scripts/check-node-versions.js) script using [this](https://nodejs.org/download/release/index.json) file as the source of truth. If the script determines that the current version is less than 30 days away from EOL, it runs [this](https://github.com/cdktf/construct-projen-template/blob/main/scripts/update-node.sh) script to upgrade the project to the next even-numbered (i.e. LTS-eligible) version of Node.js. The PR that gets generated currently requires a human engineer to approve it (in case we want to control the timing of when these upgrades roll out across all of our projects), but aside from that the process is fully automated.

Dependabot is also [configured](https://github.com/cdktf/construct-projen-template/blob/main/.github/dependabot.yml) to check for new security updates daily and, if found, make changes to the lockfile only. This is because Dependabot can sometimes address security issues in dependencies more quickly than Projen due to its atomic nature. While you could tweak the Dependabot settings, note that Projen and Dependabot do not generally play nicely together; in particular, Dependabot cannot make changes to `package.json` because Projen would just override these changes (hence the reason why Dependabot is currently limited to lockfile-only). If you wanted to fully automate dependency management using Dependabot, you would want to disable Projen's [automatic updates](https://projen.io/docs/api/typescript#projen.typescript.TypeScriptProjectOptions.property.depsUpgrade).

### Semi-Automated

The following Actions either need to be manually triggered or require significant manual effort as part of the upgrade process:

- [upgrade-cdktf](https://github.com/cdktf/construct-projen-template/actions/workflows/upgrade-cdktf.yml): This is a custom workflow (source [here](https://github.com/cdktf/construct-projen-template/blob/main/projenrc/upgrade-cdktf.ts)) that runs four times a day and checks whether there is a new minor version of CDKTF itself (e.g. `0.19`, `0.20`, `0.21`, etc.), using the latest version published to npm as the source of truth. If a new version is found, it runs [this](https://github.com/cdktf/construct-projen-template/blob/main/scripts/update-cdktf.sh) script to update the CDKTF version in all the right places, and then it creates a draft PR. The reason for the draft status is because a few steps related to the upgrade cannot be automated and must be done manually by an engineer; these are outlined step-by-step in the PR body. Once the steps are completed, the PR can be marked as ready for review & approved in order to complete the upgrade.
- [upgrade-jsii-typescript](https://github.com/cdktf/construct-projen-template/actions/workflows/upgrade-jsii-typescript.yml): This is a custom workflow (source [here](https://github.com/cdktf/construct-projen-template/blob/main/projenrc/upgrade-jsii-typescript.ts)) that must be manually triggered because there currently is no programmatic way to determine when a JSII version is no longer supported. This means that somebody should be monitoring the [JSII support timeline](https://github.com/aws/jsii-compiler/blob/main/README.md#gear-maintenance--support) to determine when it's time to upgrade. The script takes as input the desired new version, and all the steps afterwards are fully automated. The code for the upgrade itself lives in [this](https://github.com/cdktf/construct-projen-template/blob/main/scripts/update-jsii-typescript.sh) script.

### Not Automated

- **GitHub Actions version pinning**: Because this project leverages Projen, HashiCorp Security's [tsccr-helper](https://github.com/hashicorp/security-tsccr?tab=readme-ov-file#tsccr-helper-cli) CLI and other tooling cannot be used to manage/upgrade GitHub Actions versions. Instead, we have consolidated all of the versions into a single [object](https://github.com/cdktf/construct-projen-template/blob/447d872d8f030ebd3d45ad519f78db5768842f14/.projenrc.ts#L21-L31) in code that must be manually updated. Historically, one of the maintainers has followed these manual steps on a roughly monthly basis:
  1. Look up the latest supported versions [here](https://github.com/hashicorp/security-tsccr/tree/main/components/github_actions)
  2. Update the [object](https://github.com/cdktf/construct-projen-template/blob/447d872d8f030ebd3d45ad519f78db5768842f14/.projenrc.ts#L21-L31)
  3. Run `npx projen`
  4. Create a new PR with the title `chore(deps): update pinned versions of GitHub Actions`


## Releasing

Releases are fully automated by Projen and require no manual intervention whatsoever. In general, this repository is configured to publish a new release for each pull request that gets merged. The only way to force it to create one release that combines multiple merged PRs is to ensure that all of these PRs get merged into `main` at exactly the same time. The new version number is automatically calculated by Projen using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Semantic Versioning](https://semver.org/).

If you wanted to change the logic that governs when releases are triggered (such as running them on a schedule, or only for certain types of commits), see Projen's [documentation](https://projen.io/docs/publishing/releases-and-versioning) on this subject.

### Package Managers

This project is not published to any package managers.