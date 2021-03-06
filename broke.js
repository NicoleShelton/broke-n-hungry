var info;

function initchart() {
    var data = {
        _proficiency: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        children: null,
        value: 0,
        key: "",
        depth: 1
    };
    chart.refreshChart(data)
}
function mouseover(data) {
    chart.refreshChart(data);
    var c = getcrumbpath(data);
    i(c);
    d3
        .selectAll(".skills-sunburst path")
        .style("opacity", .3), sunburst
        .selectAll("path")
        .filter(function (a) { return c.indexOf(a) >= 0 })
        .style("opacity", 1)
}
function mouseleave() {
    d3
        .selectAll("path")
        .on("mouseover", null);
    d3
        .selectAll("path")
        .transition()
        .duration(1e3)
        .style("opacity", 1)
        .each("end", function () { d3.select(this).on("mouseover", mouseover) })
}
function getcrumbpath(a) {
    for (var temp = [], c = a; c.parent;) temp.unshift(c), c = c.parent;
    return temp
}
function initbreadcrumb() {
    d3
        .select("#skills-chart-breadcrumb")
        .append("svg:svg")
        .attr("width", 500)
        .attr("height", 50)
        .attr("class", "trail")
}
function h(a, d3) {
    var c = [];
    c.push("0,0");
    c.push(r.w + ",0");
    c.push(r.w + r.t + "," + r.h / 2);
    c.push(r.w + "," + r.h);
    c.push("0," + r.h);
    d3 > 0 && c.push(r.t + "," + r.h / 2);
    return c.join(" ");
}
function i(a) {
    a[a.length - 1]._color, a.length;
    var c = d3
        .select("#skills-chart-breadcrumb .trail")
        .selectAll("g")
        .remove();
    c = d3
        .select("#skills-chart-breadcrumb .trail")
        .selectAll("g")
        .data(a, function (a) { return a.key + a.depth });
    var d = c.enter().append("svg:g");
    d
        .append("svg:polygon")
        .attr("points", h)
        .style("fill", function (a) { return a._color }),
    d
        .append("svg:text")
        .attr("x", 9)
        .attr("y", r.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "left")
        .attr("class", "breadcumb-text")
        .style("fill", function (a) { return getcolor(d3.rgb(a._color)) < 150 ? "#000" : "#000" })
        .text(function (a) { return a.key }),
    c
        .attr("transform", function (a, b) { return "translate(" + b * (r.w + r.s) + ", 0)" }),
    c.exit().remove(),
    d3.select(".trail").style("visibility", "")
}
function getcolor(color) {
    return .299 * color.r + .587 * color.g + .114 * color.b
}
function k(a) {
    var c = ["#ecce34", "#e63914", "#a94ad0", "#3f5bee"],
        d = [-.1, -.05, 0];
    if (1 == a.depth) {
        var e = c[coloralternative % 5];
        return coloralternative++, e
    }
    if (a.depth > 1) {
        var f = d[a.value % 3];
        return d3.rgb(a.parent._color).brighter(.2 * a.depth + f * a.depth)
    }
}
var l;
var chart = function (d3) {
    function processdata(data) {
        var b = [],
            c = 0;
        return data._proficiency.forEach(function (a) {
            c <= i.length && (b.push({
                p: a,
                date: i[c]
            }), c++)
        }), b
    }
    function c(b, c) {
        j.domain(d3.extent(b, function (a) { return a.date }));
        k
            .domain(), cpath
            .append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + h + ")")
            // .call(bottomtick)
            .append("text")
            .attr("x", 450)
            .attr("y", -8)
            .style("text-anchor", "end")
            .text(""), cpath
            .append("g")
            .attr("class", "y-axis axis")
            // .call(lefttick)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".91em")
            .style("text-anchor", "end")
            .text(""), cpath
            .append("path")
            .datum(b)
            .attr("class", "line")
            .attr("id", "skills-chart-line")
            .attr("d", n)
            .attr("stroke", function () { return c._color })
    }
    function refreshChart(data) {
        var e = processdata(data),
            f = d3.select("#skills-chart-line");
        null === f[0][0]
        ? c(e, data)
        : f
            .datum(e)
            .attr("d", n)
            .attr("stroke", function () { return data._color })
    }
    var chart = {},
        rect = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        g = 500 - rect.left - rect.right,
        h = 400 - rect.top - rect.bottom,
        i = [],
        j = d3.scale.linear().range([0, g]),
        k = d3.scale.linear().range([h, 0]),
        bottomtick = d3
            .svg
            .axis()
            .scale(j)
            .tickValues([])
            .tickFormat(d3.format(".0f"))
            .tickPadding(10)
            .tickSize(0)
            .orient("bottom"),
        lefttick = d3
            .svg
            .axis()
            .scale(k)
            .tickSize(0)
            .tickPadding(10)
            .tickValues([])
            .orient("left"),
        n = d3.svg.line().interpolate("basis").x(function (a) {
            return j(a.date)
        }).y(function (a) {
            return k(a.p)
        }),
        cpath = d3
            .select(".skills-chart")
            .append("svg")
            .attr("width", g + rect.left + rect.right)
            .attr("height", h + rect.top + rect.bottom)
            .append("g")
            .attr("transform", "translate(" + rect.left + "," + rect.top + ")");
        chart.refreshChart = refreshChart;
        return chart;
    }(d3),
    width = 900,
    height = 700,
    rad = Math.min(width, height) / Math.PI - 25,
    q = k,
    r = {
        w: 85,
        h: 30,
        s: 3,
        t: 5
    },
    sunburst = d3
        .select(".skills-sunburst")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
