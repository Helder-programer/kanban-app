it('should return a number too much 2', () => {
    const number = sum(2, 2);
    expect(number).toBe(4);
});


function sum(num1: number, num2: number) {
    return num1 + num2
}