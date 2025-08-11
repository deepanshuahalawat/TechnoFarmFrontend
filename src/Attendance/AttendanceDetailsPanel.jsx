import React, { useState, useEffect } from 'react';
function AttendanceDetailsPanel({
    selectedEmployee,
    selectedDate,
    employees,
    monthNames,
    currentMonth,
    currentYear,
    attendance,
    onClose,
    onSave // Only need onSave now
}) {
    if (selectedEmployee === null || selectedDate === null) return null;

    const employee = employees.find(e => e.id === selectedEmployee);
    
    // Local form state
    const [formData, setFormData] = useState(
        attendance[selectedEmployee]?.[selectedDate] || {
            status: 'absent',
            checkIn: null,
            checkOut: null,
            hours: 0,
            notes: ''
        }
    );

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        // Call parent's save handler with the complete form data
        onSave(selectedEmployee, selectedDate, formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* ... existing header code ... */}


                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800">
                            {employee?.name}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-600 mb-2">
                        {selectedDate} {monthNames[currentMonth]} {currentYear}
                    </p>
                    <p className='font-normal text-sm mb-2'>Salary: ₹{employee?.monthlySalary}</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late</option>
                             
                            </select>
                        </div>

                        {formData.status !== 'absent' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                                        <input
                                            type="time"
                                            value={formData.checkIn || ''}
                                            onChange={(e) => handleChange('checkIn', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                                        <input
                                            type="time"
                                            value={formData.checkOut || ''}
                                            onChange={(e) => handleChange('checkOut', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Or enter total hours directly:
                            </label>
                            <input
                                type="number"
                                step="0.25"
                                min="0"
                                max="24"
                                value={formData.hours || 0}
                                onChange={(e) => handleChange('hours', parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea
                                value={formData.notes || ''}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                placeholder="Add any notes here..."
                                rows={3}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendanceDetailsPanel;