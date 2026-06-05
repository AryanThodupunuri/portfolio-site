import { useParams, Link } from 'react-router-dom';

const projectDetails: { [key: string]: any } = {
  'cloud-sentinel': {
    title: 'CloudSentinel',
    github: 'https://github.com/AryanThodupunuri/cloud-sentinel',
    problem: 'AWS cost management is notoriously opaque. Teams accumulate idle resources, miss rightsizing opportunities, and only discover waste after large bills arrive. Existing tools surface raw data but stop short of telling you what to actually do about it — and even further from doing it safely.',
    solution: 'Built CloudSentinel, an agentic AI-powered FinOps platform that uses a multi-agent backend system to continuously analyze cloud spend, detect anomalies, surface optimization opportunities, and generate structured human-reviewed remediation workflows. The system is analysis-first and non-destructive — no automatic EC2 termination, resizing, or resource mutation.',
    techStack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'AWS Cost Explorer', 'AWS Compute Optimizer', 'CloudWatch', 'STS AssumeRole', 'Groq LLM', 'ChromaDB', 'GitHub API'],
    architecture: 'Designed around dedicated specialized agents: a cost ingestion agent pulls daily service-level spend from AWS Cost Explorer and normalizes it into a FastAPI/SQLAlchemy backend; an anomaly detection agent applies rolling 7-day and 30-day baselines with z-scores and percent-change thresholds to flag spend spikes with explainable evidence; a Compute Optimizer agent pulls rightsizing recommendations from AWS; an idle EC2 agent queries CloudWatch utilization metrics to detect underused instances; and an ActionPlan agent transforms all findings into structured remediation plans with risk levels, proposed changes, rollback plans, and approval states. A RAG-based cloud assistant backed by ChromaDB and Groq LLM can answer natural language questions over cost records, anomalies, and recommendations. Secure AWS connectivity is handled via STS AssumeRole — no long-term access keys stored. Action plans can be turned into GitHub issues, keeping humans in the review loop.',
    highlights: [
      'Multi-agent backend with specialized agents for cost ingestion, anomaly detection, Compute Optimizer analysis, idle EC2 detection, and action plan generation',
      'RAG-based cloud assistant using ChromaDB vector store and Groq LLM for natural language Q&A over cost and recommendation data',
      'Anomaly detection using rolling 7-day/30-day baselines, z-scores, and percent-change thresholds with explainable evidence per anomaly',
      'AWS connectivity via STS AssumeRole with no long-term credentials stored anywhere',
      'Agentic ActionPlan workflow generates structured remediation plans with risk level, proposed change, rollback plan, and approval state',
      'Action plans export directly to GitHub issues, turning findings into trackable tasks that stay under human review',
      'Strictly non-destructive: no automatic EC2 termination, EBS modification, Terraform execution, or cloud resource mutation',
    ],
  },
  coursecompass: {
    title: 'CourseCompass',
    github: 'https://github.com/AryanThodupunuri/coursecompass',
    problem: 'UVA students face significant information asymmetry during course registration. The official portal shows seats and schedules but nothing about professor quality, workload, or how a course actually fits into a degree plan. Students rely on informal word-of-mouth or slow external sites, leading to poor scheduling decisions at scale across 25,000+ students.',
    solution: 'Built a full-stack distributed system with a high-concurrency Spring Boot API and a Manifest V3 Chrome Extension that injects enriched course data — professor ratings, workload analytics, difficulty scores — directly into the SIS registration portal. Students see the data they actually need without leaving the page they already use.',
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'Chrome Extension API', 'Manifest V3'],
    architecture: 'Spring Boot backend handles concurrent API calls to multiple data sources, normalizes and caches results in PostgreSQL to avoid redundant fetches during registration rush. The Chrome Extension uses a Manifest V3 service worker and content scripts to detect course card elements in the SIS DOM, query the backend, and inject enriched UI components in-place. Containerized with Docker for consistent local and deployed environments.',
    highlights: [
      'Chrome Extension built with Manifest V3 that injects enriched data directly into the live UVA SIS registration portal',
      'Concurrent Spring Boot backend aggregates professor and workload data from multiple external sources without blocking',
      'PostgreSQL caching layer prevents repeated external API calls during high-traffic registration windows',
      'Serves data relevant to 25,000+ UVA students each semester',
    ],
  },
  'aws-landing-zone': {
    title: 'AWS Landing Zone',
    github: 'https://github.com/AryanThodupunuri/aws-landing-zone',
    problem: 'Teams spinning up new AWS environments often copy-paste infra configs, skip security guardrails, or use ad-hoc IAM policies. The result is cloud environments that are hard to audit, expensive to fix after the fact, and inconsistent across projects.',
    solution: 'Created a modular, reusable Terraform-based AWS Landing Zone with automated security guardrails baked in by default. Includes opinionated VPC layout, IAM boundaries, CloudTrail logging, and a CI/CD pipeline that enforces plan-only validation via Terratest before any apply.',
    techStack: ['Terraform', 'AWS', 'HCL', 'Terratest', 'GitHub Actions', 'IAM', 'CloudTrail', 'VPC'],
    architecture: 'Terraform modules organized by domain: networking (VPC, subnets, route tables, NAT gateway), identity (IAM roles, permission boundaries, SCPs), and observability (CloudTrail, Config Rules, S3 log buckets). GitHub Actions pipeline runs `terraform fmt`, `terraform validate`, and Terratest Go tests on every PR. No merge allowed without clean plan output. Designed for reuse across multiple AWS accounts with environment-specific variable overrides.',
    highlights: [
      'Reusable Terraform modules for VPC, IAM, CloudTrail, and Config Rules with sane security defaults',
      'GitHub Actions CI pipeline enforces plan validation and Terratest-based integration checks before merge',
      'Permission boundaries and SCPs prevent privilege escalation even for admin-equivalent roles',
      'Environment-parameterized design supports dev/staging/prod account separation with minimal config changes',
    ],
  },
  'extreme-weather-classification': {
    title: 'Extreme Weather Classification',
    github: 'https://github.com/AryanThodupunuri/extreme-weather-classification',
    problem: 'Detecting extreme weather events from satellite imagery is a high-stakes computer vision problem where accuracy matters but model confidence alone is not enough. Black-box predictions are unusable for operational meteorology — you need to understand why a model flagged something as a hurricane or tornado.',
    solution: 'Developed an HPC-accelerated computer vision pipeline on UVA\'s Rivanna cluster comparing EfficientNetV2 and MobileNetV2 architectures, with Grad-CAM applied post-training to generate spatial activation maps that make model attention visible. Built end-to-end from data preprocessing through training through explainability visualization.',
    techStack: ['PyTorch', 'OpenCV', 'Python', 'Grad-CAM', 'EfficientNetV2', 'MobileNetV2', 'HPC / Rivanna', 'SLURM'],
    architecture: 'Data pipeline handles satellite image loading, normalization, and augmentation in PyTorch. Training runs distributed across Rivanna HPC nodes via SLURM job scripts. After training, Grad-CAM hooks are registered on the final convolutional layers of each architecture to generate class activation maps. Results are visualized as overlaid heatmaps on original imagery to verify the model is attending to meteorologically meaningful features (eye walls, spiral bands) rather than artifacts.',
    highlights: [
      'Trained on UVA Rivanna HPC cluster using SLURM for distributed job scheduling',
      'Compared EfficientNetV2 and MobileNetV2 architectures head-to-head on extreme weather classification accuracy',
      'Grad-CAM integration generates spatial heatmaps showing exactly which image regions drove each prediction',
      'Explainability layer makes model output interpretable for operational meteorology use cases',
    ],
  },
  'food-ordering-system': {
    title: 'Food Ordering System',
    github: 'https://github.com/AryanThodupunuri/food-ordering-system',
    problem: 'Monolithic food ordering backends break down under real load — a single slow DB query during checkout can block everything else. More importantly, distributed payment and inventory systems need reliable messaging guarantees: if a payment event gets lost between services, you either charge someone without fulfilling the order or fulfill it without getting paid.',
    solution: 'Implemented a microservices architecture with Domain-Driven Design principles and the Outbox Pattern to guarantee at-least-once event delivery across service boundaries. Kafka handles inter-service messaging with schema-controlled topics per domain, Docker Compose runs the full stack locally, and each service owns its own PostgreSQL schema.',
    techStack: ['Java', 'Spring Boot', 'Apache Kafka', 'Docker', 'PostgreSQL', 'Domain-Driven Design', 'Outbox Pattern'],
    architecture: 'Separate microservices for Order, Payment, Restaurant, and Customer domains, each with its own PostgreSQL schema. Services communicate exclusively via Kafka topics — no direct HTTP calls between domains. The Outbox Pattern ensures events are written atomically with business state changes (in the same DB transaction) before being published to Kafka, eliminating the dual-write problem. Docker Compose orchestrates Kafka, Zookeeper, and all service containers for a fully reproducible local dev environment.',
    highlights: [
      'Outbox Pattern eliminates the dual-write problem by committing events atomically with state changes before Kafka publish',
      'Domain-Driven Design: each bounded context (Order, Payment, Restaurant, Customer) owns its schema and emits typed domain events',
      'All inter-service communication runs through Kafka topics with no synchronous HTTP calls between domains',
      'Fully containerized with Docker Compose including Kafka, Zookeeper, and all services',
    ],
  },
  'course-picker': {
    title: 'Course Picker',
    problem: 'UVA students struggle to build optimal schedules due to complex prerequisites, time conflicts, and a lack of aggregate workload data across departments.',
    solution: 'Built a web application with conflict-detection algorithms and Python data pipelines to help students find and plan optimal course schedules with real workload context.',
    techStack: ['React', 'Tailwind CSS', 'Python', 'Pandas', 'AWS S3', 'CloudFront'],
    architecture: 'React frontend deployed statically on AWS S3 with CloudFront for CDN delivery. Python/Pandas pipelines process raw course catalog exports into normalized JSON data files. Custom scheduling algorithm performs constraint satisfaction across time blocks and prerequisite chains.',
    highlights: [
      'Conflict-detection algorithm handles overlapping time blocks and prerequisite chain validation',
      'Python/Pandas data pipeline normalizes raw course catalog exports into queryable JSON',
      'Deployed on AWS S3 + CloudFront for low-latency static delivery',
    ],
  },
  slacklite: {
    title: 'SlackLite',
    github: 'https://github.com/AryanThodupunuri/SlackLite',
    problem: 'Building a real-time messaging system exposes fundamental distributed systems problems: how do you push messages to connected clients without polling? How do you handle file uploads securely without storing large blobs in your primary database? How do you keep latency low as the number of open connections grows?',
    solution: 'Developed a full-featured messaging platform using WebSockets for bidirectional real-time communication, FastAPI for the async backend, MongoDB for flexible message and channel storage, and AWS S3 with pre-signed URLs for secure file uploads that never route through the application server.',
    techStack: ['React', 'FastAPI', 'MongoDB', 'WebSockets', 'AWS S3', 'Python'],
    architecture: 'FastAPI backend uses async WebSocket handlers to maintain persistent connections per user. Messages are fanned out to all active connections in a channel in real time. File uploads use pre-signed S3 URLs — the client uploads directly to S3 without the payload ever touching the API server. MongoDB stores channels, messages, and user metadata with a flexible document schema. React frontend manages WebSocket lifecycle and renders messages optimistically before server acknowledgment.',
    highlights: [
      'WebSocket fan-out delivers messages to all connected channel members in real time without polling',
      'Pre-signed S3 URLs let file uploads go directly to S3 without passing through the API server',
      'Async FastAPI backend handles many concurrent connections without thread-per-connection overhead',
      'Optimistic UI updates on the React frontend for snappy perceived performance',
    ],
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectDetails[id] : null;

  if (!project) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Project not found</p>
          <Link to="/projects" className="btn-primary">← Back to Projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Breadcrumb */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">{project.title}</h1>

        {project.github && (
          <div className="mb-8">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        )}

        <div className="space-y-10">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Problem</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.problem}</p>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Solution</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.solution}</p>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span key={tech} className="badge">{tech}</span>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Architecture</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.architecture}</p>
          </section>

          {project.highlights && project.highlights.length > 0 && (
            <>
              <div className="border-t border-gray-100 dark:border-gray-800" />
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;