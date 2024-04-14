export class AzaleaFormatter {
    constructor() {
        this.fnRegex = /#[A-Z0-9]+\(([\s\S]*?)\)/g;
        this.funcs = {};
        this.defineFunc("TEST", function() {
            return "Why did my dog die?"
        })
    }
    defineFunc(name, callback) {
        this.funcs[name] = callback;
    }
    format(string, vars) {
        let stringToReturn = string;
        for(const key of Object.keys(vars)) {
            let variableContents = vars[key];
            stringToReturn = stringToReturn.replaceAll(`#${key}`, variableContents);
        }
        let funcCalls = stringToReturn.match(this.fnRegex).sort();
        let errorsToAppend = [];
        let nestedCalls = [];
        for(const funcCall of funcCalls) {
            let funcName = funcCall
                .split('(')[0]
                .substring(1);
            let funcContents = funcCall
                .split('(')
                .slice(1)
                .join('(')
                .slice(0, -1);
            if(this.funcs[funcName]) {
                stringToReturn = stringToReturn.replace(funcCall, this.funcs[funcName](funcContents));
                let nested = this.funcs[funcName](funcContents).match(this.fnRegex);
                if(nested && nested.length) nestedCalls.push(...nested);
            } else {
                errorsToAppend.push(`Error: ${funcName} is not a function`)
            }
        }
        for(const funcCall of nestedCalls) {
            let funcName = funcCall
                .split('(')[0]
                .substring(1);
            let funcContents = funcCall
                .split('(')
                .slice(1)
                .join('(')
                .slice(0, -1);
            if(this.funcs[funcName]) {
                stringToReturn = stringToReturn.replace(funcCall, this.funcs[funcName](funcContents));
            } else {
                errorsToAppend.push(`Error: ${funcName} is not a function`)
            }
        }
        if(!errorsToAppend.length) return stringToReturn;
        for(const error of errorsToAppend) {
            stringToReturn += `§r\n  §c${error}`;
        }
        return stringToReturn;
    }
    reset() {
        this.funcs = {};
    }
}