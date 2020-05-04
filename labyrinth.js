var rows = 20;
var cols = 20;
var cellsize = 50;

document.getElementById("start").addEventListener("click", function() {
	cols = document.getElementById("cols").value
	cellsize = document.getElementById("cellsize").value
	rows = document.getElementById("rows").value
	Generate()
})


function Generate() {
	document.querySelector(".labyrinth").innerHTML = "";

// генерация поля

for(let i = 0;i<rows;i++) {
	document.querySelector(".labyrinth").prepend(document.createElement("div"))
	document.querySelector(".labyrinth div").classList.add("row");
	for(let y=0;y<cols;y++) {
		document.querySelector(".row").prepend(document.createElement("div"))
		document.querySelector(".row div").classList.add("cell")
		document.querySelector(".row div").classList.add(`col${cols-y}`)
		document.querySelector(".row div").classList.add(`row${rows-i}`)
	}
}

document.querySelector(".labyrinth").style.cssText = `width:${cols*cellsize}px;height:${rows*cellsize}px;`
document.querySelectorAll(".cell").forEach(item => item.style.cssText = `width:${cellsize}px`)
document.querySelectorAll(".row").forEach(item => item.style.cssText = `height:${cellsize}px`)


// генерация входа и выхода 


// генерация входа
let startRowindex = Math.floor(Math.random() * rows)
let startRow = document.querySelectorAll(".row")[startRowindex]
startRow.children[0].classList.add("start")

// генерация выхода
let endRowIndex = Math.floor(Math.random()*rows);
let endRow = document.querySelectorAll(".row")[endRowIndex]
endRow.children[cols - 1].classList.add("end")


	// проход всего лабиринта
	let start = document.querySelector(".start")

	function move (elem) {
		if (elem.className.indexOf("done") === -1) {
			console.log()

			let curCol = Number(elem.className.split(" ").filter(item => item.indexOf("col") !== -1)[0].substr("3"))
			let curRow = Number(elem.className.split(" ").filter(item => item.indexOf("row") !== -1)[0].substr("3"))
			elem.classList.add("done");
		// addNumber(elem) <-отключенный счетчик
		let colAround = [curCol-1,curCol+1];
		let rowAround = [curRow-1,curRow+1];

		let elemArr = []
		// сбор элементов вокруг текущей клетки
		for(let i = 0;i<colAround.length;i++){
			if((colAround[i] > 0 && colAround[i] <=cols)) {
				if (document.querySelector(`.col${colAround[i]}.row${curRow}`).className.indexOf("done") === -1) {

					elemArr.push(document.querySelector(`.col${colAround[i]}.row${curRow}`))
				}
			}
		}
		// сбор элементов вокруг текущей клетки
		for(let y=0;y<rowAround.length;y++) {
			if((rowAround[y] > 0 && rowAround[y] <=rows)) {
				if (document.querySelector(`.col${curCol}.row${rowAround[y]}`).className.indexOf("done") === -1) {
					elemArr.push(document.querySelector(`.col${curCol}.row${rowAround[y]}`))
				}
			}
		}

		if(elemArr.length ===0) {return}

			//запуск по всем элементам массива текущей функции + удаление бордеров
		elemArr.sort(()=>Math.random() -0.5)

		for(let i =0;i<elemArr.length;i++) {
			move(elemArr[i])
			removeBorder(elem,elemArr[i])
		}
	}

}

	// нумерация клеток(будет отключена позже)
	var count = 0;
	function addNumber(item) {
		item.innerText  = count
		count++
	}


/////////////////////////////////// первичный запуск 
move(start)
///////////////////////////////////

// убирает ненужные бордеры
function removeBorder(item1,item2) {
	if(item2.className.indexOf("bremoved") === -1) {

		let it1Col = Number(item1.className.split(" ").filter(item => item.indexOf("col") !== -1)[0].substr("3"))
		let it1Row = Number(item1.className.split(" ").filter(item => item.indexOf("row") !== -1)[0].substr("3"))

		let it2Col = Number(item2.className.split(" ").filter(item => item.indexOf("col") !== -1)[0].substr("3"))
		let it2Row = Number(item2.className.split(" ").filter(item => item.indexOf("row") !== -1)[0].substr("3"))

		if(it1Col > it2Col) {
			item1.classList.add("b-left"),item2.classList.add("b-right")
		} 
		if(it1Col < it2Col) {
			item1.classList.add("b-right"),item2.classList.add("b-left")
		} 

		if(it1Row > it2Row) {
			item1.classList.add("b-top"),item2.classList.add("b-bottom")
		} 
		if(it1Row < it2Row) {
			item1.classList.add("b-bottom"),item2.classList.add("b-top")
		} 
		item2.classList.add("bremoved")
	}
}
}