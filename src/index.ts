/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable import/no-extraneous-dependencies */
import { NullProvider } from "@cdktf/provider-null/lib/provider";
import { Resource } from "@cdktf/provider-null/lib/resource";
/* eslint-enable import/no-extraneous-dependencies */
import { TerraformStack } from "cdktf";
import { Construct } from "constructs";

export class NoopStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new NullProvider(this, "null");
    new Resource(this, "resource");
  }
}
