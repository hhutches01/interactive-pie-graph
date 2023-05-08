document.addEventListener("DOMContentLoaded", function () {
    var chart = document.getElementById("chart");
    var legend = document.getElementById("legend");
    var favoriteColors = [
        { color: "red", count: 5 },
        { color: "blue", count: 10 },
        { color: "green", count: 8 },
        { color: "yellow", count: 2 },
        { color: "purple", count: 5 },
    ];

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    var total = 0;
    for (var i = 0; i < favoriteColors.length; i++) {
        total += favoriteColors[i].count;
    }

    var currentAngle = 0;
    for (var i = 0; i < favoriteColors.length; i++) {
        var sliceAngle = (favoriteColors[i].count / total) * 360;
        var pieSlice = createPieSlice(currentAngle, sliceAngle, favoriteColors[i].color, favoriteColors[i].count);
        svg.appendChild(pieSlice);
        currentAngle += sliceAngle;

        var textAngle = currentAngle - (sliceAngle / 2);
        var textX = 16 + 10 * Math.cos(degreesToRadians(textAngle));
        var textY = 16 + 10 * Math.sin(degreesToRadians(textAngle));
        var sliceText = createSliceText(textX, textY, favoriteColors[i].count);
        svg.appendChild(sliceText);

        var legendItem = createLegendItem(favoriteColors[i].color, favoriteColors[i].count);
        legend.appendChild(legendItem);
    }

    chart.appendChild(svg);

    var tooltip = createTooltip();
    document.body.appendChild(tooltip);

    function createPieSlice(startAngle, sliceAngle, fillColor, count) {
        var largeArc = sliceAngle > 180 ? 1 : 0;
        var startX = 16 + 14 * Math.cos(degreesToRadians(startAngle));
        var startY = 16 + 14 * Math.sin(degreesToRadians(startAngle));
        var endX = 16 + 14 * Math.cos(degreesToRadians(startAngle + sliceAngle));
        var endY = 16 + 14 * Math.sin(degreesToRadians(startAngle + sliceAngle));

        var pathData = [
            "M", 16, 16,
            "L", startX, startY,
            "A", 14, 14, 0, largeArc, 1, endX, endY,
            "Z"
        ].join(" ");

        var slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
        slice.setAttribute("d", pathData);
        slice.setAttribute("fill", fillColor);

        slice.addEventListener("mouseover", function (event) {
            tooltip.textContent = fillColor + ": " + count;
            tooltip.style.display = "block";
        });

        slice.addEventListener("mouseout", function (event) {
            tooltip.style.display = "none";
        });

        slice.addEventListener("mousemove", function (event) {
            tooltip.style.left = (event.pageX + 10) + "px";
            tooltip.style.top = (event.pageY + 10) + "px";
        });

        return slice;
    }

        function createSliceText(x, y, count) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "central");
        text.setAttribute("font-size", "1.5");
        text.textContent = count;

        return text;
    }

    function createLegendItem(color, count) {
        var legendItem = document.createElement("div");
        legendItem.className = "legend-item";

        var legendColor = document.createElement("div");
        legendColor.className = "legend-color";
        legendColor.style.backgroundColor = color;

        var legendLabel = document.createElement("span");
        legendLabel.textContent = color + ": " + count;

        legendItem.appendChild(legendColor);
        legendItem.appendChild(legendLabel);

        return legendItem;
    }

    function degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    function createTooltip() {
        var tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.style.display = "none";
        tooltip.style.position = "absolute";
        tooltip.style.padding = "5px";
        tooltip.style.borderRadius = "5px";
        tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        tooltip.style.color = "white";
        tooltip.style.fontSize = "12px";

        return tooltip;
    }
});


