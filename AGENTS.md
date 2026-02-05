# Agent Guidelines for models.dev

## Commands
- **Validate**: `bun validate` - Validates all provider/model configurations
- **Build web**: `cd packages/web && bun run build` - Builds the web interface
- **Dev server**: `cd packages/web && bun run dev` - Runs development server
- **No test framework** - No dedicated test commands found

## Code Style
- **Runtime**: Bun with TypeScript ESM modules
- **Imports**: Use `.js` extensions for local imports (e.g., `./schema.js`)
- **Types**: Strict Zod schemas for validation, inferred types with `z.infer<typeof Schema>`
- **Naming**: camelCase for variables/functions, PascalCase for types/schemas
- **Error handling**: Use Zod's `safeParse()` with structured error objects including `cause`
- **Async**: Use `async/await`, `for await` loops for file operations
- **File operations**: Use Bun's native APIs (`Bun.Glob`, `Bun.file`, `Bun.write`)

## Architecture
- **Monorepo**: Workspace packages in `packages/` (core, web, function)
- **Config**: TOML files for providers/models in `providers/` directory
- **Validation**: Core package validates all configurations via `generate()` function
- **Web**: Static site generation with Hono server and vanilla TypeScript
- **Deploy**: Cloudflare Workers for function, static assets for web

## Conventions
- Use `export interface` for API types, `export const Schema = z.object()` for validation
- Prefix unused variables with underscore or use `_` for ignored parameters
- Handle undefined values explicitly in comparisons and sorting
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safe property access

## Model Configuration

### Multi-Provider Model Distribution
- Same model appears in 3+ separate provider directories with **no cross-referencing**
- Each provider maintains independent TOML files with provider-specific IDs
- Example: Claude Opus 4.6 exists in `anthropic/`, `amazon-bedrock/`, `google-vertex-anthropic/`, `cloudflare-ai-gateway/`
- Content (capabilities, pricing) is manually duplicated - no shared source

### Model ID = Filename
- The `id` field is **auto-injected** by `generate.ts` from the filename (minus `.toml`)
- Never include `id:` in TOML files - it's derived from the file path
- Filename `anthropic.claude-opus-4-6-v1.toml` → ID `anthropic.claude-opus-4-6-v1`

### Bedrock Naming Patterns
- Most dated models use `-v1:0` suffix: `anthropic.claude-3-5-sonnet-20241022-v1:0.toml`
- **Latest/undated models use bare `-v1`**: `anthropic.claude-opus-4-6-v1.toml` (no `:0`)
- Legacy models also use bare version: `anthropic.claude-instant-v1.toml`, `anthropic.claude-v2.toml`
- Region prefixes: `us.`, `eu.`, `global.` (default has no prefix)

### Vertex AI Naming Patterns
- Dated models use `@YYYYMMDD`: `claude-opus-4-5@20251101.toml`
- **Latest/undated models use bare name**: `claude-opus-4-6.toml` (no `@` suffix)
- Pattern: filename without `@` means it's the current/latest version

### Cost Schema
- `cost.context_over_200k` is a nested `Cost` object for >200K token pricing
- Cache pricing ratios: standard models use 10%/125% (read/write), regional variants may use 30%/375%
- Always validate with `bun validate` - schema uses `.strict()` so extra fields cause errors

### Required vs Optional Fields
| Field | Required? | Notes |
|-------|-----------|-------|
| `name`, `release_date`, `last_updated` | Yes | Human-readable metadata |
| `attachment`, `reasoning`, `tool_call`, `open_weights` | Yes | Boolean capabilities |
| `cost`, `limit`, `modalities` | Yes | Objects with their own required fields |
| `family`, `knowledge`, `temperature`, `structured_output` | No | Optional metadata |
| `status` | No | Use for `"alpha"`, `"beta"`, `"deprecated"` lifecycle |