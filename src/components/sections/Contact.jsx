import React,{useState} from 'react';
import {Mail , MapPin, Github , Linkedin, Twitter ,Send,MessageSquare} from 'lucide-react';
import {PERSONAL_INFO , SOCIAL_LINKS} from '../../utils/constants';
import FadeIn from '../animations/FadeIn';
const Contact = () => {

    const[formData,setFormData]=useState({
        name:'',
        email:'',
        message:''
    });
    const [status,setStatus]=useState({type:'',message:''});
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message){
            setStatus({type:'error',message:'Please fill the form'});
            return;
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)){
            setStatus({type:'error',message:'please Enter a valid email'});
            return;
        }
        const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT;
        if (!endpoint){
            setStatus({type:'error',message:'Missing Google Sheets endpoint'});
            return;
        }

        try {
            // Use URLSearchParams to avoid CORS preflight
            const params = new URLSearchParams({
                name: formData.name,
                email: formData.email,
                message: formData.message,
                timestamp: new Date().toISOString()
            });

            const response = await fetch(endpoint, {
                method: 'POST',
                body: params
            });

            const result = await response.json().catch(() => ({}));
            if (!response.ok || result?.success === false){
                throw new Error(result?.message || 'Failed to send message');
            }

            setStatus({type:'success',message:'Message sent successfully. I\'ll get back to you soon.' });
            setFormData({name:'',email:'',message:''});
            setTimeout(()=>setStatus({type:'',message:''}),5000);
        } catch (error){
            setStatus({type:'error',message: error?.message || 'Something went wrong'});
        }
    };
    const socialIcons={
        github:Github,
        linkedin:Linkedin,
        twitter:Twitter,

    };


  return (
   <section id="contact" className="relative py-10 bg-black overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
        <div  className="absolute top-1/4 left-1/4 w-96 bg-primary/20 opacity-30 rounded-full blur-3xl" />
        <div  className="absolute bottom-1/4 right-1/4 w-96 bg-primary/20 opacity-30 rounded-full blur-3xl" />
        <div  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-96 bg-primary/10 opacity-30 rounded-full blur-3xl" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0}>
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                    <MessageSquare className=" w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium tracking-wider uppercase"> Get In Touch</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
                    Let's Work in Together
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    Have a Project in mind? Let's Disscuss how we  can bring your ideas to life. 
                </p>
            </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-12 mt-4">
            <FadeIn delay={100}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 ">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                            <input type="text" id="name"
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                             placeholder="your name" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <input type="email"
                            id="email"
                            name="email"
                            value={formData.email} 
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                            placeholder='your.email@example.com'/>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                            <textarea name="message" id="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                            rows={5}
                            placeholder='tell me about your project'></textarea>
                        </div>
                        <button type="submit" className="w-full px-6 py-3 bg-linear-to-r from-primary/10 to-primary text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group">
                            <span> Send Message</span>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        {status.message && (
                            <div className={`p-4 rounded-xl ${status.type === 'success'
                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                                {status.message}
                            </div>
                        )}
                    </form> 
                </div>
            </FadeIn>
            <FadeIn delay={200}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-6">Connect With Me</h3>
                        <p className="text-white/60 mb-8">
                            Feel free to reach out for collaborations or just a friendly chat!
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-all duration-300">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-white/80 mb-1">Email</h4>
                                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-primary transition-colors duration-300">
                                    {PERSONAL_INFO.email}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-all duration-300">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-white/80 mb-1">Location</h4>
                                <p className="text-white">{PERSONAL_INFO.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.github && (
                                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" 
                                   className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
                                    <Github className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300" />
                                </a>
                            )}
                            {SOCIAL_LINKS.linkedIn && (
                                <a href={SOCIAL_LINKS.linkedIn} target="_blank" rel="noopener noreferrer" 
                                   className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
                                    <Linkedin className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300" />
                                </a>
                            )}
                            {SOCIAL_LINKS.twitter && (
                                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" 
                                   className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
                                    <Twitter className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    </div>
   </section>
  )
}

export default Contact
