"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutMe = () => {

// this is the informations use it 
// Education
//  Bachelor of Science in Computer Science
//  Universit´e Djillali Liabes, Sidi Bel Abb`es– Algeria
//  2020– 2023
//  • Curriculum focus: Algorithms, Data Structures, OOP, Web Development, Mobile Applications
//  • Capstone Project (17.5/20): Developed a LinkedIn-inspired networking platform for freelancers
//  and businesses using the MERN stack
//  • Earned academic distinction for practical implementation of software engineering principle

//   Full Stack Web Developer
//  Groupe Chiali– Algeria, On-site, Full-time
//  June 2024– Present
//  • Designed and implemented role-based permissions architecture for document access and editing
//  • Building scalable backend services and RESTful APIs with Node.js, Express, and MongoDB
//  • Collaborating with cross-functional teams to optimize user workflow and system performance
//  • Successfully addressing complex challenges in data security and document version control

  const educationData = [
    {
      title: "Bachelor's in Computer Science",
      institution: "Université Djillali Liabes, Sidi Bel Abbès • 2020-2023",
      accomplishments: [
        "Curriculum focus: Algorithms, Data Structures, OOP, Web Development, Mobile Applications",
        "Capstone Project (17.5/20): Developed a LinkedIn-inspired networking platform for freelancers and businesses using the MERN stack",
        "Earned academic distinction for practical implementation of software engineering principles"
      ]
    },
    {
      title: "Full Stack Web Developer",
      institution: "Groupe Chiali • June 2024 - Present",
      accomplishments: [
        "Designed and implemented role-based permissions architecture for document access and editing",
        "Building scalable backend services and RESTful APIs with Node.js, Express, and MongoDB",
        "Collaborating with cross-functional teams to optimize user workflow and system performance",
        "Successfully addressing complex challenges in data security and document version control"
      ]
    }
  ];


  // const educationData = [
  //   {
  //     title: "Bachelor's in Software Engineering",
  //     institution: "Tech Institute • 2018-2022",
  //     accomplishments: [
  //       "Core focus on Web Technologies and Database Design",
  //       "Dean's List for 6 consecutive semesters",
  //       "Completed internship at leading tech company"
  //     ]
  //   },
  //   {
  //     title: "Full-Stack Development Certification",
  //     institution: "Coding Bootcamp • 2023",
  //     accomplishments: [
  //       "Intensive 12-week program covering MERN stack",
  //       "Built 5 production-ready applications",
  //       "Mentored junior developers in the program"
  //     ]
  //   }
  // ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const zigzagVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section className="min-h-screen py-16 px-3 lg:px-10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Image and Decorative Elements */}
          <motion.div 
            className="flex flex-col items-center space-y-8"
            variants={itemVariants}
          >
            {/* Decorative Zigzag Line */}
            <motion.div className="w-20 h-24">
              <svg 
                width="80" 
                height="96" 
                viewBox="0 0 80 96" 
                className="text-primary"
                fill="none"
              >
                <motion.path
                  d="M10 10 L70 30 L10 50 L70 70 L10 90"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={zigzagVariants}
                />
              </svg>
            </motion.div>

            {/* Profile Image */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className=" h-64  md:h-80 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/assets/images/MeChilling.jpg" // Update with your image path
                  alt="Sarim Kerroucha"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority={false}
                  loading="eager"
                />
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="flex items-center space-x-6">
              <motion.div
                className="w-3 h-3 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-6 h-6 border-2 border-primary rotate-45"
                animate={{ rotate: [45, 135, 45] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            {/* Who am I Section */}
            <div className="space-y-6">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-foreground"
                variants={itemVariants}
              >
                Who am I?
              </motion.h2>
              
              <motion.p 
                className="text-base md:text-lg leading-relaxed text-muted-foreground"
                variants={itemVariants}
              >
                I'm a passionate Full-Stack Developer With Over 2 years of experience crafting 
                digital experiences that make a difference. My journey in web development began 
                with curiosity and has evolved into a deep expertise in modern technologies. 
                <span className="text-foreground font-medium"> React </span>,
                <span className="text-foreground font-medium"> Next.js </span>,
                and 
                <span className="text-foreground font-medium"> Node.js </span>,
                
                
                 bringing ideas to life through 
                clean code and innovative solutions.
              </motion.p>
            </div>

            {/* Education Section */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-foreground border-b-2 border-primary inline-block pb-2">
                Education & Experience
              </h3>

              <div className="space-y-8">
                {educationData.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-6 border-l-2 border-primary/30"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary rounded-full" />
                    
                    <div className="space-y-3">
                      <h4 className="text-lg md:text-xl font-bold text-foreground">
                        {edu.title}
                      </h4>
                      <p className="text-xs md:text-sm italic text-muted-foreground font-medium">
                        {edu.institution}
                      </p>
                      <ul className="space-y-2">
                        {edu.accomplishments.map((item, i) => (
                          <li key={i} className="flex items-start space-x-3 text-sm md:text-base text-muted-foreground">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

    
    
    </section>
  );
};

export default AboutMe;