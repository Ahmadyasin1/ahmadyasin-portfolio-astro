import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isBot: boolean;
}

const predefinedResponses = {
  greetings: [
    "Hello! I'm Ahmad's AI assistant. How can I help you today?",
    "Hi there! I'd be happy to tell you more about Ahmad's work and expertise.",
    "Welcome! Looking to learn more about Ahmad's projects?"
  ],
  skills: [
    "Ahmad specializes in AI/ML, Full Stack Development, and Cloud Architecture. Would you like to know more about any specific area?",
    "Ahmad's expertise includes TensorFlow, React, Node.js, and Cloud platforms. What would you like to learn more about?"
  ],
  projects: [
    "Ahmad has worked on several cutting-edge projects including Neural Network Visualizers and Quantum ML Platforms. Would you like specific details about any project?",
    "I can tell you about Ahmad's work in AI, Web Development, or Cloud Architecture. Which interests you?"
  ],
  contact: [
    "You can reach Ahmad via email at contact@ahmadyasin.dev or connect on LinkedIn. Would you like the direct links?",
    "The best way to contact Ahmad is through email or LinkedIn. Shall I provide you with the contact information?"
  ],
  default: [
    "I understand you're interested in learning more. Could you please specify what aspect of Ahmad's work you'd like to know about?",
    "I'd be happy to help you learn more about Ahmad's expertise. What specific information are you looking for?"
  ]
};

function getBotResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
    return predefinedResponses.greetings[Math.floor(Math.random() * predefinedResponses.greetings.length)];
  }
  
  if (lowerInput.includes('skill') || lowerInput.includes('expertise') || lowerInput.includes('technology')) {
    return predefinedResponses.skills[Math.floor(Math.random() * predefinedResponses.skills.length)];
  }
  
  if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
    return predefinedResponses.projects[Math.floor(Math.random() * predefinedResponses.projects.length)];
  }
  
  if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
    return predefinedResponses.contact[Math.floor(Math.random() * predefinedResponses.contact.length)];
  }
  
  return predefinedResponses.default[Math.floor(Math.random() * predefinedResponses.default.length)];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: predefinedResponses.greetings[0], isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const chatbotVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 100,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-cyber-blue cyber-button flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-2xl">{isOpen ? '×' : '💬'}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatbotVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-cyber-dark cyber-border rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <motion.div 
              className="p-4 border-b border-cyber-blue/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-orbitron text-cyber-blue flex items-center">
                <motion.span 
                  className="mr-2"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  🤖
                </motion.span> 
                AI Assistant
              </h3>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.isBot ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-cyber-blue/10 text-cyber-light'
                        : 'bg-cyber-purple/10 text-cyber-light'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-cyber-blue/10 text-cyber-light p-3 rounded-lg">
                    <span className="inline-flex gap-1">
                      <motion.span
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      >
                        .
                      </motion.span>
                      <motion.span
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      >
                        .
                      </motion.span>
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="p-4 border-t border-cyber-blue/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-cyber-dark border border-cyber-blue/20 rounded-lg px-4 py-2 text-cyber-light focus:outline-none focus:border-cyber-blue transition-colors"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="cyber-button px-4 py-2 rounded-lg text-cyber-blue font-orbitron disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}