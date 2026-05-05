

const Landing = () => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Hi, I'm Aryan Thodupunuri
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          SDE Intern @ Amazon Web Services (AWS) | CS @ UVA | Building with Java, Python & AWS
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://github.com/AryanThodupunuri" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            GitHub
          </a>
          <a href="https://linkedin.com/in/aryanthodupunuri" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            LinkedIn
          </a>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-4xl mx-auto">
          Hi, I'm Aryan. I'm a Computer Science student at UVA and an incoming Software Development Engineer (SDE) Intern at AWS. I specialize in distributed backend systems, cloud infrastructure, and building scalable applications that solve real problems for users.
          <br /><br />
          On my GitHub, you'll find a mix of cloud architecture, high-concurrency microservices, and machine learning pipelines. Some of my most impactful engineering work includes CourseCompass, a full-stack intelligence engine and chrome extension that serves the UVA community utilizing a high-concurrency Spring Boot API, and a modular AWS Landing Zone built entirely with Terraform and automated CI/CD guardrails. I've also built a Distributed Food Ordering System using Java, Kafka, and Docker with Domain-Driven Design.
          <br /><br />
          Beyond distributed systems, I have a strong background in data and AI. I engineered an HPC-Accelerated Weather Classification Pipeline using PyTorch and Rivanna HPC, leveraging Explainable AI (Grad-CAM) to validate model inferences. I'm always exploring new technologies and enjoy bridging the gap between complex backend architecture and seamless user experiences. Thanks for checking out my work!
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['Java', 'Spring Boot', 'Python', 'AWS', 'Terraform', 'Docker', 'Apache Kafka', 'PostgreSQL', 'PyTorch', 'React', 'Git'].map(skill => (
              <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <a
            href="/resume.pdf"
            download
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </main>
  );
};

export default Landing;