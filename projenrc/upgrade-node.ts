/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { javascript } from "projen";
import { JobPermission } from "projen/lib/github/workflows-model";

/**
 * Auto-updates Node to the next LTS version a month before the previous one goes EOL
 */
export class UpgradeNode {
  constructor(project: javascript.NodeProject) {
    const workflow = project.github?.addWorkflow("upgrade-node");

    if (!workflow) throw new Error("no workflow defined");

    workflow.on({
      schedule: [{ cron: "21 8 * * *" }], // Runs once a day
      workflowDispatch: {}, // allow manual triggering
    });

    (workflow.concurrency as any) = "${{ github.workflow }}-${{ github.ref }}";

    workflow.addJobs({
      upgrade: {
        name: "Upgrade Node.js",
        runsOn: ["ubuntu-latest"],
        steps: [
          {
            name: "Checkout",
            uses: "actions/checkout@v3",
          },
          {
            name: "Setup Node.js",
            uses: "actions/setup-node@v3",
            with: {
              "node-version": project.minNodeVersion,
            },
          },
          {
            name: "Install",
            run: "yarn install",
          },
          {
            name: "Get current Node.js version",
            id: "current_version",
            run: [
              `ENGINES_NODE_VERSION=$(npm pkg get engines.node | tr -d '"')`,
              `CURRENT_VERSION=$(cut -d " " -f 2 <<< "$ENGINES_NODE_VERSION")`,
              `CURRENT_VERSION_SHORT=$(cut -d "." -f 1 <<< "$CURRENT_VERSION")`,
              `echo "CURRENT_NODEJS_VERSION=$CURRENT_VERSION" >> $GITHUB_ENV`,
              `echo "CURRENT_NODEJS_VERSION_SHORT=$CURRENT_VERSION_SHORT" >> $GITHUB_ENV`,
              `echo "value=$CURRENT_VERSION" >> $GITHUB_OUTPUT`,
              `echo "short=$CURRENT_VERSION_SHORT" >> $GITHUB_OUTPUT`,
            ].join("\n"),
          },
          {
            name: "Get the earliest supported Node.js version whose EOL date is at least a month away",
            uses: "actions/github-script@v6",
            with: {
              script: [
                `const script = require('./scripts/check-node-versions.js')`,
                `await script({github, context, core})`,
              ].join("\n"),
            },
          },
          {
            name: "Run upgrade script",
            if: "env.CURRENT_NODEJS_VERSION_SHORT != env.NEW_NODEJS_VERSION_SHORT",
            run: "scripts/update-node.sh $NEW_NODEJS_VERSION",
          },
          {
            name: "Get values for pull request",
            id: "latest_version",
            if: "env.CURRENT_NODEJS_VERSION_SHORT != env.NEW_NODEJS_VERSION_SHORT",
            run: [
              `echo "value=$NEW_NODEJS_VERSION" >> $GITHUB_OUTPUT`,
              `echo "short=$NEW_NODEJS_VERSION_SHORT" >> $GITHUB_OUTPUT`,
            ].join("\n"),
          },
          {
            name: "Create Pull Request",
            if: "env.CURRENT_NODEJS_VERSION_SHORT != env.NEW_NODEJS_VERSION_SHORT",
            uses: "peter-evans/create-pull-request@v3",
            with: {
              "commit-message":
                "chore!: increase minimum supported Node.js version to ${{ steps.latest_version.outputs.short }}",
              branch:
                "auto/upgrade-node-${{ steps.latest_version.outputs.short }}",
              base: "main",
              title:
                "chore!: increase minimum supported Node.js version to ${{ steps.latest_version.outputs.short }}",
              body: [
                "This PR increases the minimum supported Node.js version",
                "to `${{ steps.latest_version.outputs.value }}` from `${{ steps.current_version.outputs.value }}`",
                "because version ${{ steps.current_version.outputs.short }} is less than 30 days away from EOL.",
              ].join(" "),
              labels: "automerge,automated,security",
              token: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
              author: "team-tf-cdk <github-team-tf-cdk@hashicorp.com>",
              committer: "team-tf-cdk <github-team-tf-cdk@hashicorp.com>",
              signoff: true,
              "delete-branch": true,
            },
          },
        ],
        env: {
          CI: "true",
          CHECKPOINT_DISABLE: "1",
        },
        permissions: {
          contents: JobPermission.READ,
        },
      },
    });
  }
}
