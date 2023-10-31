async function integerToBase62(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    const base = characters.length;
    let result = '';
  
    do {
      result = characters[num % base] + result;
      num = Math.floor(num / base);
    } while (num > 0);
  
    return result;
  }
  
async function base62ToInteger(str) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
	const base = characters.length;
	let result = 0;

	for (let i = 0; i < str.length; i++) {
		const char = str.charAt(i);
		const charValue = characters.indexOf(char);
		
		if (charValue === -1) {
		throw new Error(`Invalid character in the input: ${char}`);
		}

		result = result * base + charValue;
	}

	return result;
}


async function generateRandomShortCode() {
    const randomInt = Math.floor(Math.random() * 1e12);
    const randomShortCode = await integerToBase62(randomInt);
    const generatedShortCode = {
		stringShortCode: randomShortCode,
		intShortCode: randomInt
	}
	return generatedShortCode;
}


module.exports = { 
	integerToBase62, 
	base62ToInteger,
	generateRandomShortCode,
};
  