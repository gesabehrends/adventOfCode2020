const solution1 = (input) => {
    const passportList = input.map(passenger => 
        passenger
            .split("\n")
            .map(rule => rule.split(" "))
            .flat()
            .map(passenger => { 
                const [rule, value] = passenger.split(":");
                return rule;
            }))
    const requiredFields = [
        "byr",
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid",
    ]
    const validPassports = passportList.reduce((numberValid, passportToCheck) => {
        const isValid = requiredFields.reduce((isValid, ruleToCheck) => (
            isValid && passportToCheck.includes(ruleToCheck)
        ), true)
        if (isValid) return numberValid + 1;
        return numberValid;
    }, 0)

    return validPassports;
}

const solution2 = (input) => {
    const passportList = input.map(passenger => 
        passenger
            .split("\n")
            .map(rule => rule.split(" "))
            .flat()
            .reduce((rules, passenger) => { 
                const [rule, value] = passenger.split(":");
                rules[rule] = value;
                return rules;
            }, {})
    );

    const requiredFields = [
        { key: "byr", value: (data) => (data.length === 4 && parseInt(data) >= 1920 && parseInt(data) <=2002)}, // four digits; at least 1920 and at most 2002.}
        { key: "iyr", value: (data) => (data.length === 4 && parseInt(data) >= 2010 && parseInt(data) <=2020)}, //four digits; at least 2010 and at most 2020.}
        { key: "eyr", value: (data) =>  (data.length === 4 && parseInt(data) >= 2020 && parseInt(data) <=2030)}, //four digits; at least 2020 and at most 2030.}
        { key: "hgt", value: (data) =>  {
            const unit = data.slice(data.length - 2);
            const value = parseInt(data.slice(0, data.length - 2));
            if (unit === "cm") {
                return value >= 150 && value <= 193;
            } else if (unit === "in") {
                return value >= 59 && value <= 76;
            }
            return false}},
        { key: "hcl", value: (data) =>  (/#[0-9a-f]{6}|#[0-9a-f]{3}/gi.test(data)) }, // )a # followed by exactly six characters 0-9 or a-f.}
        { key: "ecl", value: (data) =>  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(data)},
        { key: "pid", value: (data) =>  (data.length === 9 && /^\d+$/.test(data))}, // a nine-digit number, including leading zeroes.}
    ]

    const validPassports = passportList.reduce((numberValid, passportToCheck) => {
        const isValid = requiredFields.reduce((isValid, {key, value}) => (
            isValid && !!passportToCheck[key] && value(passportToCheck[key])
        ), true)
        if (isValid) return numberValid + 1;
        return numberValid;
    }, 0)
    
    return validPassports;
}

const solution = (input) => {
    console.log("V1: ", solution1(input));
    console.log("V2: ", solution2(input));
};
  
exports.solution = solution;