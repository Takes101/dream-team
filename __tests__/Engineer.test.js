const Engineer = require('../lib/Engineer')

test('check for engineer name', () => { 
    const engineer = new Engineer('David');

    expect(engineer.name).toBe('David');
})