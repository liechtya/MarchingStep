// Date: December 12th, 2019
// File Description: This code will calculate the size of the gradual
// marching step in a x to 5 format



// 1 yard = 3 feet = 3 * 12 inches = 36 inches
const YardInches = 36;

//	Standard 8 to 5 step is 22.5 inches

function StepsToInches(Steps) {
	return Steps * 22.5;
}

function InchesToSteps(Length) {
	return Length / 22.5;
}

// Converts the steps relative to the hash to steps calculated from how far
// from the front the sideline the dot is.
// Input:	 Hash: a string describing which hash/sideline the dot is closest to
//			 HashStep: a decimal number of how many steps from the closest hash/Sideline
//	Output: Number of steps to the front sideline

function RelativeToAbsoluteStepVert(HashStep, Hash){
	var StepsNum= parseInt(HashStep);
	if (Hash == "BackSide") {
		return 84 - StepsNum;
	} else if (Hash == "BehindBackHash") {
		return 52 + StepsNum;
	} else if (Hash == "FrontBackHash") {
		return 52 - StepsNum;
	} else if (Hash == "BehindFrontHash") {
		return 32 + StepsNum;
	} else if (Hash == "FrontFrontHash") {
		return 32 - StepsNum;
	} else if (Hash == "FrontSide") {
		return StepsNum;
	} else {
		console.error("Unexpected hash position.");
	}
}

function RelativeToAbsoluteStepHor(Side, Yardline, SideOfYardline, StepsHor) {
	var StepsNum = parseInt(StepsHor);

	if (Side == "left") {
		if (SideOfYardline == "Inside") {
			return (Yardline/5) * 8 + StepsNum;
		} else if (SideOfYardline == "Outside"){
			return (Yardline/5) * 8 + StepsNum;
		} else if (SideOfYardline == "On"){
			return (Yardline/5) * 8;
		} else {
			console.error("Unexpected side of yardline");
		}

	} else if (Side == "right"){
		if (SideOfYardline == "Inside") {
			return ((50 + (50 - Yardline))/5) * 8 + StepsNum;
		} else if (SideOfYardline == "Outside"){
			return ((50 + (50 - Yardline))/5) * 8 + StepsNum;
		} else if (SideOfYardline == "On"){
			return ((50 + (50 - Yardline))/5) * 8;
		} else {
			console.error("Unexpected side of yardline");
		}
	} else {
		console.error("Unexpected Side of field");
	}
}


function HorizontalDistance(FromSide, FromYardline, FromSideOfLine, FromHorSteps, ToSide, ToYardline, ToSideOfLine, ToHorSteps) {

	var FromPoint = RelativeToAbsoluteStepHor(FromSide, FromYardline, FromSideOfLine, FromHorSteps);
	var ToPoint = RelativeToAbsoluteStepHor(ToSide, ToYardline, ToSideOfLine, ToHorSteps);
	return Math.abs(FromPoint - ToPoint);
}

function VerticalDistance(FromOffHash, FromSideHash, ToOffHash, ToSideHash) {
	var FromPoint = RelativeToAbsoluteStepVert(FromOffHash, FromSideHash);
	var ToPoint = RelativeToAbsoluteStepVert(ToOffHash, ToSideHash);
	return Math.abs(FromPoint - ToPoint);
}

function TotalDistance(Horizontal, Vertical) {
	Horizontal = Math.pow(Horizontal, 2);
	Vertical = Math.pow(Vertical, 2);
	return Math.sqrt(Horizontal + Vertical);
}

function StepSizeDistance(Distance, Count){
	return Distance / Count;
}

function Xto5Converter(StepSizeLength){
	var StepSizeInch = StepsToInches(StepSizeLength);
	return YardInches * 5 / StepSizeInch
}

function DisplayXto5(Xto5Step){
	var element = document.getElementById('result')
	var resultText = `${Xto5Step} to 5 Step`
	if (element == null) {
		var results = document.createElement("div");
		results.appendChild(document.createTextNode(resultText));
		results.id = 'result';
		document.body.appendChild(results);
	} else	{
		element.textContent = resultText
	}
		
}

function getCoordinates() {
	var ToSideElement = document.getElementById('SideTo');
	var ToSide = ToSideElement.value;
	var ToHashElement = document.getElementById('RelativeVertTo');
	var ToHash = ToHashElement.value;
	var ToHashSteps = document.getElementById('VerticalStepsTo').value;
	var ToYardlineElemenet = document.getElementById('YardlineTo');
	var ToYardline = ToYardlineElemenet.value;
	var ToSideOfYardlineElement = document.getElementById('InorOutTo');
	var ToSideOfYardline = ToSideOfYardlineElement.value;
	var ToYardlineSteps = document.getElementById('HorizontalStepTo').value;

	var FromSideElement = document.getElementById('SideFrom');
	var FromSide = FromSideElement.value;
	var FromHashElement = document.getElementById('RelativeVerticalFrom');
	var FromHash = FromHashElement.value;
	var FromHashSteps = document.getElementById('VerticalStepsFrom').value;
	var FromYardlineElement = document.getElementById('YardlineFrom');
	var FromYardline = FromYardlineElement.options[FromYardlineElement.selectedIndex].value;
	var FromSideOfYardlineElement = document.getElementById('RelativeYardlineFrom');
	var FromSideOfYardline = FromSideOfYardlineElement.value;
	var FromYardlineSteps = document.getElementById('HorizontalStepFrom').value;

	var Coordinates = {ToSide: ToSide, ToHash: ToHash, ToHashStep: ToHashSteps, ToYardline: ToYardline, ToSideOfYardline: ToSideOfYardline, ToYardlineSteps: ToYardlineSteps, FromSide: FromSide, FromHash: FromHash, FromHashSteps: FromHashSteps, FromYardline: FromYardline, FromSideOfYardline: FromSideOfYardline, FromYardlineSteps: FromYardlineSteps};
	return Coordinates;
}

function CalculateStep() {
	var Marching = getCoordinates();
	var MoveCount = document.getElementById('count').value;
	var HorizontalAbs = HorizontalDistance(Marching.FromSide, Marching.FromYardline, Marching.FromSideOfYardline, Marching.FromYardlineSteps, Marching.ToSide, Marching.ToYardline, Marching.ToSideOfYardline, Marching.ToYardlineSteps);
	console.log(`Horizontal: ${HorizontalAbs}`);
	var VerticalAbs = VerticalDistance(Marching.FromHashSteps, Marching.FromHash, Marching.ToHashStep, Marching.ToHash);
	console.log(`Vertical: ${VerticalAbs}`);
	var Total = TotalDistance(HorizontalAbs, VerticalAbs);
	console.log(`Total: ${Total}`);
	var StepSize = StepSizeDistance(Total, MoveCount);
	console.log(`Step Size: ${StepSize}`);
	var Xto5 = Xto5Converter(StepSize);
	DisplayXto5(Xto5);

}

// Event listener function that disables the input step sibling.
// TODO: add classes, attach eventlisteners, pass the DOM object to the function.
function EnableHorField(){
	var HorYardline = document.getElementsByClass();
	if (HorYardline.value = "On") {
		HorYardline.parentNode.getElementsByClass()[0].disable = true;
	} else {
		HorYardline.parentNode.getElementsByClass()[0].disable = false;
	}
}

