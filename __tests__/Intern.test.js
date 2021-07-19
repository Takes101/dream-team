const Intern = require('./lib/Intern');

test('check for intern name', () => { 
    const intern = new Intern('David');

    expect(intern.name).toBe('David');
})