# cdktf-construct-projen-template

A projen template for CDKTF constructs authored by HashiCorp (internal use only)

## Compatibility

- `node` >= 18.12.0
- `cdktf` >= 0.19.0
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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### NoopStack <a name="NoopStack" id="@cdktf/construct-projen-template.NoopStack"></a>

#### Initializers <a name="Initializers" id="@cdktf/construct-projen-template.NoopStack.Initializer"></a>

```typescript
import { NoopStack } from '@cdktf/construct-projen-template'

new NoopStack(scope: Construct, name: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdktf/construct-projen-template.NoopStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="@cdktf/construct-projen-template.NoopStack.Initializer.parameter.name"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.addDependency">addDependency</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.addOverride">addOverride</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.allProviders">allProviders</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.dependsOn">dependsOn</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.ensureBackendExists">ensureBackendExists</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.getLogicalId">getLogicalId</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.prepareStack">prepareStack</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.registerIncomingCrossStackReference">registerIncomingCrossStackReference</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.registerOutgoingCrossStackReference">registerOutgoingCrossStackReference</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.runAllValidations">runAllValidations</a></code> | Run all validations on the stack. |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.toTerraform">toTerraform</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@cdktf/construct-projen-template.NoopStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@cdktf/construct-projen-template.NoopStack.addDependency"></a>

```typescript
public addDependency(dependency: TerraformStack): void
```

###### `dependency`<sup>Required</sup> <a name="dependency" id="@cdktf/construct-projen-template.NoopStack.addDependency.parameter.dependency"></a>

- *Type:* cdktf.TerraformStack

---

##### `addOverride` <a name="addOverride" id="@cdktf/construct-projen-template.NoopStack.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

###### `path`<sup>Required</sup> <a name="path" id="@cdktf/construct-projen-template.NoopStack.addOverride.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@cdktf/construct-projen-template.NoopStack.addOverride.parameter.value"></a>

- *Type:* any

---

##### `allProviders` <a name="allProviders" id="@cdktf/construct-projen-template.NoopStack.allProviders"></a>

```typescript
public allProviders(): TerraformProvider[]
```

##### `dependsOn` <a name="dependsOn" id="@cdktf/construct-projen-template.NoopStack.dependsOn"></a>

```typescript
public dependsOn(stack: TerraformStack): boolean
```

###### `stack`<sup>Required</sup> <a name="stack" id="@cdktf/construct-projen-template.NoopStack.dependsOn.parameter.stack"></a>

- *Type:* cdktf.TerraformStack

---

##### `ensureBackendExists` <a name="ensureBackendExists" id="@cdktf/construct-projen-template.NoopStack.ensureBackendExists"></a>

```typescript
public ensureBackendExists(): TerraformBackend
```

##### `getLogicalId` <a name="getLogicalId" id="@cdktf/construct-projen-template.NoopStack.getLogicalId"></a>

```typescript
public getLogicalId(tfElement: Node | TerraformElement): string
```

###### `tfElement`<sup>Required</sup> <a name="tfElement" id="@cdktf/construct-projen-template.NoopStack.getLogicalId.parameter.tfElement"></a>

- *Type:* constructs.Node | cdktf.TerraformElement

---

##### `prepareStack` <a name="prepareStack" id="@cdktf/construct-projen-template.NoopStack.prepareStack"></a>

```typescript
public prepareStack(): void
```

##### `registerIncomingCrossStackReference` <a name="registerIncomingCrossStackReference" id="@cdktf/construct-projen-template.NoopStack.registerIncomingCrossStackReference"></a>

```typescript
public registerIncomingCrossStackReference(fromStack: TerraformStack): TerraformRemoteState
```

###### `fromStack`<sup>Required</sup> <a name="fromStack" id="@cdktf/construct-projen-template.NoopStack.registerIncomingCrossStackReference.parameter.fromStack"></a>

- *Type:* cdktf.TerraformStack

---

##### `registerOutgoingCrossStackReference` <a name="registerOutgoingCrossStackReference" id="@cdktf/construct-projen-template.NoopStack.registerOutgoingCrossStackReference"></a>

```typescript
public registerOutgoingCrossStackReference(identifier: string): TerraformOutput
```

###### `identifier`<sup>Required</sup> <a name="identifier" id="@cdktf/construct-projen-template.NoopStack.registerOutgoingCrossStackReference.parameter.identifier"></a>

- *Type:* string

---

##### `runAllValidations` <a name="runAllValidations" id="@cdktf/construct-projen-template.NoopStack.runAllValidations"></a>

```typescript
public runAllValidations(): void
```

Run all validations on the stack.

##### `toTerraform` <a name="toTerraform" id="@cdktf/construct-projen-template.NoopStack.toTerraform"></a>

```typescript
public toTerraform(): any
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.isStack">isStack</a></code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.of">of</a></code> | *No description.* |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdktf/construct-projen-template.NoopStack.isConstruct"></a>

```typescript
import { NoopStack } from '@cdktf/construct-projen-template'

NoopStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdktf/construct-projen-template.NoopStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@cdktf/construct-projen-template.NoopStack.isStack"></a>

```typescript
import { NoopStack } from '@cdktf/construct-projen-template'

NoopStack.isStack(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="@cdktf/construct-projen-template.NoopStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@cdktf/construct-projen-template.NoopStack.of"></a>

```typescript
import { NoopStack } from '@cdktf/construct-projen-template'

NoopStack.of(construct: IConstruct)
```

###### `construct`<sup>Required</sup> <a name="construct" id="@cdktf/construct-projen-template.NoopStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.property.dependencies">dependencies</a></code> | <code>cdktf.TerraformStack[]</code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.property.moveTargets">moveTargets</a></code> | <code>cdktf.TerraformResourceTargets</code> | *No description.* |
| <code><a href="#@cdktf/construct-projen-template.NoopStack.property.synthesizer">synthesizer</a></code> | <code>cdktf.IStackSynthesizer</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdktf/construct-projen-template.NoopStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@cdktf/construct-projen-template.NoopStack.property.dependencies"></a>

```typescript
public readonly dependencies: TerraformStack[];
```

- *Type:* cdktf.TerraformStack[]

---

##### `moveTargets`<sup>Required</sup> <a name="moveTargets" id="@cdktf/construct-projen-template.NoopStack.property.moveTargets"></a>

```typescript
public readonly moveTargets: TerraformResourceTargets;
```

- *Type:* cdktf.TerraformResourceTargets

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@cdktf/construct-projen-template.NoopStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* cdktf.IStackSynthesizer

---





