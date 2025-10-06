import React from 'react';
import { Building, Calendar } from 'lucide-react';

const ExperienceCard = ({ img, title, company, duration, description }) => {
  return (
    <div 
      className="flex flex-col sm:flex-row items-start w-full gap-6 p-6 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      data-aos="fade-up"
    >
      {/* Company Logo */}
      <div className="flex-shrink-0 w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center border border-white/10">
        <img src={img} alt={`${company} logo`} className="w-10 h-10 object-contain" />
      </div>
      
      {/* Experience Details */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mt-1 mb-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{duration}</span>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExperienceCard;

