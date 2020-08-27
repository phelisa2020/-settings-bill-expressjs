 
module.exports = function settingsBill(){
	var callCost  
	var smsCost 
	var warningLevel 
	var criticalLevel 
	
	let actionList = []

	function setSettings(settings){
    callCost = Number(settings.callCost); 
    smsCost = Number(settings.smsCost);
    warningLevel = Number(settings.warningLevel); 
    criticalLevel = Number(settings.criticalLevel);
      
}
function getSettings(){
	return {
		callCost,
		smsCost,
		warningLevel,
		criticalLevel
	}
}

function recordAction(action){
 if(!hasReachedCriticalLevel()){
	let cost = 0
	if(action === 'sms'){
		cost = smsCost
	}
	else if(action === 'call'){
		cost = callCost
	}
	actionList.push({
		type: action,
		cost,
		timestamp: new Date()
	})
	}		
}
	function actions(){
		return actionList
	}
	
	function actionsfor(type){
		return actionList.filter((action) => action.type === type)

	}
	function getTotal(type){
		return actionList.reduce((total, action) => {
			let val = action.type === type ? action.cost :0
			return total + val
		}, 0);

	}
	function grandTotal(){
		return getTotal('sms') + getTotal('call');
	}
	function totals(){
		let smsTotal = getTotal('sms')
		let callTotal = getTotal('call')
		return{
			smsTotal,
			callTotal,
			grandTotal : grandTotal(),
			color: totalClassName()
		}

	}

function hasReachedWarningLevel(){
	const total = grandTotal()
	const reachedWarningLevel = total >= warningLevel 
	&& total < criticalLevel;
	return reachedWarningLevel;
}

function hasReachedCriticalLevel(){
	const total = grandTotal()
	
	return total >= criticalLevel
}
function totalClassName(){
 		if(hasReachedCriticalLevel()){
 			return 'danger'
 		}

 		else if(hasReachedWarningLevel()){
 			return 'warning'
 		}	
 	}

 	
	return {
		setSettings,
		getSettings,
		recordAction,
		actions,
		actionsfor,
		totals,
		hasReachedCriticalLevel,
		hasReachedWarningLevel

	}
}