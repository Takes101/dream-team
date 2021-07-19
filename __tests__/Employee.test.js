const Employee = require('./lib/Employee');

test('check for employee name', () => { 
    const employee = new Employee('David');

    expect(employee.name).toBe('David');
});