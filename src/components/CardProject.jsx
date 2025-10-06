import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  
  // This shortens the description to prevent cards from becoming too tall
  const truncatedDescription = Description.length > 90 
    ? Description.substring(0, 90) + '...' 
    : Description;

  return (
    <div className="group relative w-full h-full">
      {/* Card container with updated background and border effects */}
      <div className="relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10 flex flex-col h-full">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-48 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Text content section */}
          <div className="mt-4 space-y-3 flex-grow flex flex-col">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {Title}
            </h3>
            
            <p className="text-gray-300/80 text-sm leading-relaxed flex-grow">
              {truncatedDescription}
            </p>
            
            {/* Card Footer with buttons */}
            <div className="pt-4 flex items-center justify-between">
              
              {/* This will only render the Live Demo link if ProjectLink exists */}
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                // This empty div ensures the "Details" button stays on the right
                <div />
              )}
              
              {/* Details Button */}
              {id && (
                <Link
                  to={`/project/${id}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;

