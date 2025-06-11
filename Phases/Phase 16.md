# 16. Knowledge Graph for Projects

## Role & Background
**Senior FANG Engineer Profile**: Senior Knowledge Systems Engineer with 10+ years experience at Google or Meta, specializing in knowledge graphs, semantic networks, and information retrieval systems. Experience with TypeScript, Next.js, graph databases, and natural language processing. Background in ontology design, entity relationship modeling, and intelligent information systems is highly valuable.

## Feature Description
The Knowledge Graph for Projects feature creates an interconnected network of concepts, code, documentation, and relationships across projects to help the Planning Agent make more informed decisions and recommendations. This feature implements a complete knowledge graph solution with entity extraction, relationship mapping, semantic search, and visualization in a new Next.js project.

⚠️ **IMPORTANT INSTRUCTIONS:**
1. Check off each subtask with [x] as you complete it
2. Do not proceed to the next task until ALL checkboxes in the current task are marked complete
3. Use Magic UI MCP with `/ui` command for all component generation
4. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/.aigent/design/Magic Ui templates/agent-template` for component patterns
5. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/` for styling consistency
6. Use Context7 MCP to fetch up-to-date documentation before starting each subtask
7. Use Perplexity MCP for any research needs or best practices
8. Create TaskMaster tasks for any complex implementation requirements

## Implementation Tasks:

### Tier 1 Task - Knowledge Graph Infrastructure Setup

#### Subtask 1.1: Set up knowledge graph database schema
- [ ] Before starting, use Context7 MCP to fetch latest Neo4j documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/neo4j/neo4j"` and topic: "graph database schema design"
- [ ] Use Perplexity MCP to research knowledge graph schema design
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for knowledge graph schema design for software development projects"
- [ ] Create `knowledge_entities` table with fields: id, entity_type, name, description, source_url, created_at, updated_at, metadata_json
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `entity_relationships` table with fields: id, source_entity_id, target_entity_id, relationship_type, strength, created_at, metadata_json
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `entity_embeddings` table with fields: id, entity_id, embedding_vector, embedding_model, created_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `knowledge_sources` table with fields: id, source_type, url, title, last_indexed_at, indexing_status, created_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `entity_references` table with fields: id, entity_id, project_id, reference_type, reference_path, created_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Set up appropriate relationships and constraints between tables
- [ ] Create database indexes for performance optimization
- [ ] Enable vector search capabilities for embeddings

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for knowledge graph
- [ ] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [ ] Use Perplexity MCP to research knowledge graph API design
  - [ ] Use command: `mcp3_perplexity_ask` with query: "API design patterns for knowledge graph systems and semantic networks"
- [ ] Implement `/api/knowledge/entities` route with GET (list) and POST (create) methods
- [ ] Implement `/api/knowledge/entities/[id]` route with GET (detail), PUT (update), and DELETE methods
- [ ] Implement `/api/knowledge/relationships` route for managing entity relationships
- [ ] Implement `/api/knowledge/search` route for semantic search across the knowledge graph
- [ ] Implement `/api/knowledge/sources` route for managing knowledge sources
- [ ] Implement `/api/knowledge/extract` route for entity extraction from content
- [ ] Implement `/api/knowledge/visualize` route for graph visualization data

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Set up knowledge extraction and embedding service
- [ ] Before starting, use Context7 MCP to fetch latest NLP documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/huggingface/transformers"` and topic: "entity extraction"
- [ ] Use Perplexity MCP to research entity extraction and embedding
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for entity extraction and embedding generation from code and documentation"
- [ ] Install required NLP libraries: `npm install @huggingface/inference langchain openai`
- [ ] Create knowledge extraction service:
  ```typescript
  // src/services/knowledgeExtractionService.ts
  import { HfInference } from '@huggingface/inference';
  import { OpenAI } from 'langchain/llms/openai';
  
  export class KnowledgeExtractionService {
    private hf: HfInference;
    private llm: OpenAI;
    
    constructor(config: any) {
      this.hf = new HfInference(config.huggingfaceToken);
      this.llm = new OpenAI({
        openAIApiKey: config.openaiApiKey,
        modelName: 'gpt-4',
      });
    }
    
    async extractEntities(text: string): Promise<Entity[]> {
      // Extract entities from text using NLP
    }
    
    async generateEmbeddings(entity: Entity): Promise<number[]> {
      // Generate vector embeddings for entity
    }
    
    async extractRelationships(entities: Entity[]): Promise<Relationship[]> {
      // Extract relationships between entities
    }
  }
  ```
- [ ] Implement entity extraction from code files
- [ ] Create entity extraction from documentation
- [ ] Implement relationship extraction between entities
- [ ] Create embedding generation for semantic search
- [ ] Implement knowledge source crawling and indexing
- [ ] Create incremental knowledge graph updates
- [ ] Implement entity deduplication and merging

📎 Use Context7 MCP for NLP documentation

