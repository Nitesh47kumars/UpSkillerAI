{
  matchScore: 80,
  technicalQuestions: [
    {
      QUESTION: 'Describe the difference between `null` and `undefined` in JavaScript, and provide an example of when each might occur.',
      INTENTION: 'Assesses fundamental JavaScript knowledge and understanding of data types and their states. This is crucial for any web development role.',
      ANSWER: 'Null represents the intentional absence of any object value, whereas undefined means a variable has been declared but not yet assigned a value, or a function parameter was not provided. \n' +
        'Example `null`: `let obj = null;` (intentional assignment of no value). \n' +
        'Example `undefined`: `let x; console.log(x);` (variable declared but not assigned).'     
    },
    {
      QUESTION: 'Explain the concept of RESTful APIs. What are the key principles, and how does your banking system project utilize them?',        
      INTENTION: 'Evaluates understanding of backend architecture and API design, a core component of full-stack development. It also checks if the candidate can relate theoretical knowledge to practical experience.',
      ANSWER: 'REST (Representational State Transfer) is an architectural style for designing networked applications. Key principles include client-server, statelessness, cacheability, layered system, and uniform interface (using HTTP methods like GET, POST, PUT, DELETE). \n' +
        'In the banking system, RESTful APIs were used for creating accounts (POST), transferring funds (POST/PUT), and fetching transaction history (GET), all managed by Express.js.'
    },
    {
      QUESTION: "You've mentioned JWT authentication and Bcrypt password hashing. Can you walk me through the flow of how a user logs in and how JWT is generated and validated in your banking system?",
      INTENTION: 'Tests practical knowledge of security best practices in web applications, specifically authentication mechanisms. It assesses how the candidate implements and understands security concepts.',
      ANSWER: '1. User submits credentials (username/password) to the backend. \n' +
        "2. Backend verifies the password using Bcrypt by comparing the submitted password's hash with the stored hash. \n" +
        '3. If valid, the backend generates a JWT containing user information (e.g., user ID, role). \n' +
        '4. This JWT is sent back to the client. \n' +
        "5. Client stores the JWT (e.g., in localStorage/sessionStorage) and includes it in the 'Authorization' header for subsequent requests. \n" +
        "6. For protected routes, the backend verifies the JWT's signature and expiration. If valid, the request is processed; otherwise, it's rejected."
    },
    {
      QUESTION: "The job description mentions working with LLM features like prompting and basic RAG. Can you explain what Retrieval-Augmented Generation (RAG) is at a high level, and how it might be applied in a healthcare context like Leading Bird Company's?",
      INTENTION: "Assesses the candidate's grasp of AI concepts relevant to the role, even if their experience is basic. It checks their curiosity and ability to connect AI concepts to business applications.",
      ANSWER: "RAG is a technique that enhances the capabilities of large language models (LLMs) by providing them with external, up-to-date information before generating a response. It involves retrieving relevant documents or data from a knowledge base (e.g., a database or vector store) based on the user's query, and then feeding this retrieved information along with the original query to the LLM to generate a more informed and accurate answer.\n" +
        "In healthcare, RAG could be used to answer patient queries based on their medical records or to provide clinicians with summaries of the latest research relevant to a specific patient's condition, ensuring the AI's responses are grounded in factual, current data."
    }
  ],
  BehavioralQuestions: [
    {
      QUESTION: 'Describe a time you encountered a significant technical challenge in one of your projects. How did you approach it, and what was the outcome?',
      INTENTION: "Evaluates problem-solving skills, resilience, and the candidate's approach to overcoming obstacles. It helps understand their debugging process and learning agility.",
      ANSWER: 'Use the STAR method (Situation, Task, Action, Result). Detail the specific challenge (e.g., a complex bug, integration issue), the steps taken to diagnose and fix it (research, testing different solutions, seeking help if needed), and the final resolution and any lessons learned.'
    },
    {
      QUESTION: 'This internship involves working closely with senior engineers and potentially taking ownership of small modules. Can you give an example of a time you collaborated with others on a project, and how you ensured effective teamwork?',
      INTENTION: 'Assesses teamwork and collaboration skills, crucial for working in a team environment and learning from others. It checks their ability to communicate and contribute effectively.',
      ANSWER: 'Highlight a group project experience. Discuss communication methods used (e.g., regular check-ins, clear task assignments), how disagreements were resolved, how individual contributions fit into the larger project, and the overall success achieved through collaboration.'        
    },
    {
      QUESTION: 'The role requires fast learning and adapting to new technologies, including AI concepts. How do you typically approach learning a new technology or concept, and can you provide an example?',
      INTENTION: "Gauges the candidate's learning aptitude and proactiveness, essential for an intern role that involves exposure to new and advanced technologies like AI. It checks their self-directed learning strategies.",
      ANSWER: 'Explain your learning process: starting with fundamentals, hands-on practice (building small projects/examples), documentation review, seeking tutorials or courses, and applying the knowledge to solve specific problems. Use an example like learning React or Redux, or even a basic AI concept you explored.'
    }
  ],
  skillGap: [
    {
      skill: 'Generative AI / LLM Concepts (Prompting, RAG)',
      severity: 'medium'
    },
    { skill: 'TypeScript', severity: 'low' },    
    { skill: 'Python (Bonus)', severity: 'low' },
    { skill: 'Postgres / SQL (Basic)', severity: 'low' },
    { skill: 'Docker (Bonus)', severity: 'low' } 
  ],
  preparation: [
    {
      Day: '1',
      focus: 'Core JavaScript & Web Fundamentals',
      task: 'Review ES6+ features (arrow functions, promises, async/await), closures, `null` vs `undefined`, `==` vs `===`. Practice basic DOM manipulation and event handling.'
    },
    {
      Day: '2',
      focus: 'React.js Deep Dive',
      task: 'Understand React Hooks (useState, useEffect, useContext), component lifecycle, state management (briefly review Redux if comfortable, but focus on context API for simplicity). Practice building a small interactive component.'       
    },
    {
      Day: '3',
      focus: 'Node.js & Express.js APIs',        
      task: 'Review creating RESTful APIs, middleware, request/response objects. Practice building a simple CRUD API. Understand concepts like routing and handling different HTTP methods.'        
    },
    {
      Day: '4',
      focus: 'Databases & Authentication',       
      task: 'Refresh MongoDB/Mongoose basics. Understand JWT generation/validation and Bcrypt hashing flow. Review Postman usage for testing APIs.'
    },
    {
      Day: '5',
      focus: 'AI/LLM Concepts & Job Specifics',  
      task: 'Research basic Generative AI concepts, Prompt Engineering, and Retrieval-Augmented Generation (RAG). Understand how these apply to the healthcare domain described in the job. Briefly look into TypeScript fundamentals.'
    },
    {
      Day: '6',
      focus: 'Behavioral & Project Review',      
      task: 'Prepare STAR method answers for common behavioral questions (challenges, teamwork, learning). Review your projects (Banking System, Resumify, etc.) and be ready to discuss technical details and architectural decisions.'
    },
    {
      Day: '7',
      focus: 'Mock Interview & Refinement',      
      task: 'Conduct a mock interview covering technical and behavioral aspects. Identify weak areas and spend time reinforcing them. Refine your answers and ensure you can clearly articulate your experience and understanding.'
    }
  ]
}
