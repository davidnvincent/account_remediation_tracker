const regex = /[^A-Za-z0-9]/g;
let csvContent = "data:text/csv;charset=utf-8,";

let anchors = [];
let clickedArr = [];
let hoveredArr = [];
let mouseCoords = []
let total_clicks = 0;

window.onload = function() {

    anchors = document.getElementsByTagName("a");

    // Tracks which anchor elements are clicked and/or hovered over //

    for (let i = 0; i < anchors.length; i++) {

        // Element clicked //

        anchors[i].removeAttribute("href");
        anchors[i].style.cursor = "pointer";

        anchors[i].onclick = function() {
            onEvent(clickedArr, i);
            total_clicks++;
            alert("Demo Page.");
        }

        // Mouse hovering element //

        anchors[i].onmouseover = function() {
            onEvent(hoveredArr, i);
        };

    };

    // Tracks mouse moverment //

    document.addEventListener('mousemove', (e) => {
        mouseCoords.push([e.pageX, e.pageY]);
    });

}

function onEvent(arr, i) {
    let anchor_name = "";

    //First checks whether the anchor has text within it

    if (anchors[i].text != null) {
        anchor_name = anchors[i].text;
    }

    //Then checks whether the anchor has a title
    else if (anchors[i].title != null) {
        anchor_name = anchors[i].title;
    }

    anchor_name = anchor_name.replace(regex, "");

    if (exists(arr, anchor_name)) {
        for (var k = 0; k < arr.length; k++) {
            if (arr[k][0] == anchor_name) {
                arr[k][1]++;
                break;
            }
        }
    } else {
        arr.push([anchor_name, 1]);
    }

    console.log(arr);

};

function exists(arr, search) {
    return arr.some(row => row.includes(search));
}

function mouseEventData() {

    if (Array.isArray(clickedArr) && clickedArr.length) {
        csvContent += "Click Data\r\nTotal Clicks, " + total_clicks + "\r\n---\r\nLink Text, Times Clicked\r\n";

        clickedArr.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        csvContent += "\r\n\r\n\r\n";

    }

    if (Array.isArray(hoveredArr) && hoveredArr.length) {
        csvContent += "Hover Data\r\n---\r\nLink Text, Times Clicked\r\n";

        hoveredArr.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mouseEventData.csv");
    document.body.appendChild(link); // Required for FF

    link.click();

    csvContent = "data:text/csv;charset=utf-8,";

}

function mousePositionData() {
    csvContent += "X Coordinate, Y Coordinate\r\n";

    mouseCoords.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mousePositionData.csv");
    document.body.appendChild(link); // Required for FF

    link.click();

    csvContent = "data:text/csv;charset=utf-8,";

}