#### Subtask 1.4: Create UI components for knowledge graph
- [ ] Before starting, use Context7 MCP to fetch latest graph visualization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/d3/d3-force"` and topic: "force-directed graphs"
- [ ] Use Perplexity MCP to research knowledge graph visualization
  - [ ] Use command: `mcp3_perplexity_ask` with query: "UI design patterns for knowledge graph visualization and exploration interfaces"
- [ ] Use Magic UI MCP to create `KnowledgeGraphViewer` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "interactive graph visualization with nodes and edges"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/visualization/graph-viewer.tsx`
- [ ] Use Magic UI MCP to create `EntityDetail` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "entity detail panel with relationships"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/knowledge/entity-detail.tsx`
- [ ] Use Magic UI MCP to create `KnowledgeSearch` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "semantic search interface with filters"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/search/knowledge-search.tsx`
- [ ] Use Magic UI MCP to create `RelationshipExplorer` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "relationship explorer with path visualization"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/knowledge/relationship-explorer.tsx`
- [ ] Use Magic UI MCP to create `KnowledgeSourceManager` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "knowledge source management interface"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/knowledge/source-manager.tsx`
- [ ] Set up responsive layout with Tailwind CSS
- [ ] Follow Vibe DevSquad design system guidelines in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/vibe-devsquad/.aigent/design/vibe_devsquad_design_system.md`

📎 Use Magic UI MCP for component styling guidelines

✅ **Tier 1 Checkpoint**: Ensure all Tier 1 subtasks are complete and the database schema, API routes, knowledge extraction service, and UI components are properly implemented before proceeding to Tier 2

**🔄 Git Commit and Push After Tier 1:**
```bash
git add .
git commit -m "feat: implement Phase 16 Tier 1 - Knowledge Graph infrastructure setup

- Set up knowledge graph database schema with entity and relationship tables
- Created Next.js API routes for knowledge graph operations
- Built knowledge extraction and embedding service
- Developed UI components for knowledge graph visualization and exploration"
git push origin main
```

### Tier 2 Task - Knowledge Graph Business Logic and Integration

#### Subtask 2.1: Implement knowledge extraction and indexing
- [ ] Before starting, use Context7 MCP to fetch latest code parsing documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/babel/parser"` and topic: "code parsing"
- [ ] Use Perplexity MCP to research code knowledge extraction
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for extracting knowledge entities and relationships from code repositories"
- [ ] Create code file parser for multiple languages
- [ ] Implement documentation parser for Markdown and JSDoc
- [ ] Develop entity extraction from code comments
- [ ] Create function and class relationship extraction
- [ ] Implement dependency relationship extraction
- [ ] Develop incremental indexing for code changes
- [ ] Create knowledge source prioritization
- [ ] Implement error handling for failed extractions

📎 Use Claude MCP for advanced entity extraction

#### Subtask 2.2: Implement semantic search and retrieval
- [ ] Before starting, use Context7 MCP to fetch latest vector search documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/vector"` and topic: "vector search"
- [ ] Use Perplexity MCP to research semantic search
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for implementing semantic search with vector embeddings in knowledge graphs"
- [ ] Create semantic query parsing
- [ ] Implement vector similarity search
- [ ] Develop hybrid search (text + vector)
- [ ] Create entity-based filtering
- [ ] Implement relationship path queries
- [ ] Develop relevance ranking algorithms
- [ ] Create search result clustering
- [ ] Implement search history and suggestions

📎 Use Supabase MCP for vector search operations

#### Subtask 2.3: Implement Planning Agent knowledge integration
- [ ] Before starting, use Context7 MCP to fetch latest LLM context augmentation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/langchain/langchain"` and topic: "retrieval augmentation"
- [ ] Use Perplexity MCP to research LLM knowledge integration
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for integrating knowledge graphs with LLM agents for context-aware responses"
- [ ] Create Planning Agent knowledge retrieval API
- [ ] Implement context-aware entity resolution
- [ ] Develop knowledge-based response generation
- [ ] Create entity and relationship suggestion system
- [ ] Implement knowledge gap identification
- [ ] Develop automated knowledge acquisition
- [ ] Create knowledge verification with Planning Agent
- [ ] Implement knowledge utilization tracking

📎 Use Claude MCP for knowledge-augmented responses

#### Subtask 2.4: Implement knowledge visualization and exploration
- [ ] Before starting, use Context7 MCP to fetch latest graph visualization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/d3/d3-force"` and topic: "interactive graphs"
- [ ] Use Perplexity MCP to research knowledge exploration interfaces
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for interactive knowledge graph exploration and visualization interfaces"
- [ ] Create interactive force-directed graph visualization
- [ ] Implement node clustering and grouping
- [ ] Develop relationship filtering and highlighting
- [ ] Create path exploration between entities
- [ ] Implement graph navigation history
- [ ] Develop knowledge map export functionality
- [ ] Create custom visualization layouts
- [ ] Implement graph annotation and sharing

