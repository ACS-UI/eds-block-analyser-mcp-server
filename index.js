#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema, 
} from '@modelcontextprotocol/sdk/types.js';

// Create the server
const server = new Server(
  {
    name: 'eds-block-analyser',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define the EDS Block Analyser prompt
const EDS_BLOCK_ANALYSER_PROMPT = `You are a UI Architect responsible for front-end architecture, modular design systems, and performance-optimized implementations.

Your task is to estimate the effort and outline the approach for converting a Figma design or web page into reusable UI code blocks based on defined constraints.

---
### Definitions

- A **block** is a **reusable, independent UI unit** with:
  - Its own folder under 'blocks/' (e.g., 'blocks/hero-banner/', 'blocks/footer/')
  - Containing a '.js' and a '.css' file
  - Should **not rely on global styles or scripts**, except shared utilities or tokens
  - Must be **accessible, responsive, and Lighthouse-optimized (score: 100)**

- Each **major section/component** in the input (Figma or web page) = **1 UI block**
- Effort is estimated using **T-shirt sizing**: S, M, L, XL, XXL

---
### Tech Stack Constraints

- Only **Plain JavaScript** and **Plain CSS**
- No React, Vue, or any frameworks
- No third-party libraries unless explicitly required

---
### Output Format

Respond in **CSV format**, with these headers:

"Page Title","UI Component Name","Function description","Tshirt Sizing","Complexity justification","Other remarks"


- Quotes are required for every value.
- One row per component/block.
- Include essential items like '"Header"', '"Footer"', and '"Cookie Acceptance Banner"' (if applicable).
- Never combine multiple items into one row.
- If a component name contains commas, enclose in **double quotes**.

---
### Workflow

**Step 1: URL Collection**
- If a **URL** is provided, fetch and list all links ('<a href="...">') from the page.
- Ask user whether to include **subdomain URLs** (e.g., 'blog.example.com', 'help.example.com')
- Store all target URLs in memory for processing.

**Step 2: Page Scraping & UI Block Estimation**
- For each collected URL, connect to a **Model Context Protocol (MCP) server** to scrape and extract the visual structure (DOM sections).
- Feed each page’s structure into an LLM to estimate reusable UI blocks.
- Store the CSV-formatted estimation result in memory.

**Step 3: Component Deduplication & Variation Analysis**
- Combine all collected block lists across pages.
- Feed them to an LLM to:
  - Identify **reusable/common components** (e.g., same '"Footer"' across pages)
  - Group similar components with **variations** (e.g., '"Hero Banner A"', '"Hero Banner B"')

**Step 4: Final Cleanup and Output**
- Merge outputs from Step 2 and Step 3.
- Deduplicate intelligently, preserving variations if necessary.
- Save final clean output to an **Excel file** ('.xlsx') with proper formatting.

---

### Notes

- Always prioritize accessibility, modularity, and performance optimization.
- Any uncertain or inconsistent structure should be flagged in the '"Other remarks"' column.
- Prompt for manual review if estimation confidence is low.

`;

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'eds_block_analyser',
        description: 'Get a UI architect prompt for analyzing and estimating UI block conversion from Figma designs or web pages',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  if (name === 'eds_block_analyser') {
    return {
      content: [
        {
          type: 'text',
          text: EDS_BLOCK_ANALYSER_PROMPT,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('EDS Block Analyser MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});