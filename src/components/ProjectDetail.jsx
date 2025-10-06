import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { ArrowLeft, Github, ChevronRight } from "lucide-react";
import Swal from 'sweetalert2';

// This function checks if the GitHub link is private and shows an alert.
const handleGithubClick = (githubLink, event) => {
  if (!githubLink || githubLink === 'Private') {
    event.preventDefault(); // Prevent the link from opening
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Sorry, the source code for this project is private or not available.',
      confirmButtonText: 'Understood',
      confirmButtonColor: '#0ea5e9', // sky-500
      background: '#0f172a', // slate-800
      color: '#ffffff'
    });
  }
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setProject(data);
        } else {
          navigate('/#Portofolio');
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        navigate('/#Portofolio');
      }
    };

    if (id) {
        fetchProject();
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Background animations */}
      <div className="fixed inset-0 z-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8 md:mb-12 animate-fadeIn">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-800/50 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-white/50">
            <span>Projects</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90 truncate">{project.Title}</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col items-center text-center gap-8 md:gap-12">
          
          {/* Title */}
          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent leading-tight animate-slideInDown">
            {project.Title}
          </h1>

          {/* Description */}
          <p className="max-w-3xl text-base md:text-lg text-gray-300/90 leading-relaxed animate-fadeIn animation-delay-300">
            {project.Description}
          </p>

          {/* GitHub Button */}
          <div className="animate-fadeIn animation-delay-500">
             <a
              href={project.Github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleGithubClick(project.Github, e)}
              className="group relative inline-flex items-center justify-center space-x-2.5 px-8 py-4 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 hover:from-blue-600/20 hover:to-cyan-600/20 text-cyan-300 rounded-xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-xl overflow-hidden text-lg"
            >
              <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-cyan-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
              <Github className="relative w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="relative font-semibold">View on Github</span>
            </a>
          </div>

          {/* Project Image */}
          <div className="relative w-full max-w-4xl mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group animate-fadeIn animation-delay-700">
            <img
              src={project.Img}
              alt={project.Title}
              className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-cyan-500/20 transition-colors duration-300 rounded-2xl pointer-events-none" />
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slideInDown { animation: slideInDown 0.8s ease-out forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-700 { animation-delay: 0.7s; }

        [class*="animate-"] {
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;

