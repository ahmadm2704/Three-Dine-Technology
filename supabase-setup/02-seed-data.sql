-- Insert default admin user (password: admin123)
-- Note: You'll need to hash this password properly in production
INSERT INTO admin_users (email, password_hash, name, role) VALUES 
('admin@threedinetech.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'Admin User', 'super_admin');

-- Insert company stats
INSERT INTO company_stats (stat_name, stat_value, stat_label, display_order) VALUES 
('projects_completed', '50+', 'Projects Completed', 1),
('happy_clients', '25+', 'Happy Clients', 2),
('years_experience', '3+', 'Years Experience', 3),
('client_satisfaction', '99%', 'Client Satisfaction', 4);

-- Insert services
INSERT INTO services (title, description, features, technologies, icon, display_order) VALUES 
(
  'Web Development',
  'Modern, responsive websites and web applications built with cutting-edge technologies.',
  ARRAY['Responsive Design', 'SEO Optimization', 'Performance Optimization', 'Cross-browser Compatibility', 'Content Management Systems'],
  ARRAY['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js'],
  'Globe',
  1
),
(
  'Mobile App Development',
  'Native and cross-platform mobile applications for iOS and Android platforms.',
  ARRAY['Native iOS & Android Apps', 'Cross-platform Solutions', 'App Store Optimization', 'Push Notifications', 'Offline Functionality'],
  ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
  'Smartphone',
  2
),
(
  'Custom Software Development',
  'Tailored software solutions designed to meet your specific business requirements.',
  ARRAY['Business Process Automation', 'Custom CRM/ERP Systems', 'API Development', 'Third-party Integrations', 'Legacy System Modernization'],
  ARRAY['Python', 'Java', 'C#', '.NET', 'PHP'],
  'Code',
  3
),
(
  'Database Design & Management',
  'Scalable database architecture and optimization services for better performance.',
  ARRAY['Database Architecture', 'Performance Optimization', 'Data Migration', 'Backup & Recovery', 'Database Security'],
  ARRAY['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch'],
  'Database',
  4
),
(
  'Cloud Solutions',
  'Cloud infrastructure setup, migration, and management services.',
  ARRAY['Cloud Migration', 'Infrastructure as Code', 'Auto-scaling Solutions', 'Disaster Recovery', 'Cost Optimization'],
  ARRAY['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
  'Cloud',
  5
),
(
  'Cybersecurity',
  'Comprehensive security solutions to protect your digital assets and data.',
  ARRAY['Security Audits', 'Penetration Testing', 'Data Encryption', 'Access Control', 'Compliance Management'],
  ARRAY['SSL/TLS', 'OAuth', 'JWT', 'Firewall', 'VPN'],
  'Shield',
  6
);

-- Insert team members
INSERT INTO team_members (name, role, bio, skills, email, linkedin_url, github_url, display_order) VALUES 
(
  'Alex Johnson',
  'CEO & Founder',
  'Visionary leader with 8+ years in tech industry. Passionate about innovation and building scalable solutions.',
  ARRAY['Leadership', 'Strategy', 'Innovation', 'Business Development'],
  'alex@threedinetech.com',
  'https://linkedin.com/in/alexjohnson',
  'https://github.com/alexjohnson',
  1
),
(
  'Sarah Chen',
  'CTO & Co-Founder',
  'Full-stack architect with expertise in modern web technologies and cloud infrastructure.',
  ARRAY['React', 'Node.js', 'AWS', 'DevOps', 'System Architecture'],
  'sarah@threedinetech.com',
  'https://linkedin.com/in/sarahchen',
  'https://github.com/sarahchen',
  2
),
(
  'Michael Rodriguez',
  'Lead Developer',
  'Senior developer specializing in frontend technologies and user experience design.',
  ARRAY['React', 'TypeScript', 'UI/UX', 'Next.js', 'Frontend Architecture'],
  'michael@threedinetech.com',
  'https://linkedin.com/in/michaelrodriguez',
  'https://github.com/michaelrodriguez',
  3
),
(
  'Emily Davis',
  'Mobile App Developer',
  'Mobile development expert with experience in both native and cross-platform solutions.',
  ARRAY['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI/UX'],
  'emily@threedinetech.com',
  'https://linkedin.com/in/emilydavis',
  'https://github.com/emilydavis',
  4
),
(
  'David Kim',
  'Backend Developer',
  'Backend specialist focused on scalable APIs, databases, and cloud architecture.',
  ARRAY['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'API Design'],
  'david@threedinetech.com',
  'https://linkedin.com/in/davidkim',
  'https://github.com/davidkim',
  5
),
(
  'Lisa Thompson',
  'UI/UX Designer',
  'Creative designer passionate about creating intuitive and beautiful user experiences.',
  ARRAY['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
  'lisa@threedinetech.com',
  'https://linkedin.com/in/lisathompson',
  'https://twitter.com/lisathompson',
  6
);

-- Insert sample projects
INSERT INTO projects (name, client_name, client_email, description, status, project_type, budget, start_date, completion_percentage, technologies, is_featured, is_public) VALUES 
(
  'E-commerce Platform',
  'TechCorp Inc.',
  'contact@techcorp.com',
  'Modern e-commerce platform with advanced features including inventory management, payment processing, and analytics dashboard.',
  'in_progress',
  'Web Development',
  25000.00,
  '2024-01-15',
  75,
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
  true,
  true
),
(
  'Mobile Banking App',
  'FinanceFirst',
  'info@financefirst.com',
  'Secure mobile banking application with biometric authentication, real-time transactions, and financial analytics.',
  'completed',
  'Mobile App',
  45000.00,
  '2023-11-20',
  100,
  ARRAY['React Native', 'Node.js', 'MongoDB', 'JWT', 'Biometric Auth'],
  true,
  true
),
(
  'Inventory Management System',
  'RetailMax',
  'admin@retailmax.com',
  'Comprehensive inventory management system with real-time tracking, automated reordering, and detailed reporting.',
  'in_progress',
  'Custom Software',
  35000.00,
  '2024-02-01',
  60,
  ARRAY['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
  true,
  true
),
(
  'Healthcare Portal',
  'MedCare Solutions',
  'contact@medcare.com',
  'Patient management portal with appointment scheduling, medical records, and telemedicine capabilities.',
  'on_hold',
  'Web Development',
  50000.00,
  '2024-01-30',
  30,
  ARRAY['React', 'Node.js', 'MongoDB', 'WebRTC', 'HIPAA Compliance'],
  false,
  false
),
(
  'Restaurant Management App',
  'FoodieChain',
  'tech@foodiechain.com',
  'Complete restaurant management solution with POS integration, inventory tracking, and customer loyalty program.',
  'completed',
  'Mobile App',
  30000.00,
  '2023-10-15',
  100,
  ARRAY['Flutter', 'Firebase', 'Stripe', 'Push Notifications'],
  true,
  true
),
(
  'Learning Management System',
  'EduTech Solutions',
  'info@edutech.com',
  'Online learning platform with course management, video streaming, assessments, and progress tracking.',
  'completed',
  'Web Development',
  40000.00,
  '2023-09-01',
  100,
  ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'AWS S3', 'Video Streaming'],
  true,
  true
);

-- Insert blog posts
INSERT INTO blog_posts (title, excerpt, content, author, tags, is_published) VALUES 
(
  'The Future of Web Development in 2024',
  'Exploring the latest trends and technologies shaping the future of web development.',
  'Web development continues to evolve at a rapid pace. In 2024, we''re seeing exciting developments in areas like AI integration, serverless architecture, and progressive web apps. This comprehensive guide explores the key trends that will shape the industry this year.

## Key Trends to Watch

### 1. AI-Powered Development Tools
Artificial intelligence is revolutionizing how we write code. From GitHub Copilot to ChatGPT, developers now have powerful AI assistants that can help with everything from debugging to generating entire functions.

### 2. Serverless Architecture
Serverless computing continues to gain traction, allowing developers to focus on code rather than infrastructure management. Platforms like Vercel, Netlify, and AWS Lambda are making it easier than ever to deploy scalable applications.

### 3. Progressive Web Apps (PWAs)
PWAs are bridging the gap between web and mobile applications, offering native-like experiences while maintaining the accessibility of web technologies.

## Conclusion

The future of web development is bright, with new technologies and methodologies emerging to solve complex problems and improve user experiences.',
  'Sarah Chen',
  ARRAY['Web Development', 'Technology', 'Trends', '2024'],
  true
),
(
  'Building Scalable Mobile Applications',
  'Best practices for creating mobile apps that can grow with your business.',
  'Scalability is crucial when building mobile applications. Here are the key considerations and best practices we follow at Three Dine Technology to ensure our mobile apps can handle growth and evolving requirements.

## Architecture Considerations

### 1. Modular Design
Breaking your app into modular components makes it easier to maintain and scale. Each module should have a single responsibility and clear interfaces.

### 2. State Management
Proper state management is essential for scalable apps. Consider using solutions like Redux, MobX, or built-in state management depending on your framework.

### 3. API Design
Design your APIs with scalability in mind. Use RESTful principles, implement proper caching, and consider GraphQL for complex data requirements.

## Performance Optimization

### 1. Lazy Loading
Implement lazy loading for components and data to improve initial load times and reduce memory usage.

### 2. Image Optimization
Optimize images for different screen densities and implement progressive loading for better user experience.

### 3. Caching Strategies
Implement effective caching strategies for both data and assets to reduce network requests and improve performance.

## Conclusion

Building scalable mobile applications requires careful planning and adherence to best practices. By following these guidelines, you can create apps that grow with your business.',
  'Emily Davis',
  ARRAY['Mobile Development', 'Scalability', 'Best Practices', 'Performance'],
  true
),
(
  'Cybersecurity in the Digital Age',
  'Essential security measures every business should implement.',
  'As cyber threats continue to evolve, businesses must stay ahead of potential security risks. This comprehensive guide covers the essential security measures that every organization should implement to protect their digital assets.

## Common Security Threats

### 1. Phishing Attacks
Phishing remains one of the most common attack vectors. Educate your team about recognizing suspicious emails and implement email filtering solutions.

### 2. Ransomware
Ransomware attacks can cripple businesses. Regular backups and employee training are your best defenses.

### 3. Data Breaches
Protecting sensitive data should be a top priority. Implement encryption, access controls, and regular security audits.

## Essential Security Measures

### 1. Multi-Factor Authentication (MFA)
Implement MFA across all systems to add an extra layer of security beyond passwords.

### 2. Regular Security Updates
Keep all software and systems updated with the latest security patches.

### 3. Employee Training
Regular security awareness training helps employees recognize and respond to threats appropriately.

### 4. Network Security
Implement firewalls, intrusion detection systems, and network segmentation to protect your infrastructure.

## Compliance and Regulations

Stay compliant with relevant regulations such as GDPR, HIPAA, or PCI DSS depending on your industry.

## Conclusion

Cybersecurity is not a one-time implementation but an ongoing process. Regular assessments and updates to your security posture are essential for protecting your business in the digital age.',
  'David Kim',
  ARRAY['Cybersecurity', 'Business', 'Security', 'Data Protection'],
  true
);

-- Insert testimonials
INSERT INTO testimonials (client_name, client_position, client_company, testimonial, rating, is_featured, is_active) VALUES 
(
  'John Smith',
  'CEO',
  'TechCorp Inc.',
  'Three Dine Technology delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding. The team was professional, responsive, and delivered on time and within budget.',
  5,
  true,
  true
),
(
  'Maria Garcia',
  'CTO',
  'FinanceFirst',
  'The mobile banking app they developed for us is secure, user-friendly, and has received excellent feedback from our customers. The development process was smooth, and they provided great support throughout. Highly recommended!',
  5,
  true,
  true
),
(
  'Robert Johnson',
  'Operations Manager',
  'RetailMax',
  'Their inventory management system has streamlined our operations significantly. The real-time tracking and automated features have saved us countless hours. The team was professional and delivered exactly what we needed.',
  5,
  true,
  true
),
(
  'Jennifer Lee',
  'Marketing Director',
  'EduTech Solutions',
  'The learning management system they built for us has transformed how we deliver online education. The platform is intuitive, scalable, and our students love it. Great work from the Three Dine Technology team!',
  5,
  true,
  true
);
