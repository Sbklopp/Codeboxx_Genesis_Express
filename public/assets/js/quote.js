//---------------------------------------------VARIABLES FOR VISIBILITY
const apartments = document.querySelector('.apartments');
const floors = document.querySelector('.floors');
const basements = document.querySelector('.basements');
const distinctBuildings = document.querySelector('.distinct-buildings');
const parking = document.querySelector('.parking');
const cagesDeployed = document.querySelector('.cages-deployed');
const tenant = document.querySelector('.tenant');
const occupants = document.querySelector('.occupants');
const activity = document.querySelector('.activity');

//---------------------------------------------VARIABLES FOR VISIBILITY END

//--------------------------------REMOVING AND ADDING INPUT FIELDS FUNCTIONS
function removeClass() {
	apartments.classList.remove('myActive');
	floors.classList.remove('myActive');
	basements.classList.remove('myActive');
	distinctBuildings.classList.remove('myActive');
	parking.classList.remove('myActive');
	cagesDeployed.classList.remove('myActive');
	tenant.classList.remove('myActive');
	occupants.classList.remove('myActive');
	activity.classList.remove('myActive');
}

function addResidential() {
	apartments.classList.add('myActive');
	floors.classList.add('myActive');
	basements.classList.add('myActive');
}

function addCommercial() {
	floors.classList.add('myActive');
	basements.classList.add('myActive');
	parking.classList.add('myActive');
	distinctBuildings.classList.add('myActive');
	cagesDeployed.classList.add('myActive');
}

function addCorporate() {
	tenant.classList.add('myActive');
	floors.classList.add('myActive');
	basements.classList.add('myActive');
	parking.classList.add('myActive');
	occupants.classList.add('myActive');
}

function addHybrid() {
	distinctBuildings.classList.add('myActive');
	floors.classList.add('myActive');
	basements.classList.add('myActive');
	parking.classList.add('myActive');
	occupants.classList.add('myActive');
	activity.classList.add('myActive');
}

function resetValues() {
	document.getElementById('apartments').value = 0;
	document.getElementById('floors').value = 0;
	document.getElementById('basements').value = 0;
	document.getElementById('tenant').value = 0;
	document.getElementById('distinct-buildings').value = 0;
	document.getElementById('occupants').value = 0;
	document.getElementById('activity').value = 0;
	document.getElementById('parking').value = 0;
	document.getElementById('cages-deployed').value = 0;
}

//--------------------------------REMOVING AND ADDING FUNCTIONS END

//--------------------------------THE GREAT RESET. SEPERATE FROM THE MAIN FUNCTION
function resReset() {
	resetValues();
	removeClass();
	addResidential();
}
function comReset() {
	resetValues();
	removeClass();
	addCommercial();
}
function corpReset() {
	resetValues();
	removeClass();
	addCorporate();
}
function hybReset() {
	resetValues();
	removeClass();
	addHybrid();
}

//--------------------------------THE GREAT RESET END

// MAIN FUNCTION THAT IS CALLED WHEN USER INPUTS OR CHANGES VALUES

function projectType() {
	let selected = document.getElementsByName('project');
	if (selected[0].checked) {
		let quality = residentialLogic();
		qualitySelect(quality);

	} else if (selected[1].checked) {
		let quality = commercialLogic();
		qualitySelect(quality);

	} else if (selected[2].checked) {
		let quality = corpAndHybridLogic();
		qualitySelect(quality);

	} else if (selected[3].checked) {
		let quality = corpAndHybridLogic();
		qualitySelect(quality);
		
	}
}

// MAIN FUNCTION THAT IS CALLED WHEN USER INPUTS OR CHANGES VALUES END

//------------SELECTING THE QUALITY RANGE: STANDARD, PREMIUM, OR EXCELIUM

let priceRange = new Array();
priceRange['standard'] = 7565;
priceRange['premium'] = 12345;
priceRange['excelium'] = 15400;

function getPriceRange() {
	prValue = 0;
	let theForm = document.forms['userOutput'];
	let selectRange = theForm.elements['pricerange'];

	for (let i = 0; i < selectRange.length; i++) {
		if (selectRange[i].checked) {
			prValue = priceRange[selectRange[i].value];
		}
	}
	return prValue;
}

//------------SELECTING THE QUALITY RANGE: STANDARD, PREMIUM, OR EXCELIUM END

//GRABBING THE VALUE EVERYTIME FORM IS CHANGED, AND RETURNING USER'S VALUE.  WILL USE RETURNED VALUE IN MAIN FUNCTION.

function userInput(property) {
	let selectedNum = property;
	let inputValue = 1;
	if (selectedNum.value != '') {
		inputValue = parseInt(selectedNum.value);
	}
	return inputValue;
}

//GRABBING THE VALUE EVERYTIME FORM IS CHANGED, AND RETURNING USER'S VALUE END

