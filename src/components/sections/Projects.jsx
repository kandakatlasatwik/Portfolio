import React,{useState , useRef} from 'react';
import {projects,categories} from '../../data/projects';
import {Briefcase,Sparkles,Target,Globe,Palette,Zap,ChevronLeft,ChevronRight} from 'lucide-react';
import ProjectCard from '../ui/ProjectCard'
import FadeIn from '../animations/FadeIn';

const Projects = () => {
const [activeCategory , setActiveCategory] = useState('All');
const [currentIndex,setCurrentIndex]=useState(0);
const scrollContainerRef=useRef(null);

const filterProjects=activeCategory==='All'
? projects:projects.filter(project=>project.category===activeCategory);

//reset Carousel when category changes

const handleCategoryChange=(category)=>{
  setActiveCategory(category);
  setCurrentIndex(0);
  if(scrollContainerRef.current){

    scrollContainerRef.current.scrollTo({left:0,behaviour:'smooth'});

  }
};
const scrollToIndex=(index)=>{
  setCurrentIndex(index);
  if(scrollContainerRef.current){
    const container=scrollContainerRef.current;
    const cardWidth=container.offsetWidth/3;
    container.scrollTo({
      left:cardWidth*index,
      behavior:'smooth'
    });
  }
};
const nextSlide=()=>{
  const maxIndex=Math.max(0,filterProjects.length-3);
  const newIndex=Math.min(currentIndex+1,maxIndex);
  scrollToIndex(newIndex);
};
const prevSlide=()=>{
  const newIndex=Math.max(currentIndex-1,0);
  scrollToIndex(newIndex);
}

//Category icons mapping
const categoryIcons={
  'All':Target,
  'Web Apps':Globe,
  'Ai-Agents':Palette,
  'Full Stack':Zap,
};
  return (
    <section id="projects" className="">
      <div className="">
        <div className="" />
        <div className="" />
        <div className="" />
      </div>

      <div className="">
        <FadeIn delay={0}>
          <div className="">
            <div className="">
              <Briefcase className="" />
              <span className=""> My Work</span>
            </div>
            <h2 className="">
              Featured Projects
            </h2>
            <p className="">
              Showcasing my best work and Acheivements
            </p>
          </div>
        </FadeIn>

        {/* Category filter*/}
        <FadeIn delay={100}>
          <div classname="">
            {categories.map((category)=>(
              <button
              key={category}
              onClick={()=>handleCategoryChange(category)}
              className={`grouop relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory===category
                ? 'text-white'
               :'text-white/60 hover:text-white'}`}>
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${activeCategory===category
                  ?'bg-primary/10 opacity-100'
                  :'bg-white/5 border border-white/10'} `} />
                  <div className="">
                    {React.createElement(categoryIcons[category],{classname:"w-4 h-4"})}
                    <span className="">{category}</span>
                  </div>
                  {activeCategory===categroy &&(
                    <div className=""></div>
                  )}
               </button>
            ))}
          </div>
        </FadeIn>
        {/* Projects Carousel*/}
        <FadeIn delay={200}>
          <div className="">
            <div
            ref={scrollContainerRef}
            className="">
              <div className="">
                {filteredProjects.map((project,index)=>(
                  <div
                  key={project.id}
                  className="">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation Arrows*/}
            {filteredProjects.length > 3 &&(
              <>
              <button
              onClick={prevSlide}
              disabled={currentIndex===0}
              className=""
              aria-label="Previous projects"
              >
                <ChevronLeft className="" />
              </button>
              <button
              onClick={nextSlide}
              disabled={currentIndex>=filteredProjects.length-3}
              className=""
              aria-label="Next Projects">
                <ChevronRight className="" />
                
              </button>
              </>
            )}

            {/* Navigation Dots*/}
            {filteredProjects.length>3&&(
              <div className="">
                {Array.from({length:Math.max(0,filteredProjects.length-2)}).map((_,index)=>(
                  <button
                  key={index}
                  onClick={()=>scrollToIndex(index)}
                  classname={`transition-all duration-300 rounded-full ${index===currentIndex? 'bg-primary w-6 h-2' 
                    :'bg-white/30 w-2  h-2 hover:bg-white/50' 
                  }`}
                  aria-label={`Go to slide ${index + 1}`} />
                ))}
              </div>
            )}
          
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Projects
