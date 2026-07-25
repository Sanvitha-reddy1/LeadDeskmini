import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="card-glass p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-brand-blue/10 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-all duration-500"></div>
      
      {/* Icon wrapper */}
      <div className="h-12 w-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
