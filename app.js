/*
* 
* __    __
* \ \  / /
*  \ \/ /
*   \__/
*
* Переключатель месяца - добавить  id = prev id = next 
*
*
*
*
*/


let Calendar = function(calendar){
	let obj = this;
	obj.calendar = calendar;

	obj.table = calendar.querySelector('table');
	obj.tbody = calendar.querySelector('tbody');
	obj.prev = calendar.querySelector('.prev');
	obj.next = calendar.querySelector('.next');
	// obj.info = calendar.querySelector('#info');
	obj.date  = new Date();
	obj.year  = obj.date.getFullYear();
	obj.month = obj.date.getMonth();
	obj.monthRus = [
		'Янв',
		'Фев',
		'Мар',
		'Апр',
		'Май',
		'Июн',
		'Июл',
		'Авг',
		'Сен',
		'Окт',
		'Ноя',
		'Дек',
	];

	obj.daysRus = [
		'пн',
		'вт',
		'ср',
		'чт',
		'пт',
		'сб',
		'вс',
	]

	if(obj.prev){
		obj.prev.addEventListener('click', function() {
			obj.draw(obj.tbody, obj.getPrevYear(obj.year, obj.month), obj.getPrevMonth(obj.month));
		});
	}
	if(obj.next){
		obj.next.addEventListener('click', function() {
			obj.draw(obj.tbody, obj.getNextYear(obj.year, obj.month), obj.getNextMonth(obj.month));
		});
	}

	obj.draw = function(tbody, year, month) {
		let arr = obj.range(obj.getLastDay(year, month));
		
		let firstWeekDay = obj.getFirstWeekDay(year, month);
		let lastWeekDay  = obj.getLastWeekDay(year, month);
		
		let nums = obj.chunk(obj.normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
		obj.createElems(nums)
	}

	obj.createTable = function(){
		obj.info = document.createElement('info');
		obj.table = document.createElement('table');
		obj.tbody = document.createElement('tbody');
		obj.thead = document.createElement('thead');
		obj.tr = document.createElement('tr');

		calendar.appendChild(obj.info);
		calendar.appendChild(obj.table);
		obj.thead.appendChild(obj.tr);
		obj.table.appendChild(obj.thead);
		obj.table.appendChild(obj.tbody);

		for(i=0;i<7;i++){
			let th = document.createElement('th');
			th.textContent = obj.daysRus[i];
			obj.tr.appendChild(th);
		}
	}
	obj.createTable();
	obj.createElems = function(arr) {
		let cells = [];
		
		obj.tbody.textContent = '';
		obj.info.textContent = obj.monthRus[obj.month]+ ' ' + obj.year;

		
		for (let sub of arr) {
			let tr = document.createElement('tr');
			
			for (let num of sub) {
				let td = document.createElement('td');
				td.textContent = num;
				tr.appendChild(td);
				
				cells.push(td);
			}
			obj.tbody.appendChild(tr);
		}
		
		return cells;
	}

	obj.normalize = function(arr, left, right) {
		for (let i = 0; i < left; i++) {
			arr.unshift('');
		}
		for (var i = 0; i < right; i++) {
			arr.push('');
		}
		
		return arr;
	}

	obj.getFirstWeekDay = function(year, month) {
		let date = new Date(year, month, 1);
		let num  = date.getDay();
		
		if (num == 0) {
			return 6;
		} else {
			return num - 1;
		}
	}

	obj.getLastWeekDay = function(year, month) {
		let date = new Date(year, month + 1, 0);
		let num  = date.getDay();
		
		if (num == 0) {
			return 6;
		} else {
			return num - 1;
		}
	}

	obj.getLastDay = function (year, month) {
		let date = new Date(year, month + 1, 0);
		return date.getDate();
	}

	obj.range = function(count) {
		let arr = [];
		
		for (let i = 1; i <= count; i++) {
			arr.push(i);
		}
		
		return arr;
	}

	obj.chunk = function(arr, n) {
		let result = [];
		let count = Math.ceil(arr.length / n);
		
		for (let i = 0; i < count; i++) {
			let elems = arr.splice(0, n);
			result.push(elems);
		}
		
		return result;
	}

	obj.getPrevYear = function (yearPrev, month){
		if(month==1){
			obj.year = --yearPrev;
		}
		return obj.year;
		
	}

	obj.getPrevMonth = function(prevM){
		if(obj.month==0){
			obj.month = 11;
		}
		else{
			obj.month = --prevM;
		}
		return obj.month;
	}

	obj.getNextYear = function(yearNext, month){
		if(month==11){
			obj.year = ++yearNext;
		}
		return obj.year;
		
	}
	obj.getNextMonth = function(nextM){
		if(obj.month==11){
			obj.month = 0;
		}
		else{
			obj.month = ++nextM;
		}
		return obj.month;
	}

	obj.draw(obj.tbody, obj.year, obj.month);
}


function findCalendars(){
	let calendars = document.querySelectorAll('.calendar');
	for(calendar of calendars){
		new Calendar(calendar);
	}
	
};
findCalendars();

