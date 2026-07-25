import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  
  const navigate = useNavigate();
  const adminUsername = localStorage.getItem('adminUsername') || 'Admin';

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await axios.get(`${apiUrl}/api/leads`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLeads(response.data);
      setFilteredLeads(response.data);
    } catch (err) {
      console.error('Fetch leads error:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      } else {
        setError('Failed to retrieve leads from database. Please check connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Search and status filters
  useEffect(() => {
    let result = leads;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.company && lead.company.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(result);
  }, [searchQuery, statusFilter, leads]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await axios.patch(
        `${apiUrl}/api/leads/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Auto-refresh: update local state to reflect change immediately
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === id ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      console.error('Update lead status error:', err);
      alert(err.response?.data?.error || 'Failed to update lead status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="relative grid-bg min-h-screen text-slate-100 flex flex-col">
      {/* Top glowing radial gradients */}
      <div className="glow-overlay"></div>

      {/* Header bar */}
      <header className="relative z-10 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg className="h-8 w-8 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/255/svg">
            <path d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z" fill="currentColor" />
          </svg>
          <div>
            <span className="font-bold text-lg tracking-tight text-white block">
              LeadDesk<span className="text-brand-blue">Console</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline-block text-slate-400 text-sm">
            Logged in as <span className="text-white font-medium">{adminUsername}</span>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-sm font-semibold transition-all border border-slate-800"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main body */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col">
        {/* Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Lead Management Console</h1>
            <p className="text-slate-400 text-sm mt-1">Review, track, and manage inbound lead proposals from the LeadDeskmini portal.</p>
          </div>
          <button
            onClick={fetchLeads}
            className="inline-flex items-center justify-center p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white rounded-xl transition-all"
            title="Refresh Leads"
          >
            <svg className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18v3" />
            </svg>
          </button>
        </div>

        {/* Search and Filters panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Search box */}
          <div className="sm:col-span-2 relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or company..."
              className="w-full bg-[#0d1425] border border-slate-800 focus:border-brand-blue rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all text-sm"
            />
          </div>

          {/* Status dropdown filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#0d1425] border border-slate-800 focus:border-brand-blue rounded-xl px-4 py-3 text-slate-300 focus:outline-none transition-all text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Table list */}
        <div className="card-glass rounded-2xl overflow-hidden flex-grow flex flex-col min-h-[400px]">
          {loading && leads.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center py-20 text-slate-400">
              <svg className="animate-spin h-10 w-10 text-brand-blue mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-sm font-medium">Retrieving client requests...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center py-20 text-slate-500">
              <svg className="h-12 w-12 text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v2m16 0h-4M4 12h4" />
              </svg>
              <p className="text-sm font-medium">No proposals match your search filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="min-w-full divide-y divide-slate-800 text-left">
                <thead className="bg-[#0a0f1d]/75 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4">Client</th>
                    <th scope="col" className="px-6 py-4">Company</th>
                    <th scope="col" className="px-6 py-4">Project Type</th>
                    <th scope="col" className="px-6 py-4">Budget</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4">Date</th>
                    <th scope="col" className="px-6 py-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-[#0f172a]/20 text-slate-300 text-sm">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/30 transition-colors">
                      {/* Name & Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{lead.email}</div>
                      </td>

                      {/* Company */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-300 font-medium">
                        {lead.company || <span className="text-slate-600 italic">None</span>}
                      </td>

                      {/* Project Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-350">
                          {lead.project_type}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="px-6 py-4 whitespace-nowrap text-brand-blue font-bold font-mono">
                        {lead.budget}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {updatingId === lead.id ? (
                          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                            <svg className="animate-spin h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Updating...</span>
                          </div>
                        ) : (
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`px-2 py-1 text-xs rounded-lg font-bold border outline-none cursor-pointer transition-all bg-[#0a0f1d] ${
                              lead.status === 'New' ? 'text-blue-400 border-blue-500/30 focus:border-blue-500' :
                              lead.status === 'Contacted' ? 'text-indigo-400 border-indigo-500/30 focus:border-indigo-500' :
                              'text-green-400 border-green-500/30 focus:border-green-500'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        )}
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                        {formatDate(lead.created_at)}
                      </td>

                      {/* Message details */}
                      <td className="px-6 py-4 text-slate-400 max-w-xs truncate" title={lead.message}>
                        {lead.message || <span className="text-slate-500 italic">No project details provided.</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