sunburst.append("svg:circle").attr("r", rad).style("opacity", 0);
var t = function (a, b) {
        var c = [],
            d = a.length;
        if (a.length !== b.length) c = a.length > b.length ? a : b;
        else for (var e = 0; d > e; e++) {
            var f = Math.max(a[e], b[e]) - Math.abs(a[e] - b[e]) / 8;
            c.push(f)
        }
        return c
    },
    u = function (a) {
        if (a instanceof Array) return a;
        var b = [];
        return $.each(a, function (a, c) {
            b = t(u(c), b)
        }), b
    },
    proficiencydata = d3
        .layout
        .partition()
        .sort(null)
        .size([2 * Math.PI, rad])
        .children(function (a) {
            return a.value instanceof Array
                ? (a._proficiency = a.value, d3.entries([a.value[a.value.length - 1]]))
                : (a._proficiency = u(a.value), isNaN(a.value) ? d3.entries(a.value) : null)
        })
        .value(function (a) { return a.value }),
    arc = d3.svg
        .arc()
        .startAngle(function (a) { return a.x })
        .endAngle(function (a) { return a.x + a.dx - .01 / (a.depth + .5) })
        .innerRadius(function (a) { return rad / Math.PI * a.depth })
        .outerRadius(function (a) { return rad / Math.PI * (a.depth + 1) - 1 });

var coloralternative = 0
initbreadcrumb();
var path = sunburst
    .data(d3.entries(skillsdata))
    .selectAll("g")
    .data(proficiencydata)
    .enter()
    .append("svg:g")
    .attr("display", function (a) { return a.depth ? null : "none" });
path
    .append("svg:path")
    .attr("d", arc)
    .attr("stroke", "#fff")
    .attr("fill", function (a) { return a._color = q(a), a._color })
    .attr("fill-rule", "evenodd").attr("display", function (a) { return a.children ? null : "none" })
    .on("mouseover", mouseover);
path.
    append("svg:text")
    .attr("transform", function (a) {
        var r = 180 * ((a.x + a.dx / 2 - Math.PI / 2) / Math.PI);
        return "rotate(" + r + ")"
    })
    .attr("x", function (a) { return rad / Math.PI * a.depth})
    .attr("dx", "6").attr("dy", ".1em").text(function (a) { return a.key })
    .attr("display", function (a) { return a.children ? null : "none" })
    .on("mouseover", mouseover);
d3
    .select(".skills-sunburst")
    .on("mouseleave", mouseleave);
l = path.node().__data__.value;
sunburst
    .append("circle")
    .attr("r", rad / Math.PI)
    .attr("opacity", 0);
initchart();
String.prototype.format = function() {
   var content = this;
   for (var i=0; i < arguments.length; i++)
   {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
   }
   return content;
};
function getID(item) {
  return items[item];
};
function addToCart(item, price) {
  var menu = document.getElementById('menu_two');
  menu.innerText = item;
  price = (price/10).toFixed(2)
  api1.innerText = '$' + price;
  $.getJSON('https://api.nutritionix.com/v1_1/item?id={0}&appId=44e5c8b1&appKey=95bba8a8ce5d8e825b701ebd9edd965a'.format(getID(item)))
   .done(function (info) {
      console.log(info)
      $('#expected').nutritionLabel({
        'itemName': info.item_name,
      	'showPolyFat' : false,
      	'showMonoFat' : false,

      	'valueCalories' : info.nf_calories,
      	'valueFatCalories' : info.nf_calories_from_fat,
      	'valueTotalFat' : info.nf_total_fat,
      	'valueSatFat' : info.nf_saturated_fat,
      	'valueTransFat' : info.nf_trans_fatty_acid,
      	'valueCholesterol' : info.nf_cholesterol,
      	'valueSodium' : info.nf_sodium,
      	'valueTotalCarb' : info.nf_total_carbohydrate,
      	'valueFibers' : info.nf_dietary_fiber,
      	'valueSugars' : info.nf_sugars,
      	'valueProteins' : info.nf_protein,
      	'valueVitaminA' : info.nf_vitamin_a_dv,
      	'valueVitaminC' : info.nf_vitamin_c_dv,
      	'valueCalcium' : info.nf_calcium_dv,
      	'valueIron' : info.nf_iron_dv
      });
    });
};

d3
    .selectAll("g")
    .filter(function (d) { return d.children && d.children.length === 1; })
    .on("click", function (d) { addToCart(d.key, d.value); } );
