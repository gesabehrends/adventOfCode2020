const SHINY_GOLD = "shiny gold"

const solution1 = (rules) => {
    const ruleMap = rules.reduce((ruleMap, rule) => { 
        const [containerString, itemString] = rule.split("contain");
        const items = itemString.replace(/[0-9]|bags|bag|no other|\./gi, '').split(",").map(item => item.trim());
        const container = containerString.replace(/bags/i, "").trim();
        items.forEach(item => {
            ruleMap[item] ? ruleMap[item] = [...ruleMap[item], container] : ruleMap[item] = [container];
        })
        return ruleMap;
    }, {});

    let parentItems = [];

    const lookUp = item => {
        if (ruleMap[item]) {
            ruleMap[item].forEach(parentItem => {
                if (!!parentItem && !parentItems.includes(parentItem)) {
                    parentItems.push(parentItem);
                    lookUp(parentItem);   
                }
            });
        }
    }

    lookUp(SHINY_GOLD);
    console.log(parentItems.length);
}

const solution2 = (rules) => {
    const ruleSet = rules.reduce((ruleMap, rule) => { 
        const [containerString, itemString] = rule.split("contain");
        const items = itemString
            .replace(/bags|bag|no other|\./gi, '')
            .split(",")
            .map(item => {
                const numberNeeded = +item.replace(/\D/g,'');
                const itemColor = item.replace(/[0-9]/gi, '').trim();
                return [itemColor, numberNeeded];
            });
        const container = containerString.replace(/bags/i, "").trim();
        ruleMap[container] = items;
        return ruleMap;
    }, {});

    let numberOfBags = 0;

    const lookUp = (item, amountParent) => {
        if (ruleSet[item]) {
            ruleSet[item].forEach(
                ([ bagColor, numberNeeded ]) => {
                    const neededBags = numberNeeded * amountParent;
                    numberOfBags = numberOfBags + neededBags;
                    lookUp(bagColor, neededBags);
                }
            );
        }
    }

    lookUp(SHINY_GOLD, 1);
    console.log(numberOfBags);
}

exports.solution = solution2;