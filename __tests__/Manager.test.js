const Manager = require('./lib/Manager');

test('check for manager name', () => { 
    const manager = new Manager('David');

    expect(manager.name).toBe('David');
})