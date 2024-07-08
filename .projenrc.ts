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
  "actions/checkout": "692973e3d937129bcbf40652eb9f2f61becf3332", // v4.1.7
  "actions/download-artifact": "65a9edc5881444af0b9093a5e628f2fe47ea3b2e", // v4.1.7
  "actions/github-script": "60a0d83039c74a4aee543508d2ffcb1c3799cdea", // v7.0.1
  "actions/setup-node": "60edb5dd545a775178f52524783378180af0d1f8", // v4.0.2
  "actions/upload-artifact": "65462800fd760344b1a7b4382951275a0abb4808", // v4.3.3
  "amannn/action-semantic-pull-request":
    "0723387faaf9b38adef4775cd42cfd5155ed6017", // v5.5.3
  "peter-evans/create-pull-request": "c5a7806660adbe173f04e3e038b0ccdcd758773c", // v6.1.0
};

const constructsVersion = "10.3.0";
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
  cdktfVersion: "0.20.0",
  constructsVersion,
  jsiiVersion: "~5.4.0",
  typescriptVersion: "~5.4.0", // should always be the same major/minor as JSII
  minNodeVersion: "18.12.0",
});

project.addPeerDeps(
  "cdktf@>=0.20.0",
  "@cdktf/provider-null@>=10.0.0",
  "constructs@>=" + constructsVersion
);
project.addDevDeps(
  "change-case",
  "@action-validator/core",
  "@action-validator/cli",
  // @typescript-eslint v7+ requires Node.js 18.18, so we are stuck on v6
  // The below lines can probably be removed once Node 18 goes EOL and we upgrade minNodeVersion to 20
  "@typescript-eslint/eslint-plugin@^6",
  "@typescript-eslint/parser@^6"
);

new CustomizedLicense(project);
new AutoApprove(project);
new Automerge(project);
new UpgradeCDKTF(project);
new UpgradeNode(project);

const validateTask = project.addTask("validate-workflows", {
  exec: `find ./.github/workflows -type f -name "*.yml" -print0 | xargs -0 -n 1 npx action-validator`,
});
validateTask.description =
  "Lint the YAML files generated by Projen to define GitHub Actions and Workflows, checking them against published JSON schemas";
project.postCompileTask.spawn(validateTask);

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
