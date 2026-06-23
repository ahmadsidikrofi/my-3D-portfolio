export const skills = [
    {
        imageUrl: '/assets/icons/html.svg',
        name: 'HTML',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/css.svg',
        name: 'CSS',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/javascript.svg',
        name: 'JavaScript',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/typescript.svg',
        name: 'TypeScript',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/react.svg',
        name: 'React',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/nextjs.svg',
        name: 'Next.js',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/nodejs.svg',
        name: 'Node.js',
        type: 'Backend',
    },
    {
        imageUrl: '/assets/icons/express.svg',
        name: 'Express',
        type: 'Backend',
    },
    {
        imageUrl: '/assets/icons/mongodb.svg',
        name: 'MongoDB',
        type: 'Database',
    },
    {
        imageUrl: '/assets/icons/redux.svg',
        name: 'Redux',
        type: 'State Management',
    },
    {
        imageUrl: '/assets/icons/tailwindcss.svg',
        name: 'Tailwind CSS',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/git.svg',
        name: 'Git',
        type: 'Version Control',
    },
    {
        imageUrl: '/assets/icons/github.svg',
        name: 'GitHub',
        type: 'Version Control',
    },
    {
        imageUrl: '/assets/icons/motion.svg',
        name: 'Motion',
        type: 'Animation',
    },
    {
        imageUrl: '/assets/icons/mui.svg',
        name: 'Material-UI',
        type: 'Frontend',
    },
    {
        imageUrl: '/assets/icons/sass.svg',
        name: 'Sass',
        type: 'Frontend',
    },
]

export const experiences = [
    {
        title: 'Software Engineer',
        company_name: 'Telkom University',
        icon: '/assets/images/telkom-university.webp',
        iconBg: '#fecaca',
        date: 'Aug 2025 - Present',
        points: [
            'Designed and developed MIRA, an embedded web platform and AI-powered WhatsApp bot to automate academic administration and operational workflows.',
            'Devised a scalable scheduling system with an interactive drag-and-drop calendar and real-time conflict detection algorithms.',
            'Developed a dynamic contract management engine automating quarterly KPI calculations, reducing manual processing time by approximately 30–40%.',
            'Refactored backend architecture into modular services, improving system maintainability and enabling faster feature iteration.'
        ],
    },
    {
        title: 'AI Engineer',
        company_name: 'M&A Associates Orthodontics',
        icon: '/assets/images/orthonova.png',
        iconBg: '#bae6fd',
        date: 'Feb 2025 - Sep 2025',
        points: [
            'Architected an AI-powered conversational assistant using Google Gemini to support patient communication and clinical operations.',
            'Built a natural language search system leveraging LangChain SQL Agent, reducing complex patient data retrieval time by 40%.',
            'Engineered a Retrieval-Augmented Generation (RAG) pipeline to summarize clinical conversations, reducing manual input by over 50%.',
            'Unified structured database and unstructured conversation data through context-aware system design to enhance AI response accuracy.'
        ],
    },
    {
        title: 'Backend Engineer',
        company_name: 'masJUBEL',
        icon: '/assets/images/masjubel.png',
        iconBg: '#fef9c3',
        date: 'Mar 2026 - May 2026',
        points: [
            'Developed an automated web scraping engine using Express.js and ScraperAPI to extract daily gold prices from 4 major providers (Antam, UBS, Hrta, Sampoerna).',
            'Engineered a robust MySQL database architecture to store, track, and manage historical gold price fluctuations securely.',
            'Built 3 core REST APIs providing comprehensive data aggregation, 7-day market trends, and real-time highlighted price comparisons (up/down indicators).',
            'Implemented a reliable Cron scheduler running daily at 10 AM to autonomously trigger scraping workflows and ensure data accuracy.'
        ],
    },
    {
        title: 'Fullstack Developer',
        company_name: 'Icommits IT Consultant',
        icon: '/assets/images/icommits.png',
        iconBg: '#a7f3d0',
        date: 'Jun 2023 - Oct 2023',
        points: [
            'Created and developed a custom Content Management System (CMS) using Laravel to enable dynamic website content management.',
            'Deployed a web hosting landing platform featuring multiple customizable pages powered by the internal CMS.',
            'Enabled dynamic page generation features, allowing users to create and manage pages with custom headers, text, and media intuitively.',
            'Collaborated with the internal IT team to troubleshoot and resolve system issues, ensuring stable and reliable website functionality.'
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: '/assets/icons/contact.svg',
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: '/assets/icons/github.svg',
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: '/assets/icons/linkedin.svg',
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: '/assets/images/1st-rofi-portfolio.jpeg',
        theme: 'bg-[#1A1A1A]',
        name: "Rofi's 1st Portfolio",
        category: "Terminal's-Like Portfolio",
        description: 'A fully interactive, terminal-inspired portfolio powered by Google Gemini 2.5 Flash. It replaces the traditional scrolling experience with a functional command-line interface, allowing visitors to execute commands or chat directly with an AI assistant to explore my technical background.',
        link: 'https://rofi-portfolio.vercel.app/',
        github: 'https://github.com/ahmadsidikrofi/my-portfolio',
    },
    {
        iconUrl: '/assets/images/permakin.webp',
        theme: 'bg-[#00FF99]',
        name: 'Permak.in',
        category: 'AI PLATFORM',
        description: 'An AI-driven sustainable fashion platform built with Next.js and Imagen 4. Designed to combat fast-fashion waste, it instantly detects clothing damage, generates DIY mending guides, drafts tailor instructions, and visualizes creative upcycling concepts for old garments.',
        link: 'https://permakin-135193409051.asia-southeast2.run.app/',
        github: 'https://github.com/ahmadsidikrofi/juara-vibe-coding-project',
    },
    {
        iconUrl: '/assets/images/amalin.webp',
        theme: 'bg-[#047857]',
        name: 'Amal.in',
        category: 'PWA / PRODUCTIVITY',
        description: 'A privacy-first Progressive Web App (PWA) designed as a comprehensive Ramadan worship tracker. It consolidates scattered spiritual tools into a single, distraction-free environment with a premium glassmorphism UI, operating entirely without intrusive ads or background tracking.',
        link: 'https://amalin.vercel.app/',
        github: 'https://github.com/ahmadsidikrofi/ramadan-tracker',
    },
    {
        iconUrl: '/assets/images/resumind.webp',
        theme: 'bg-[#2563EB]',
        name: 'Resumind',
        category: 'SAAS / AI',
        description: 'An AI-powered SaaS platform that transforms the tedious process of resume building into a real-time, interactive experience. It tackles formatting inconsistencies and writer\'s block by utilizing AI to draft professional summaries and industry-specific work achievements.',
        link: 'http://resumind-resume-builder.vercel.app/',
        github: 'https://github.com/ahmadsidikrofi/ai-resume-builder',
    },
    {
        iconUrl: '/assets/images/converto.webp',
        theme: 'bg-[#9333EA]',
        name: 'Converto',
        category: 'WEB APP / UTILITY',
        description: 'A limitless, browser-based multimedia converter for image, audio, and video files. Engineered with privacy at its core, it leverages WebAssembly and FFmpeg to process all files locally on the client side—meaning zero server uploads, no data retention, and absolute security.',
        link: 'https://converto-bay.vercel.app/',
        github: 'https://github.com/ahmadsidikrofi/converto',
    },
];