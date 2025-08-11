import React, { useState, useEffect } from 'react';
import AttendanceDetailsPanel from "./AttendanceDetailsPanel";
import AttendanceDataGrid from "./AttendanceDataGrid";
import Unauthorized from '../NotAuthorided';
const AttendanceSystem = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current month and year
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [today, setCurrentday] = useState(currentDate.getDate());
  const [dayName, setDayName] = useState(currentDate.toLocaleDateString('en-US', { weekday: 'long' }));
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentdate, setCurrentdate] = useState(currentDate.toLocaleDateString());

  // Initialize attendance data
  const initializeAttendance = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const attendanceData = {};

    employees.forEach(employee => {
      attendanceData[employee.id] = {};
      for (let day = 1; day <= daysInMonth; day++) {
        attendanceData[employee.id][day] = {
          status: 'absent', // default status
          checkIn: null,
          checkOut: null,
          hours: 0,
          notes: ''
        };
      }
    });

    return attendanceData;
  };

  const [attendance, setAttendance] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [role, setRole] = useState();

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem("user");
        setRole(JSON.parse(user).role);

        const response = await fetch('https://technofarm.in/api/employee', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);




  // Get all unique departments
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  // Filter employees based on search and department
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Handle month navigation
  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Handle attendance status change
  const handleStatusChange = (employeeId, day, status) => {
    setAttendance(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: {
          ...prev[employeeId][day],
          status: status,
          checkIn: status === 'present' ? '09:00' : null,
          checkOut: status === 'present' ? '17:00' : null,
          hours: status === 'present' ? 8 : 0
        }
      }
    }));
  };

  // Handle time change
  const handleTimeChange = (employeeId, day, field, value) => {
    setAttendance(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: {
          ...prev[employeeId][day],
          [field]: value,
          hours: calculateHours(
            field === 'checkIn' ? value : prev[employeeId][day].checkIn,
            field === 'checkOut' ? value : prev[employeeId][day].checkOut
          )
        }
      }
    }));
  };

  // Add this new function to handle direct hours input
  const handleHoursChange = (employeeId, day, hours) => {
    setAttendance(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: {
          ...prev[employeeId][day],
          hours: parseFloat(hours) || 0
        }
      }
    }));
  };
  // Calculate working hours
  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;

    const [inHours, inMinutes] = checkIn.split(':').map(Number);
    const [outHours, outMinutes] = checkOut.split(':').map(Number);

    const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
    return Math.max(0, totalMinutes / 60).toFixed(2);
  };


  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 border-green-500';
      case 'absent': return 'bg-red-100 border-red-500';
      case 'late': return 'bg-yellow-100 border-yellow-500';


      default: return 'bg-gray-100 border-gray-300';
    }
  };

  // Generate month days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  const saveAttendance = async (employeeId, day, data) => {
    try {
      const token = localStorage.getItem("token");
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      const payload = {
        date: dateStr, // Use properly formatted date string
        employeeId: employeeId,
        hours: data.hours,
        late: data.status === "late",
        comment: data.notes,
        status: data.status // Include the status in the payload
      };

      const response = await fetch("https://technofarm.in/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save attendance");
      }

      // Refresh the attendance data
      const fromDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
      const toDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;
      fetchAttendance(fromDate, toDate, employees.map(e => e.id));

    } catch (error) {
      console.error("Save attendance error:", error);
      alert(`Error saving attendance: ${error.message}`);
    }
  };



  const fetchAttendance = async (fromDate, toDate, employeeIds) => {
    try {
      const token = localStorage.getItem("token");


      const response = await fetch("https://technofarm.in/api/attendance/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fromDate,
          toDate,
          employeeIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }

      const data = await response.json();

      // Transform attendance into the grid format
      const attendanceMap = {};
      data.forEach((record) => {
        const dateObj = new Date(record.date);
        const day = dateObj.getDate();

        if (!attendanceMap[record.employeeId]) {
          attendanceMap[record.employeeId] = {};
        }

        attendanceMap[record.employeeId][day] = {
          status: record.late
            ? "late"
            : record.hours > 0
              ? "present"
              : "absent",
          checkIn: record.checkInTime,
          checkOut: record.checkOutTime,
          hours: record.hours,
          notes: record.comment || "",
        };
      });

      setAttendance(attendanceMap);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (employees.length > 0) {
      const fromDate = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-01`;
      const toDate = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(daysInMonth).padStart(2, "0")}`;
      const employeeIds = employees.map((e) => e.id);

      fetchAttendance(fromDate, toDate, employeeIds);
    }
  }, [employees, currentMonth, currentYear]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (role !=="DIRECTOR") {

    return (
      <div >
        <Unauthorized />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Employee Attendance System</h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold">{monthNames[currentMonth]} {currentYear}</h2>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>

            </div>

            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />

            </div>

          </div>
          <div className='font-bold flex'>
            Date: {currentdate}
            <p className='text-yellow-300 ml-2'>{dayName}</p>
          </div>
        </div>



        {/* Attendance tables */}

        <AttendanceDataGrid
          employees={employees}
          filteredEmployees={filteredEmployees}
          monthDays={monthDays}
          today={today}
          daysInMonth={daysInMonth}
          attendance={attendance}
          getStatusColor={getStatusColor}
          setSelectedEmployee={setSelectedEmployee}
          setSelectedDate={setSelectedDate}
          isMobile={window.innerWidth < 768}
        />


        {/* Attendance Details Panel poop-up */}

        <AttendanceDetailsPanel
          selectedEmployee={selectedEmployee}
          selectedDate={selectedDate}
          employees={employees}
          monthNames={monthNames}
          currentMonth={currentMonth}
          currentYear={currentYear}
          attendance={attendance}
          onClose={() => {
            setSelectedEmployee(null);
            setSelectedDate(null);
          }}
          onSave={(employeeId, day, formData) => {
            // Update local state first
            setAttendance(prev => ({
              ...prev,
              [employeeId]: {
                ...prev[employeeId],
                [day]: formData
              }
            }));

            // Then call API
            saveAttendance(employeeId, day, formData);
          }}
        />

      </div>
    </div>
  );
};

export default AttendanceSystem;