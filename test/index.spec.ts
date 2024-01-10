/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { Testing } from "cdktf";
import { Construct } from "constructs";
import { NoopStack } from "../src";

test("synthesizes the null provider", () => {
  const app = Testing.app();
  class MyStack extends NoopStack {
    constructor(scope: Construct, id: string) {
      super(scope, id);
    }
  }
  const stack = new MyStack(app, "MyStack");
  expect(Testing.synth(stack)).toMatchInlineSnapshot(`
    "{
      "provider": {
        "null": [
          {
          }
        ]
      },
      "resource": {
        "null_resource": {
          "resource": {
          }
        }
      },
      "terraform": {
        "required_providers": {
          "null": {
            "source": "null",
            "version": "3.2.2"
          }
        }
      }
    }"
  `);
});
