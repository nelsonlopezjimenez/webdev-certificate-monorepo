function isVowel(param1) {
	return "AEIOU".includes(param1);
}
function isBlankSpace(param78) {
	console.log('param78')
	return param78 === ' ' ? true : false
}
// console.log(isVowel('A')); // true
// console.log(isVowel('B')); // false
// console.log(isVowel('G')); // false

//removeVowels("apple") // ppl
function removeVowels(param32) {
	let tempoStr = "";
	for (let i = 0; i < param32.length; i++) {
		let element = param32[i];
		if (element === " "){
			console.log("element is blank");
			continue;
		}
		if (!isVowel(element)){
			tempoStr += element;
		}else {
		}
	}
	return tempoStr;
}
removeVowels("PEPPERONI PIZZA"); //
console.log(removeVowels("PEPPERONI PIZZA")); // PPPRNPZZ