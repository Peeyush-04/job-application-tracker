import Job from '../models/Job.js';

// CREATE job
export const createJob = async (req, res) => {
  const { company, role, status } = req.body;

  try {
    const job = await Job.create({
      company,
      role,
      status,
      user: req.user._id, // from JWT middleware
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job.', error: err.message });
  }
};

// READ all jobs for user
export const getJobs = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = { user: req.user._id };
    if (status) {
      filter.status = status; // Filter only if status is provided
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs.', error: err.message });
  }
};

// UPDATE job by ID
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { status, company, role } = req.body;

  try {
    const job = await Job.findOne({ _id: id, user: req.user._id });

    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Log status change only if different
    if (status && status !== job.status) {
      job.history.push({ status });
      job.status = status;
    }

    if (company) job.company = company;
    if (role) job.role = role;

    const updatedJob = await job.save();

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update job.', error: err.message });
  }
};


// DELETE job by ID
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findOneAndDelete({ _id: id, user: req.user._id });

    if (!job) return res.status(404).json({ message: 'Job not found.' });

    res.json({ message: 'Job deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job.', error: err.message });
  }
};
