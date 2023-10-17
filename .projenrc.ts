/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// import { snakeCase, pascalCase } from "change-case";
import { cdktf } from "projen";
import { Stability } from "projen/lib/cdk";
import { NpmAccess, UpgradeDependenciesSchedule } from "projen/lib/javascript";
import { AutoApprove } from "./projenrc/auto-approve";
import { Automerge } from "./projenrc/automerge";
import { CustomizedLicense } from "./projenrc/customized-license";
import { UpgradeCDKTF } from "./projenrc/upgrade-cdktf";
import { UpgradeNode } from "./projenrc/upgrade-node";

// `name` is expected to be in the format "cdktf-project-name" or "@cdktf/project-name"
const name = "@cdktf/construct-projen-template";
const shortName = name.replace(/^@?cdktf[-\/]/g, "");

const githubActionPinnedVersions = {
  "actions/checkout": "8ade135a41bc03ea155e62e844d188df1ea18608", // v4.1.0
  "actions/download-artifact": "9bc31d5ccc31df68ecc42ccf4149144866c47d8a", // v3.0.2
  "actions/github-script": "d7906e4ad0b1822421a7e6a35d5ca353c962f410", // v6.4.1
  "actions/setup-node": "5e21ff4d9bc1a8cf6de233a3057d20ec6b3fb69d", // v3.8.1
  "actions/upload-artifact": "a8a3f3ad30e3422c9c7b888a15615d19a852ae32", // v3.1.3
  "amannn/action-semantic-pull-request":
    "47b15d52c5c30e94a17ec87eb8dd51ff5221fed9", // v5.3.0
  "peter-evans/create-pull-request": "153407881ec5c347639a548ade7d8ad1d6740e38", // v5.0.2
};

const project = new cdktf.ConstructLibraryCdktf({
  name,
  description: "A projen template for CDKTF constructs authored by HashiCorp",
  repositoryUrl: `https://github.com/cdktf/${shortName}.git`,
  author: "HashiCorp",
  authorAddress: "https://hashicorp.com",
  authorOrganization: true,
  defaultReleaseBranch: "main",
  projenrcTs: true,
  prettier: true,
  licensed: false,
  pullRequestTemplate: false,
  mergify: false,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ["auto-approve", "automerge", "dependencies"],
      schedule: UpgradeDependenciesSchedule.WEEKLY,
    },
  },
  workflowGitIdentity: {
    name: "team-tf-cdk",
    email: "github-team-tf-cdk@hashicorp.com",
  },
  stability: Stability.EXPERIMENTAL,
  npmAccess: NpmAccess.RESTRICTED, // change this to PUBLIC to publish to NPM
  releaseToNpm: false, // you probably want to remove this line, assuming you want to publish to NPM
  // Uncomment the following depending on which package manager(s) you'd like to publish to
  // publishToPypi: {
  //   distName: name.replace(/^@cdktf\//, "cdktf-"),
  //   module: snakeCase(name.replace(/^@cdktf\//, "cdktf-")),
  // },
  // publishToNuget: {
  //   dotNetNamespace: `HashiCorp.Cdktf.${pascalCase(shortName)}`,
  //   packageId: `HashiCorp.Cdktf.${pascalCase(shortName)}`,
  // },
  // publishToMaven: {
  //   javaPackage: `com.hashicorp.cdktf.${snakeCase(shortName)}`,
  //   mavenGroupId: "com.hashicorp",
  //   mavenArtifactId: name.replace(/^@cdktf\//, "cdktf-"),
  //   mavenEndpoint: "https://hashicorp.oss.sonatype.org",
  // },
  // publishToGo: {
  //   gitUserEmail: "github-team-tf-cdk@hashicorp.com",
  //   gitUserName: "CDK for Terraform Team",
  //   moduleName: `github.com/cdktf/${shortName}-go`,
  //   packageName: shortName.replace(/-/g, ""),
  // },
  cdktfVersion: "0.19.0",
  jsiiVersion: "^5.1.0",
  minNodeVersion: "18.12.0",
});

project.addPeerDeps(
  "cdktf@>=0.19.0",
  "@cdktf/provider-null@>=8.0.0",
  "constructs@^10.0.25"
);
project.addDevDeps(
  "change-case",
  "node-fetch@~2" // @TODO this can be removed once we upgrade to Node 18 and use native fetch
);

new CustomizedLicense(project);
new AutoApprove(project);
new Automerge(project);
new UpgradeCDKTF(project);
new UpgradeNode(project);

// for local developing (e.g. linking local changes to cdktf)
project.addGitIgnore(".yalc");
project.addGitIgnore("yalc.lock");

project.addPackageIgnore("scripts");
project.addPackageIgnore("examples");
project.addPackageIgnore("projenrc");
project.addPackageIgnore("/.projenrc.ts");

project.addPackageIgnore(".copywrite.hcl");
// Run copywrite tool to add copyright headers to all files
project.buildWorkflow?.addPostBuildSteps(
  {
    name: "Setup Copywrite tool",
    uses: "hashicorp/setup-copywrite@867a1a2a064a0626db322392806428f7dc59cb3e", // v1.1.2
  },
  { name: "Add headers using Copywrite tool", run: "copywrite headers" }
);

// Use pinned versions of github actions
Object.entries(githubActionPinnedVersions).forEach(([action, sha]) => {
  project.github?.actions.set(action, `${action}@${sha}`);
});

const releaseWorkflow = project.tryFindObjectFile(
  ".github/workflows/release.yml"
);
releaseWorkflow?.addOverride("on.push", {
  branches: ["main"],
  "paths-ignore": [
    // don't do a release if the change was only to these files/directories
    "examples/**",
    ".github/ISSUE_TEMPLATE/**",
    ".github/CODEOWNERS",
    ".github/dependabot.yml",
    ".github/**/*.md",
  ],
});

project.synth();
