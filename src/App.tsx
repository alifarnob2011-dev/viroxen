import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Search, 
  Terminal, 
  User, 
  Menu, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Activity,
  LogOut,
  LayoutDashboard,
  Settings,
  Mail,
  ExternalLink,
  CreditCard,
  FileText
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'Services', path: 'services' },
    { name: 'Tools', path: 'tools' },
    { name: 'Pricing', path: 'pricing' },
    { name: 'Contact', path: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-emerald-500" />
            <span className="text-xl font-bold tracking-tight">VIROXEN</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.path)}
                className="text-sm font-medium transition-colors hover:text-emerald-400 text-zinc-400 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
                <Link to="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 flex items-center">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <button onClick={onLogout} className="text-sm font-medium text-zinc-400 hover:text-red-400 flex items-center cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="ml-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all">
                Client Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-b border-white/5 absolute w-full"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => scrollToSection(link.path)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-zinc-400 hover:text-emerald-400"
                >
                  {link.name}
                </button>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-emerald-400">Dashboard</Link>
                  <button onClick={onLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-zinc-400 hover:text-red-400">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-emerald-500">Client Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-6 h-6 text-emerald-500" />
            <span className="text-lg font-bold tracking-tight">VIROXEN</span>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs">
            Advanced cybersecurity solutions for the modern enterprise. Protecting your digital assets with precision and integrity.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><Link to="/services" className="hover:text-emerald-400">Services</Link></li>
            <li><Link to="/tools" className="hover:text-emerald-400">Tools</Link></li>
            <li><Link to="/pricing" className="hover:text-emerald-400">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li><Link to="/legal" className="hover:text-emerald-400">Terms of Use</Link></li>
            <li><Link to="/legal" className="hover:text-emerald-400">Privacy Policy</Link></li>
            <li><Link to="/legal" className="hover:text-emerald-400">Legal Agreement</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-xs">
        &copy; {new Date().getFullYear()} Viroxen Cybersecurity. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => (
  <div id="home" className="pt-20">
    {/* Hero Section */}
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold tracking-wider uppercase mb-6">
            Next-Gen Security Operations
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Securing the <span className="text-gradient">Digital Frontier</span>
          </h1>
          <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
            Viroxen provides elite cybersecurity services and specialized tools to defend your infrastructure against evolving global threats.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center cursor-pointer">
              Request Security Audit <ChevronRight className="ml-2 w-4 h-4" />
            </button>
            <button onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/5 text-white font-semibold rounded-xl transition-all cursor-pointer">
              Explore Tools
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-16 border-y border-white/5 bg-white/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Threats Blocked', value: '2.4M+' },
            { label: 'Security Audits', value: '500+' },
            { label: 'Uptime Guarantee', value: '99.9%' },
            { label: 'Response Time', value: '< 1hr' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Viroxen?</h2>
          <p className="text-zinc-400">Engineered for resilience, designed for clarity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lock, title: 'Zero Trust Architecture', desc: 'Implementing strict identity verification for every person and device.' },
            { icon: Activity, title: 'Real-time Monitoring', desc: 'Continuous surveillance of your network perimeter for anomalies.' },
            { icon: Search, title: 'Deep OSINT Analysis', desc: 'Uncovering hidden vulnerabilities through advanced intelligence gathering.' },
          ].map((feat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 glass rounded-2xl border border-white/5"
            >
              <feat.icon className="w-10 h-10 text-emerald-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">{feat.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Services = () => (
  <div id="services" className="py-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">Professional security consulting and technical assessments tailored to your organization's needs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { 
            title: 'Website Security Audit', 
            icon: Shield, 
            desc: 'A comprehensive review of your web application architecture, code, and server configuration to identify potential entry points for attackers.',
            features: ['OWASP Top 10 Check', 'SSL/TLS Configuration', 'Server Hardening', 'Code Review']
          },
          { 
            title: 'Vulnerability Assessment', 
            icon: AlertTriangle, 
            desc: 'Systematic identification and classification of security holes in your network, systems, and applications.',
            features: ['Automated Scanning', 'Manual Verification', 'Risk Scoring', 'Remediation Roadmap']
          },
          { 
            title: 'Penetration Testing', 
            icon: Terminal, 
            desc: 'Simulated cyber attacks to test the strength of your defenses and identify exploitable vulnerabilities before real attackers do.',
            features: ['Black Box Testing', 'White Box Testing', 'Exploit Development', 'Detailed Reporting']
          },
          { 
            title: 'OSINT Investigations', 
            icon: Search, 
            desc: 'Open Source Intelligence gathering to map your digital footprint and identify sensitive information leaks.',
            features: ['Data Leak Detection', 'Social Engineering Risk', 'Asset Mapping', 'Threat Intelligence']
          },
        ].map((service, i) => (
          <div key={i} className="p-8 glass rounded-2xl border border-white/5 flex flex-col">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <service.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold">{service.title}</h3>
            </div>
            <p className="text-zinc-400 mb-8 flex-grow">{service.desc}</p>
            <ul className="space-y-3 mb-8">
              {service.features.map((f, j) => (
                <li key={j} className="flex items-center text-sm text-zinc-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 glass hover:bg-white/5 text-center rounded-xl font-medium transition-all cursor-pointer">
              Request Quote
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Tools = ({ user }: { user: any }) => {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        setTools(data);
        setLoading(false);
      });
  }, []);

  const handleRequest = async (toolId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    const res = await fetch('/api/tools/request', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ toolId })
    });
    if (res.ok) {
      alert('Request submitted successfully. Our team will review it.');
    }
  };

  return (
    <div id="tools" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Security Tools</h1>
          <p className="text-zinc-400">Specialized utilities for security professionals and system administrators.</p>
        </div>
        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading tools...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div key={tool.id} className="glass rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/5 bg-white/2">
                  <div className="flex justify-between items-start mb-4">
                    <Terminal className="w-8 h-8 text-emerald-500" />
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                      tool.is_paid ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400"
                    )}>
                      {tool.is_paid ? 'Premium' : 'Free'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{tool.name}</h3>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-zinc-500 text-sm mb-6">{tool.description}</p>
                  {tool.is_paid && (
                    <div className="flex items-center text-lg font-bold text-white mb-6">
                      <CreditCard className="w-5 h-5 mr-2 text-zinc-400" />
                      {tool.price}
                    </div>
                  )}
                </div>
                <div className="p-6 pt-0">
                  {tool.is_paid ? (
                    <button 
                      onClick={() => handleRequest(tool.id)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
                    >
                      Request Access
                    </button>
                  ) : (
                    <button className="w-full py-3 glass hover:bg-white/5 text-white rounded-xl font-medium transition-all">
                      Launch Tool
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Pricing = () => (
  <div id="pricing" className="py-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-zinc-400">Choose the plan that fits your security requirements.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'Starter', price: 'Free', desc: 'For individuals and small projects.', features: ['Basic Port Scanner', 'Network Utility Pack', 'Community Support', 'Public Documentation'] },
          { name: 'Professional', price: '$49', period: '/mo', desc: 'For growing companies and security teams.', features: ['Web Auditor Pro', 'Priority Support', 'Vulnerability Reports', 'API Access', 'Custom Scans'], popular: true },
          { name: 'Enterprise', price: 'Custom', desc: 'Full-scale security for large organizations.', features: ['Full OSINT Engine', 'Dedicated Security Lead', '24/7 Incident Response', 'On-premise Deployment', 'SLA Guarantees'] },
        ].map((plan, i) => (
          <div key={i} className={cn(
            "p-8 glass rounded-2xl border flex flex-col relative",
            plan.popular ? "border-emerald-500/50 scale-105 z-10" : "border-white/5"
          )}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full uppercase">Most Popular</span>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-zinc-500 text-sm mb-6">{plan.desc}</p>
            <div className="mb-8">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-zinc-500 ml-1">{plan.period}</span>}
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center text-sm text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className={cn(
              "w-full py-4 rounded-xl font-bold transition-all text-center cursor-pointer",
              plan.popular ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "glass hover:bg-white/5"
            )}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div id="contact" className="py-24 border-t border-white/5">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-zinc-400">Request a security audit or ask about our tools.</p>
      </div>
      <div className="glass p-8 rounded-2xl border border-white/5">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will contact you shortly.'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all" placeholder="John Doe" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all" placeholder="john@company.com" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Service Required</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all">
              <option>Security Audit</option>
              <option>Vulnerability Assessment</option>
              <option>Penetration Testing</option>
              <option>Tool Access</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
            <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all" placeholder="Tell us about your requirements..." required></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all">
            Send Message
          </button>
        </form>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="p-6 glass rounded-xl">
          <Mail className="w-6 h-6 text-emerald-500 mx-auto mb-4" />
          <h4 className="font-bold mb-2">Email Us</h4>
          <p className="text-sm text-zinc-500">support@viroxen.com</p>
        </div>
        <div className="p-6 glass rounded-xl">
          <Shield className="w-6 h-6 text-emerald-500 mx-auto mb-4" />
          <h4 className="font-bold mb-2">Secure Channel</h4>
          <p className="text-sm text-zinc-500">PGP Key: 0xVIROXEN...</p>
        </div>
      </div>
    </div>
  </div>
);

const MainPage = ({ user }: { user: any }) => (
  <>
    <Home />
    <Services />
    <Tools user={user} />
    <Pricing />
    <Contact />
  </>
);

const Legal = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Legal Information</h1>
      <div className="space-y-12 text-zinc-400">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Terms of Use</h2>
          <p className="mb-4">By accessing Viroxen's platform and tools, you agree to comply with all applicable local, state, and international laws. Our tools are provided for ethical security testing and educational purposes only.</p>
          <p>Unauthorized use of our tools against systems you do not own or have explicit written permission to test is strictly prohibited and may result in legal action.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Legal Agreement</h2>
          <div className="p-6 glass rounded-xl border border-white/5 bg-white/2">
            <p className="text-sm italic mb-4">"I hereby affirm that I will only use Viroxen tools for authorized security assessments. I understand that Viroxen is not responsible for any misuse or damage caused by the use of its software."</p>
            <p className="text-xs">Users must agree to this statement before being granted access to premium tools.</p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
          <p>We take your privacy seriously. We do not sell your data. We only collect information necessary to provide our services and manage tool access requests.</p>
        </section>
      </div>
    </div>
  </div>
);

const Login = ({ onLogin }: { onLogin: (user: any, token: string) => void }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      onLogin(data.user, data.token);
      navigate('/dashboard');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="pt-32 pb-24 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="glass p-8 rounded-2xl border border-white/5">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">{isSignup ? 'Create Account' : 'Client Login'}</h1>
            <p className="text-zinc-500 text-sm mt-2">{isSignup ? 'Join the Viroxen platform' : 'Access your security dashboard'}</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all" 
                placeholder="name@company.com" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-zinc-500 hover:text-emerald-400 transition-all"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user }: { user: any }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/requests', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      });
  }, []);

  if (!user) return <div className="pt-32 text-center">Please login to view dashboard.</div>;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.email.split('@')[0]}</h1>
            <p className="text-zinc-500">Manage your security tool access and audit requests.</p>
          </div>
          {user.role === 'admin' && (
            <Link to="/admin" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center">
              <Settings className="w-4 h-4 mr-2" /> Admin Panel
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-emerald-500" /> Tool Access Requests
              </h3>
              {loading ? (
                <div className="text-zinc-500">Loading requests...</div>
              ) : requests.length === 0 ? (
                <div className="text-zinc-500 py-4">No active requests. Explore tools to get started.</div>
              ) : (
                <div className="space-y-4">
                  {requests.map((req) => (
                    <div key={req.id} className="p-4 bg-white/2 border border-white/5 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold">{req.tool_name}</div>
                        <div className="text-xs text-zinc-500">{new Date(req.created_at).toLocaleDateString()}</div>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                        req.status === 'approved' ? "bg-emerald-500/10 text-emerald-400" :
                        req.status === 'rejected' ? "bg-red-500/10 text-red-400" :
                        "bg-zinc-500/10 text-zinc-400"
                      )}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-6">Account Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Role</span>
                  <span className="text-white font-mono uppercase">{user.role}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Subscription</span>
                  <span className="text-white">Free Tier</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Link to="/pricing" className="text-emerald-500 text-sm font-bold hover:underline">Upgrade Plan &rarr;</Link>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-6">Support</h3>
              <p className="text-sm text-zinc-500 mb-4">Need help with a tool or audit? Contact our security team.</p>
              <Link to="/contact" className="block w-full py-3 glass hover:bg-white/5 text-center rounded-xl text-sm font-bold transition-all">
                Open Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = ({ user }: { user: any }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
      const [reqRes, userRes] = await Promise.all([
        fetch('/api/admin/requests', { headers }),
        fetch('/api/admin/users', { headers })
      ]);
      setRequests(await reqRes.json());
      setUsers(await userRes.json());
      setLoading(false);
    };

    fetchData();
  }, [user, navigate]);

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    const res = await fetch(`/api/admin/requests/${id}/${action}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (res.ok) {
      setRequests(requests.map(r => r.id === id ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' } : r));
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-12">Admin Control Center</h1>
        
        <div className="grid grid-cols-1 gap-12">
          {/* Tool Requests */}
          <div className="glass p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" /> Pending Access Requests
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4 font-medium">User</th>
                    <th className="pb-4 font-medium">Tool</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b border-white/5">
                      <td className="py-4 text-zinc-300">{req.user_email}</td>
                      <td className="py-4 font-bold">{req.tool_name}</td>
                      <td className="py-4 text-zinc-500">{new Date(req.created_at).toLocaleDateString()}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold uppercase",
                          req.status === 'approved' ? "text-emerald-400" :
                          req.status === 'rejected' ? "text-red-400" :
                          "text-zinc-400"
                        )}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {req.status === 'pending' && (
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => handleAction(req.id, 'approve')} className="p-2 hover:bg-emerald-500/10 text-emerald-500 rounded-lg transition-all"><CheckCircle2 className="w-4 h-4" /></button>
                            <button onClick={() => handleAction(req.id, 'reject')} className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"><X className="w-4 h-4" /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Management */}
          <div className="glass p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <User className="w-5 h-5 mr-2 text-emerald-500" /> User Directory
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4 font-medium">Email</th>
                    <th className="pb-4 font-medium">Role</th>
                    <th className="pb-4 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5">
                      <td className="py-4 text-zinc-300">{u.email}</td>
                      <td className="py-4"><span className="font-mono uppercase text-xs px-2 py-1 bg-white/5 rounded">{u.role}</span></td>
                      <td className="py-4 text-zinc-500">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: any, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) return null;

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage user={user} />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/admin" element={<AdminPanel user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
