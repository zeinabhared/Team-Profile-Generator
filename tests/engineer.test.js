const Engineer = require('../lib/Engineer');

test('Creates an Engineer object.', () => {
    const engineer = new Engineer('Zeinab', 120, 'zeinabhared@gmail.com', 'zeinabhared');
    expect(engineer.github) .toEqual(expect.any(String));
});

test('Gets engineer github value.', () => {
    const engineer = new Engineer('Zeinab', 120, 'zeinabhared@gmail.com', 'zeinabhared');
    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

test('Gets role of employee.', () => {
    const engineer = new Engineer('Zeinab', 120, 'zeinabhared@gmail.com', 'zeinabhared');
    expect(engineer.getRole()).toEqual("Engineer");
});