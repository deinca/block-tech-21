const jsonProperties = {
    object1:{name: 'deinca', age: 13}, 
    object2:{name: 'loquino', age: 15}
};
const zetDePropertiesNamenInStrings = JSON.stringify(jsonProperties); // ""
const geefMijDePropertyValue = JSON.parse(zetDePropertiesNamenInStrings); // {"name":-"deinca"-}

console.log(geefMijDePropertyValue.object1.name);

