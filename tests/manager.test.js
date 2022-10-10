const Manager = require('../lib/Manager');

test('Creates a Manager object.', () => {
    const manager = new Manager('Zeinab', 120, 'zeinabhared@gmail.com', 120);
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('Gets role of employee.', () => {
    const manager = new Manager('Zeinab', 120, 'zeinabhared@gmail.com');
    expect(manager.getRole()).toEqual("Manager");
}); 