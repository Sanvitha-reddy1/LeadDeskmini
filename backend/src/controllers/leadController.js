const supabase = require('../config/supabase');

// Local in-memory list for fallback mode
let localLeads = [
  {
    id: "f83a54b3-d621-4fa3-9f8e-d98c257d0001",
    name: "Sarah Jenkins",
    email: "sarah@techflow.io",
    company: "TechFlow Systems",
    budget: "$10,000 - $25,000",
    project_type: "Web Development",
    message: "We need a landing page and a customer portal developed for our logistics software.",
    status: "New",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "f83a54b3-d621-4fa3-9f8e-d98c257d0002",
    name: "Marcus Chen",
    email: "m.chen@apexhealth.co",
    company: "Apex Health Group",
    budget: "$25,000 - $50,000",
    project_type: "Mobile Development",
    message: "Seeking a team to build our cross-platform telemedicine application on iOS and Android.",
    status: "Contacted",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "f83a54b3-d621-4fa3-9f8e-d98c257d0003",
    name: "Elena Rostova",
    email: "elena.r@innovatedesign.com",
    company: "Innovate Design Studios",
    budget: "$5,000 - $10,000",
    project_type: "UI/UX Design",
    message: "Redesigning our agency website to improve user engagement and conversion rate.",
    status: "Closed",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

// Helper to generate UUID-like string for local leads
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// POST /api/leads
//exports.createLead = async (req, res) => {


  // existing code...
exports.createLead = async (req, res) => {
   console.log("Supabase object:", supabase);
  console.log("Supabase is null?", supabase === null);
  console.log("Supabase is undefined?", supabase === undefined);
  try {
    const { name, email, company, budget, project_type, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const newLead = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      budget: budget || 'Not Specified',
      project_type: project_type || 'General Inquiry',
      message: message ? message.trim() : '',
      status: 'New'
    };

    if (supabase) {
      // Save to Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([newLead])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return res.status(500).json({ error: 'Failed to save lead to the database.' });
      }

      return res.status(201).json({ message: 'Lead submitted successfully', lead: data });
    } else {
      // Save to Local Memory
      const localLead = {
        id: generateUUID(),
        ...newLead,
        created_at: new Date().toISOString()
      };
      localLeads.unshift(localLead);
      return res.status(201).json({ message: 'Lead submitted successfully (Local Mock Mode)', lead: localLead });
    }
  } catch (error) {
    console.error('Create lead error:', error);
    return res.status(500).json({ error: 'Internal server error while creating lead.' });
  }
};

// GET /api/leads
exports.getLeads = async (req, res) => {
  try {
    console.log("Entering Supabase branch");
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        return res.status(500).json({ error: 'Failed to retrieve leads from the database.' });
      }

      return res.status(200).json(data);
    } else {
      // Return local memory copy sorted by created_at DESC
      console.log("Entering Local Mock Mode branch");
      const sortedLocalLeads = [...localLeads].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      return res.status(200).json(sortedLocalLeads);
    }
  } catch (error) {
    console.error('Get leads error:', error);
    return res.status(500).json({ error: 'Internal server error while fetching leads.' });
  }
};

// PATCH /api/leads/:id
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'Closed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase update error:', error);
        return res.status(500).json({ error: 'Failed to update lead status in the database.' });
      }

      if (!data) {
        return res.status(404).json({ error: 'Lead not found.' });
      }

      return res.status(200).json({ message: 'Lead status updated successfully', lead: data });
    } else {
      const leadIndex = localLeads.findIndex(lead => lead.id === id);
      if (leadIndex === -1) {
        return res.status(404).json({ error: 'Lead not found.' });
      }

      localLeads[leadIndex].status = status;
      return res.status(200).json({
        message: 'Lead status updated successfully (Local Mock Mode)',
        lead: localLeads[leadIndex]
      });
    }
  } catch (error) {
    console.error('Update lead error:', error);
    return res.status(500).json({ error: 'Internal server error while updating lead.' });
  }
};