📎 Use D3.js for graph visualization

✅ **Tier 2 Checkpoint**: Ensure all Tier 2 subtasks are complete and knowledge extraction, semantic search, Planning Agent integration, and visualization work correctly before proceeding to Tier 3

**🔄 Git Commit and Push After Tier 2:**
```bash
git add .
git commit -m "feat: implement Phase 16 Tier 2 - Knowledge Graph business logic

- Built knowledge extraction and indexing from code and documentation
- Created semantic search and retrieval with vector embeddings
- Implemented Planning Agent knowledge integration
- Developed interactive knowledge visualization and exploration"
git push origin main
```

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance knowledge graph visualization
- [ ] Before starting, use Context7 MCP to fetch latest data visualization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/d3/d3"` and topic: "interactive visualization"
- [ ] Use Perplexity MCP to research graph visualization enhancements
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Advanced techniques for knowledge graph visualization with interactive features and animations"
- [ ] Add smooth animations for graph transitions (150ms)
- [ ] Implement node and edge styling based on entity types
- [ ] Create interactive tooltips for graph elements
- [ ] Develop mini-map for large graph navigation
- [ ] Implement zoom and pan controls with smooth transitions
- [ ] Create focused exploration mode for selected entities
- [ ] Develop relationship strength visualization
- [ ] Implement custom node icons for entity types

📎 Use Operative.sh MCP for visual verification with `mcp7_web_eval_agent`

#### Subtask 3.2: Implement responsive design optimizations
- [ ] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "responsive design"
- [ ] Use Perplexity MCP to research responsive graph interfaces
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Responsive design patterns for knowledge graph interfaces across different device sizes"
- [ ] Optimize mobile layout (simplified graph, focus on search)
- [ ] Create tablet layout (side panel with graph view)
- [ ] Enhance desktop layout (multi-panel with customizable layout)
- [ ] Ensure touch targets are appropriate size (min 44px×44px)
- [ ] Implement responsive search interface
- [ ] Create mobile-optimized entity detail view
- [ ] Develop responsive knowledge source management

📎 Use Operative.sh MCP for responsive testing with `mcp7_web_eval_agent`

#### Subtask 3.3: Implement accessibility enhancements
- [ ] Before starting, use Context7 MCP to fetch latest accessibility documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/w3c/wcag"` and topic: "graph accessibility"
- [ ] Use Perplexity MCP to research graph accessibility
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Accessibility best practices for knowledge graph visualization and exploration interfaces"
- [ ] Add screen reader support for graph elements
- [ ] Create keyboard navigation for graph exploration
- [ ] Implement high contrast mode for graph visualization
- [ ] Add ARIA attributes for dynamic content
- [ ] Create text alternatives for visual relationships
- [ ] Implement focus management for interactive elements
- [ ] Develop accessible search and filtering controls

📎 Use Operative.sh MCP for accessibility verification with `mcp7_web_eval_agent`

#### Subtask 3.4: Implement performance optimizations
- [ ] Before starting, use Context7 MCP to fetch latest performance optimization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "performance optimization"
- [ ] Use Perplexity MCP to research graph performance
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Performance optimization techniques for large knowledge graphs in web applications"
- [ ] Implement graph rendering optimization for large datasets
- [ ] Add progressive loading for graph elements
- [ ] Create efficient caching for knowledge entities
- [ ] Implement WebWorkers for background processing
- [ ] Develop optimized vector search algorithms
- [ ] Create performance monitoring for knowledge operations
- [ ] Implement lazy loading for entity details
- [ ] Utilize Next.js server components where appropriate for improved performance

📎 Use Operative.sh MCP for performance testing with `mcp7_web_eval_agent`

✅ **Tier 3 Checkpoint**: Ensure all Tier 3 subtasks are complete and the knowledge graph interface is visually polished, responsive, accessible, and performs well with large knowledge graphs before saying it's complete

**🔄 Git Commit and Push After Tier 3 (Phase 16 Complete):**
```bash
git add .
git commit -m "feat: complete Phase 16 - Knowledge Graph UI polish and QA

- Enhanced knowledge graph visualization with animations and styling
- Implemented responsive design optimizations for all screen sizes
- Added accessibility enhancements for inclusive usage
- Implemented performance optimizations for large knowledge graphs
- Completed comprehensive QA verification through Operative.sh MCP"
git push origin main
```

---

## 🎉 Phase 16 Complete!
The Knowledge Graph for Projects feature is now fully implemented with:
- ✅ Complete database schema for entities and relationships
- ✅ Knowledge extraction from code and documentation
- ✅ Semantic search with vector embeddings
- ✅ Planning Agent knowledge integration
- ✅ Interactive knowledge visualization and exploration
- ✅ Responsive and accessible interface
- ✅ Optimized performance for large knowledge graphs
