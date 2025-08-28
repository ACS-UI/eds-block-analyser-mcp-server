# EDS Block Analyser MCP Server

A Model Context Protocol (MCP) server that provides UI architecture analysis for converting Figma designs or web pages into reusable UI code blocks.

## What it does

This MCP server provides a single tool that returns a comprehensive UI architect prompt for analyzing and estimating the effort required to convert Figma designs or web pages into modular, reusable UI blocks. The prompt guides AI assistants to perform thorough analysis focusing on component structure, effort estimation, and implementation approach.

## Features

- **Complete Workflow Orchestration**: End-to-end website analysis from URL collection to artifact creation
- **URL Discovery and Collection**: Automated discovery of all website URLs and intelligent selection
- **Component Structure Extraction**: Batch processing of URLs to extract component structure and markup
- **EDS Block Collection Integration**: Maps components to Adobe's EDS block collection
- **Block Variation Analysis**: Groups similar blocks into variations with appropriate naming
- **Technical Naming**: Provides technical names for blocks not in the collection
- **Effort Estimation**: Uses T-shirt sizing (S-Simple, M-Medium, C-Complex) for complexity assessment
- **Comprehensive Artifacts**: Creates multiple artifacts including CSV, summary reports, and catalogs
- **Quality Gates**: Built-in quality checks and validation at each phase
- **Performance Focus**: Targets Lighthouse score of 100
- **Modular Design**: Emphasizes reusable, independent UI blocks
- **Plain Tech Stack**: Focuses on vanilla JavaScript and CSS without frameworks

## Installation

### Global Installation
```bash
npm install -g eds-block-analyser-mcp-server
```

### Local Installation
```bash
npm install eds-block-analyser-mcp-server
```

## Usage

### With Claude Desktop

Add this to your Claude Desktop configuration file:

**On macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**On Windows:** `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "eds-block-analyser": {
      "command": "npx",
      "args": ["eds-block-analyser-mcp-server"]
    }
  }
}
```

### With MCP Client

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'npx',
  args: ['eds-block-analyser-mcp-server']
});

const client = new Client({
  name: 'my-client',
  version: '1.0.0'
}, {
  capabilities: {}
});

await client.connect(transport);

// Use the tool
const result = await client.callTool({
  name: 'eds_block_analyser'
});

console.log(result.content[0].text);
```

## Available Tools

### `website_analysis_planner`
- **Description:** Orchestrate the complete flow for analyzing websites, extracting components, and creating implementation artifacts with effort estimation
- **Parameters:** None
- **Returns:** A comprehensive framework for complete website analysis orchestration

The framework includes:
- **Phase 1**: URL Collection and Discovery
- **Phase 2**: Component Structure Extraction
- **Phase 3**: Available Component Analysis
- **Phase 4**: Component Mapping and Variation Analysis
- **Phase 5**: Effort Estimation and T-Shirt Sizing (S-Simple, M-Medium, C-Complex)
- **Phase 6**: Validation and Quality Assurance
- **Phase 7**: Artifact Creation (only after validation passes)
- Quality gates and validation criteria
- Error handling and success metrics
- Complete orchestration workflow

### `eds_block_analyser`
- **Description:** Get a UI architect prompt for analyzing and estimating UI block conversion
- **Parameters:** None
- **Returns:** A comprehensive prompt for UI block analysis and effort estimation

The prompt includes:
- Role definition as UI Architect
- Task description for Figma/web page conversion
- Context about blocks, tech stack, and performance requirements
- Few-shot examples for guidance
- Strict CSV output format requirements

### `block_variation_analyzer`
- **Description:** Group similar blocks into variations and provide appropriate naming based on EDS block collection or technical naming conventions
- **Parameters:** None
- **Returns:** A comprehensive framework for block variation analysis and naming

The framework includes:
- Block similarity assessment guidelines
- Source block identification protocols
- Naming convention priorities (EDS collection first, then technical names)
- Technical naming guidelines for different component types
- Variation classification system
- Quality criteria for analysis

### Framework Tools
- **`self_evaluation_framework`**: Quality assessment metrics and scoring
- **`error_handling_framework`**: Error handling and escalation protocols
- **`security_guardrails_framework`**: Security and safety protocols
- **`required_artifacts_framework`**: Required output specifications

## Output Format

The tool provides a prompt that generates CSV output with the following columns:
- Page Title
- UI Component Name
- Function description
- Tshirt Sizing (S-Simple, M-Medium, C-Complex)
- Number of occurrences
- Complexity justification
- Page URL
- Source block name
- Variation type
- Other remarks

### Required Artifacts
1. **CSV Analysis File** ('ui_blocks_analysis.csv') - Complete component breakdown
2. **Summary Report** ('analysis_summary.md') - Executive summary with URL analysis
3. **Evaluation Log** ('evaluation_log.md') - Quality assessment and iteration tracking

## Development

### Clone and Setup
```bash
git clone https://github.com/kalimuthu-a/eds-block-analyser-mcp-server.git
cd eds-block-analyser-mcp-server
npm install
```

### Run Locally
```bash
npm start
```

### Test with MCP Inspector
```bash
npx @modelcontextprotocol/inspector npx eds-block-analyser-mcp-server
```

## Requirements

- Node.js >= 18.0.0
- @modelcontextprotocol/sdk ^0.4.0

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues, please file them on the [GitHub repository](https://github.com/kalimuthu-a/eds-block-analyser-mcp-server/issues).