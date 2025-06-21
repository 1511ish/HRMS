const Candidate = require('../models/Candidate');
const Employee = require('../models/Employee');

// GET /api/candidates?status=New&position=Senior Developer
exports.getAllCandidates = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.position) filter.position = req.query.position;

    const candidates = await Candidate.find(filter);
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/candidates
exports.addCandidate = async (req, res) => {
  try {
       console.log(req.body);
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json(newCandidate);
    // res.status(200).json({message: "added"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/candidates/:id
exports.updateCandidate = async (req, res) => {
  try {
    console.log("update Controller working..");
    const { status } = req.body;
    const candidateId = req.params.id;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    candidate.status = status;
    await candidate.save();

    console.log("it is working finr");

    // If candidate is selected, add to Employee collection
    if (status === "Selected") {
      const existingEmployee = await Employee.findOne({ email: candidate.email });
      if (!existingEmployee) {
        const newEmployee = new Employee({
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          position: candidate.position,
          department:"hr",
          joiningDate: Date.now(),
          experience: candidate.experience
        });
        await newEmployee.save();
      }
    }

    res.status(200).json({ message: "Candidate status updated", status: `${candidate.status}` });

  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};


exports.deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!deletedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
