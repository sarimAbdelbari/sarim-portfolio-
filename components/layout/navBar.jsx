"use client";
import Container from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Navigation items with their corresponding section IDs
    const navItems = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Projects", id: "projects" },
        { name: "Blog", id: "blog" },
        { name: "Contact", id: "contact" }
    ];

    // Handle scroll effect and active section
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);

            // Determine active section based on scroll position
            const sections = navItems.map(item => item.id);
            const sectionElements = sections.map(id => document.getElementById(id));
            
            let currentSection = 'home';
            sectionElements.forEach((element, index) => {
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const sectionTop = rect.top + window.scrollY - 100; // Offset for navbar height
                    const sectionBottom = sectionTop + rect.height;
                    
                    if (offset >= sectionTop && offset < sectionBottom) {
                        currentSection = sections[index];
                    }
                }
            });
            
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        setIsOpen(false); // Close mobile menu
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full py-4 px-3 border-b z-50 transition-all duration-300 ${
                scrolled 
                    ? "bg-background/95 backdrop-blur-lg shadow-lg border-border/50" 
                    : "bg-background/80 backdrop-blur-sm border-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Container>
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        className="cursor-pointer"
                        onClick={() => scrollToSection('home')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3 className="font-bold text-xl md:text-2xl hover:text-primary duration-300 ease-in-out">
                            Sarim<span className="text-primary">Abdelbari</span>
                            <span className="text-muted-foreground text-sm ml-1">.dev</span>
                        </h3>
                    </motion.div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-8 justify-between items-center">
                        {navItems.map((item, index) => (
                            <motion.li 
                                key={item.id}
                                className="relative cursor-pointer"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                                onClick={() => scrollToSection(item.id)}
                            >
                                <span className={`
                                    font-medium text-sm uppercase tracking-wide transition-all duration-300
                                    ${activeSection === item.id 
                                        ? 'text-primary font-semibold' 
                                        : 'text-foreground hover:text-primary'
                                    }
                                `}>
                                    {item.name}
                                </span>
                                
                                {/* Active indicator */}
                                {activeSection === item.id && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                        layoutId="activeIndicator"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.li>
                        ))}
                        
                        {/* Theme Toggle */}
                        <motion.li
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="ml-4"
                        >
                            <ModeToggle />
                        </motion.li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="z-50"
                        >
                            <ModeToggle />
                        </motion.div>

                        <motion.button
                            className="flex flex-col justify-center items-center w-8 h-8 z-50 relative"
                            onClick={() => setIsOpen(!isOpen)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.span 
                                className="block h-0.5 w-6 bg-foreground rounded-sm absolute"
                                animate={{
                                    rotate: isOpen ? 45 : 0,
                                    y: isOpen ? 0 : -4
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span 
                                className="block h-0.5 w-6 bg-foreground rounded-sm absolute"
                                animate={{
                                    opacity: isOpen ? 0 : 1
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span 
                                className="block h-0.5 w-6 bg-foreground rounded-sm absolute"
                                animate={{
                                    rotate: isOpen ? -45 : 0,
                                    y: isOpen ? 0 : 4
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    <AnimatePresence>
                        {isOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsOpen(false)}
                                />
                                
                                {/* Menu Content */}
                                <motion.div
                                    className="fixed top-20 right-4 bg-background/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl p-6 z-40 md:hidden min-w-[200px]"
                                    initial={{ opacity: 0, scale: 0.9, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <motion.ul 
                                        className="flex flex-col gap-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {navItems.map((item, index) => (
                                            <motion.li 
                                                key={item.id}
                                                className="cursor-pointer group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    x: 0,
                                                    transition: { delay: index * 0.1 + 0.2 }
                                                }}
                                                whileHover={{ x: 5 }}
                                                onClick={() => scrollToSection(item.id)}
                                            >
                                                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200">
                                                    <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                                        activeSection === item.id ? 'bg-primary' : 'bg-muted-foreground/30'
                                                    }`} />
                                                    <span className={`font-medium transition-colors duration-200 ${
                                                        activeSection === item.id 
                                                            ? 'text-primary' 
                                                            : 'text-foreground group-hover:text-primary'
                                                    }`}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </motion.nav>
    );
};

export default NavBar;