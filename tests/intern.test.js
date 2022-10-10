const Intern = require('../lib/Intern');

test('Creates an Intern object.', () => {
    const intern = new Intern('Zeinab', 120, 'zeinabhared@gmail.com', 'UW');
    expect(intern.school) .toEqual(expect.any(String));
});

test('Gets employee school.', () => {
    const intern = new Intern('Zeinab', 120, 'zeinabhared@gmail.com', 'UW');
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test('Gets role of employee.', () => {
    const intern = new Intern('Zeinab', 120, 'zeinabhared@gmail.com', 'UW');
    expect(intern.getRole()).toEqual("Intern");
}); 