//LOGIC FOR WHEN THE USER SELECTS THE PROJECT TYPE, AND WILL RETURN EITHER A VALUE, OR ZERO

function residentialLogic() {
	let inputedApartments = userInput(document.getElementById('apartments'));
	let inputedFloors = userInput(document.getElementById('floors'));
	let inputedBasements = userInput(document.getElementById('basements'));
//MATH SECTION
	let numOfDoors = Math.ceil(inputedApartments / inputedFloors);
	let forEverySix = Math.ceil(numOfDoors / 6);
	let addColoumn = Math.ceil(inputedFloors / 20);
	let resCages = addColoumn * forEverySix;
//IF NOT 0, RETURN VALUE, ELSE RETURN 0
	if (inputedApartments != 0 && inputedFloors != 0 && inputedBasements != 0) {
		return resCages;
	} else {
		return 0;
	}
}

function commercialLogic() {
	let inputedDBuildings = userInput(document.getElementById('distinct-buildings'));
	let inputedFloors = userInput(document.getElementById('floors'));
	let inputedBasements = userInput(document.getElementById('basements'))
	let inputedParking = userInput(document.getElementById('parking'));
	let inputedElevators = userInput(document.getElementById('cages-deployed'));
//IF NOT 0, RETURN VALUE, ELSE RETURN 0
	if (
		inputedFloors != 0 &&
		inputedBasements != 0 &&
		inputedParking != 0 &&
		inputedDBuildings != 0 &&
		inputedElevators != 0
	) {
		return document.getElementById('cages-deployed').value;
	} else {
		return 0;
	}
}

function corpAndHybridLogic() {
	let inputedOccupants = userInput(document.getElementById('occupants'));
	let inputedFloors = userInput(document.getElementById('floors'));
	let inputedBasements = userInput(document.getElementById('basements'));
	let inputedTenants = userInput(document.getElementById('tenant'));
	let inputedParking = userInput(document.getElementById('parking'));
	let inputedDBuildings = userInput(document.getElementById('distinct-buildings'));
	let inputedActivity = userInput(document.getElementById('activity'));
//MATH SECTION
	let floorPlusBasements = inputedFloors + inputedBasements;
	let totalOccupants = Math.ceil(inputedOccupants * floorPlusBasements);
	let eleRequired = Math.ceil(totalOccupants / 1000);
	let eColoumns = Math.ceil(floorPlusBasements / 20);
	let comCages = Math.ceil(eleRequired / eColoumns);
	let totalElevators = eColoumns * comCages;
//IF NOT 0, RETURN VALUE, ELSE RETURN 0
	if (inputedOccupants != 0 && inputedFloors != 0 && inputedBasements != 0) {
		return totalElevators;
	} else {
		return 0;
	}

}

//LOGIC FOR WHEN THE USER SELECTS THE PROJECT TYPE END

//IF QUALITY IS SELECTED FUNCTION.  JUST PUTTING IN OWN FUNCTION SO I DIDN'T HAVE TO REWRITE THIS 10934875690134875 TIMES

function qualitySelect(quality) {
	document.getElementById('lift-cages').value = quality;

	let elevatorUnitCost = getPriceRange();
	document.getElementById('each-elevator-price').value = elevatorUnitCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

	let totalElevatorCost = quality * elevatorUnitCost;
	document.getElementById('elevator-total').value = totalElevatorCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

	if (elevatorUnitCost === 7565) {
		let installFees = totalElevatorCost * 0.1;
		let totalPrice = totalElevatorCost + installFees;
		document.getElementById('install-fees').value = installFees.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		document.getElementById('total-price').value = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	} else if (elevatorUnitCost === 12345) {
		let installFees = totalElevatorCost * 0.13;
		let totalPrice = totalElevatorCost + installFees;
		document.getElementById('install-fees').value = installFees.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		document.getElementById('total-price').value = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	} else if (elevatorUnitCost === 15400) {
		let installFees = totalElevatorCost * 0.16;
		let totalPrice = totalElevatorCost + installFees
		document.getElementById('install-fees').value = installFees.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		document.getElementById('total-price').value = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	}
}

//IF QUALITY IS SELECTED FUNCTION END

//JANKY LOGIC TO MAKE THE COMMAS WORK THAT I'M LEAVING IN BECAUSE OF HOW RIDICULOUS IT IS

// function funkyLogic(val) {
//    let valStr = String(val);
//    let splitVal = valStr.split('');
//    let revrVal = splitVal.reverse();
//    let firstJoin = revrVal.join('');
//    let theJuice = firstJoin.match(/.{1,3}/g);
//    let addComma = theJuice.join(',');
//    let secondSplit = addComma.split('');
//    let lastRevr = secondSplit.reverse();
//    let result = lastRevr.join('');

//    return result;
// }

//JANKY LOGIC TO MAKE THE COMMAS WORK END