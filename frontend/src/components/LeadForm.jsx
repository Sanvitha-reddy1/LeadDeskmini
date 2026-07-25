import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    project_type: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    if (!formData.project_type) {
      newErrors.project_type = 'Please select a project type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await axios.post(`${apiUrl}/api/leads`, formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        project_type: '',
        message: ''
      });
    } catch (err) {
      console.error('API submission error:', err);
      setServerError(
        err.response?.data?.error || 
        'Something went wrong. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-glass p-8 md:p-10 rounded-3xl relative overflow-hidden">
      {success ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="h-16 w-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
          <p className="text-slate-400 max-w-md mb-8">
            Thank you for reaching out to LeadDeskmini. Our solution architects will review your requirements and get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full bg-[#070b13]/85 border ${
                  errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-brand-blue'
                } rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Work Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className={`w-full bg-[#070b13]/85 border ${
                  errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-brand-blue'
                } rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
                className="w-full bg-[#070b13]/85 border border-slate-800 focus:border-brand-blue rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all"
              />
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">Project Budget *</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full bg-[#070b13]/85 border ${
                  errors.budget ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-brand-blue'
                } rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all`}
              >
                <option value="">Select a range</option>
                <option value="< $5,000">Less than $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000+">$50,000+</option>
              </select>
              {errors.budget && <p className="text-red-400 text-xs mt-1.5">{errors.budget}</p>}
            </div>

            {/* Project Type */}
            <div className="md:col-span-2">
              <label htmlFor="project_type" className="block text-sm font-medium text-slate-300 mb-2">Project Type *</label>
              <select
                id="project_type"
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                className={`w-full bg-[#070b13]/85 border ${
                  errors.project_type ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-brand-blue'
                } rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all`}
              >
                <option value="">Select a service category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="AI Solutions">AI Solutions</option>
                <option value="Cloud Solutions">Cloud Solutions</option>
                <option value="Digital Transformation">Digital Transformation</option>
                <option value="Other">Other / General Inquiry</option>
              </select>
              {errors.project_type && <p className="text-red-400 text-xs mt-1.5">{errors.project_type}</p>}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Project Details</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your project goals, timelines, and requirements..."
                className="w-full bg-[#070b13]/85 border border-slate-800 focus:border-brand-blue rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {serverError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white brand-gradient hover:opacity-95 shadow-[0_4px_25px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Submitting Proposal...</span>
              </>
            ) : (
              <>
                <span>Submit Request</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default LeadForm;
