$(document).ready(function () {
    var isFirstClick = true;
    $("#my-menu-tab").click(function () {
        if (isFirstClick) {
            isFirstClick = false;
            $("#menu-1").tab('show');
        }
    });

    $("input[type='number']").inputSpinner()

    var branchTableId = getUrlParameter('BranchTableId');


    function setTotalAmount(data) {
        var totalAmount = 0;
        data[0].forEach(item => {
            totalAmount += item.Price * item.Quantity;
        });
        $("#totalAmount").text("金額$ " + totalAmount.toFixed(1));
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    refreshOrderList();
    function refreshOrderList() {
        $.getJSON("/GetOrderedList?BranchTableId=" + branchTableId, function (data) {
            $("#OrderContainer").empty();
            data[0].forEach(item => {
                var html = "<div class='row menu-row'><table style='width: 100%;'>";
                html += "<tr><td style='width: 100px;'><img class='menu-img' src='";
                html += item.Image;
                html += "' alt='sushi1' width='100' height='100'></td><td><div style='height:100px'>";
                html += "<div class='menu-name row menu-item-row'>";
                html += item.Name;
                html += "</div><div class='menu-price row menu-item-row'><div style='width: 100%;'>";
                html += "$" + item.Price.toFixed(1) + " X " + item.Quantity;
                html += " = " + (item.Price * item.Quantity).toFixed(1);
                html += "<i class='fa fa-trash fa-lg float-right' aria-hidden='true'></i></div></div></div></td></tr></table></div>"
                $("#OrderContainer").append(html);
                setTotalAmount(data);
            });
        });
    }

    $('[name=AddButton]').click(function () {
        var menuItemId = $(this).attr('menuItemId');
        addTransactionItem(menuItemId);
    });

    function addTransactionItem(menuItemId) {
        var quantity = $("#amount-" + menuItemId).val();
        var param = { menuItemId: menuItemId, quantity: quantity, branchTableId: branchTableId };
        $.post("/AddTransactionItem", param )
        .done(function( data ) {
            console.log('121231');
            refreshOrderList();
        });
    }
});