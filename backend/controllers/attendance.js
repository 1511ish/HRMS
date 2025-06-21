const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');


exports.getAttendanceForDate = async (req, res) => {

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const employees = await Employee.find();

    const attendanceRecords = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    });

    const attendanceMap = {};
    attendanceRecords.forEach((record) => {
      attendanceMap[record.employeeId.toString()] = record;
    });

    const result = employees.map((emp) => {
      const attendance = attendanceMap[emp._id.toString()];
      return {
        employeeId: emp._id,
        name: emp.name,
        email: emp.email,
        position: emp.position,
        department: emp.department,
        status: attendance ? attendance.status : 'Not Marked',
        attendanceId: attendance ? attendance._id : null,
      };
    });

    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getFilteredAttendance = async (req, res) => {
  const filter = {};
  filter.status = req.params.status;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  filter.date = { $gte: today, $lt: tomorrow };
  
  try{
    const attendances = await Attendance.find(filter).populate('employeeId','name email position department');
    const result = attendances.map((attendance) => {
      return {
        employeeId: attendance.employeeId,
        name: attendance.employeeId.name,
        email: attendance.employeeId.email,
        position: attendance.employeeId.position,
        department: attendance.employeeId.department,
        status: attendance.status,
        attendanceId: attendance._id
      };
    });

    console.log("result: ", result);

    res.json(result);
  }catch(err){
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;

    if (!employeeId || !status) {
      return res.status(400).json({ error: "Employee ID and status are required." });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Check if attendance already exists for today
    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: today, $lt: tomorrow }
    });

    let attendance;

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      attendance = existingAttendance;
    } else {
      attendance = new Attendance({
        employeeId: employeeId,
        status,
        date: today
      });
      await attendance.save();
    }

    res.status(200).json({ message: 'Attendance marked successfully', status: attendance.status });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to mark attendance', details: err.message });
  }
};


exports.getPresentEmployees = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {

    const presentedEmployees = await Attendance.find({
      date: { $gte: today, $lt: tomorrow },
    }).populate('employeeId', '_id name position');

    // console.log("presentedEmployees: ", presentedEmployees);

    const result = presentedEmployees.map((emp) => {
      return {
        employeeId: emp.employeeId._id,
        name: emp.employeeId.name,
        desgination: emp.employeeId.position
      };
    });
    console.log(result);
    // let result = "working";
    res.json({ presentedEmployees: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
}