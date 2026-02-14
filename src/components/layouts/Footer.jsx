import React from 'react'
import {Github, Linkedin, Twitter, Mail, MapPin} from 'lucide-react'
import {PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS} from '../../utils/constants'

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 bg-primary/10 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 bg-primary/10 opacity-30 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{PERSONAL_INFO.name}</h3>
            <p className="text-white/60">{PERSONAL_INFO.title}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Connect</h4>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              )}
              {SOCIAL_LINKS.linkedIn && (
                <a
                  href={SOCIAL_LINKS.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              )}
              {SOCIAL_LINKS.twitter && (
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">Copyright {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  )
}

export default Footer
