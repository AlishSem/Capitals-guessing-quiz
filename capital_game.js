// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
  let answers = []
  var country_capital_pairs = pairs
  window.value = Math.floor(Math.random() * country_capital_pairs.length)
  document.getElementById("pr2__country").innerHTML = `${country_capital_pairs[value]["country"]}`
  document.getElementById("pr2__capital").focus()
  document.getElementById("pr2__button").addEventListener('click', function(){ superb(value)});
  document.getElementById("pr2__capital").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("pr2__button").click();
    }
  })

  
  
  
  
  let capitals = []
  for (let i = 0; i < country_capital_pairs.length; i++) {
    capitals.push(country_capital_pairs[i]["capital"])
  }

  $("#pr2__capital").autocomplete({
    source: function (request, response) {
      var match = new RegExp("^" + request.term, "i");
      var x = $.grep(capitals, function (item) {
        return match.test(item);
      })
      response(x)}
    }, {
      minLength:2,
      select: function(event, ui) {
        $("#pr2__capital").val(ui.item.value)
        $("#pr2__button").click()
        $("#pr2__capital").val("")
        return false
        
      }
    })

    $("#variants").change(function() {
      let rows = $("#tablee tr:gt(2)")
      let variant = $('#variants option:selected').val();
      if (variant == "right"){
        if ($(".right").length == 0){
          rows.hide()
          $("#permanent").show()
        }
        else{
          rows.hide()
          $("#permanent").hide()
          rows.filter(".right").show()
        }
      } 
      if (variant == "wrong") {
        if ($(".wrong").length == 0) {
          rows.hide()
          $("#permanent").show()
        }
        else {
          rows.hide()
          $("#permanent").hide()
          rows.filter(".wrong").show()
        }
      }
      if (variant == "all") {
        console.log(rows.length )
        if (rows.length > 1) {
          rows.show()
          $("#permanent").hide()
        }
        else {
        $("#permanent").show()
      }
    }
    })

  $("#tablee").on('click', '.btmini', function () {
    $(this).closest('tr').remove();
    let rows = $("#tablee tr:gt(2)")
    let variant = $('#variants option:selected').val()
    if (variant == "right" && $(".right").length == 0) {
      $("#permanent").show()
    }
    if (variant == "wrong" && $(".wrong").length == 0) {
      $("#permanent").show()
    }
    if (variant == "all" && rows.length == 1) {
      $("#permanent").show()
    }
  })



  
  
  
  
  function superb(a) {
    if (document.getElementById("pr2__capital").value == "") {
      return false
    }
    else {
      let rows = $("#tablee tr:gt(2)")
      rows.show()
      document.getElementById("variantss").selectedIndex = 0
      if (document.getElementById("permanent")) {
        $("#permanent").hide()
      }
      let country = document.getElementById("pr2__country")
      let variant = document.getElementById("pr2__capital")
      answers.push([country.textContent, variant.value])
      let table = document.getElementById("tablee")
      let row = table.insertRow(table.rows.length)
      let th1 = row.insertCell(0)
      let th2 = row.insertCell(1)
      let th3 = row.insertCell(2)
      let btmini = document.createElement("button")
      let dot = document.createElement("i")
      btmini.textContent = "Remove"
      th1.setAttribute("class", "cells")
      th2.setAttribute("class", "cells")
      th3.setAttribute("class", "cells")
      btmini.setAttribute("class", "btmini")
      dot.setAttribute("class", "fas fa-circle")
      if (country_capital_pairs[a]["capital"].toUpperCase() == variant.value.toUpperCase()) {
        th1.innerHTML = `${country_capital_pairs[a]["country"]}`
        th2.innerHTML = `${country_capital_pairs[a]["capital"]}`
        th1.style.color = "green"
        th2.style.color = "green"
        th2.className = "cells"
        th3.append(dot)
        th3.style.color = "green"
        row.setAttribute("class", "right")
      }
      else {
        th1.innerHTML = `${country_capital_pairs[a]["country"]}`
        th2.innerHTML = `<strike> ${variant.value} </strike>  `
        th3.innerHTML = `<i> ${country_capital_pairs[a]["capital"]} </i>`
        th1.style.color = "red"
        th2.style.color = "red"
        th3.style.color = "red"
        th3.style.fontFamily = "italics"
        row.setAttribute("class", "wrong")

      }
      th3.append(btmini)

      window.value = Math.floor(Math.random() * country_capital_pairs.length)
      document.getElementById("pr2__country").innerHTML = `${country_capital_pairs[window.value]["country"]}`
      
      document.getElementById("pr2__capital").value = ""
      document.getElementById("pr2__capital").focus()
    }
  }
  

});
