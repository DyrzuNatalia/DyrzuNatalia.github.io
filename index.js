function clearVal(val, limit){
    var newVal = val.replace(/[^\d]+/g, '');
    if( newVal == '' ){
    return false;
    }else{
    return newVal.substring(0, limit);
    }
   }
    
   function getResString(newVal){
    var res = '';
    for(var i = 0; i < newVal.length; i++){
    if( i == 3 ){
    res += ' ';
    res += newVal.charAt(i);
    }else if( i == 6 || i == 8 ){
    res += '-';
    res += newVal.charAt(i);
    }else{
    res += newVal.charAt(i);
    }
    }
    return res;
   }


$(document).ready(function () {
    let myForm = $("#calck");
    let changeArea = 10;

    
        
       $(function(){
        $('#tel').on('input', function(){
        var val = $(this).val(),
        limit = 10;
        if( val == '' ) return;
        
        var newVal = clearVal(val, limit);
        if(!newVal){
        $(this).val('');
        return;
        }
        var res = getResString(newVal);
        $(this).val(res);
        });
       });

    $(".slider").slider({
        animate: true,
        range: "min",
        value: 10,
        min: 10,
        max: 250,
        step: 1,

        slide: function (event, ui) {
            $(".area_result").html(ui.value + ` м<sup><small>2</small></sup>`);
        },

        change: function (event, ui) {
            $('#znch').attr('value', ui.value);
            $('#change').attr('value', ui.value);
            changeArea = (ui.value);
            console.log(changeArea);
        }
    });



    let areaOfHouse = $(".slider").slider('value');

    // show cost of repair all house


    let costAllAreaHouse = () => {
        let checkedValueRoom = myForm.find("input[name=room]:checked").val();
        let costOfHouse;

        if ((checkedValueRoom === "1") && (10 <= changeArea) && changeArea <= 99) {
            costOfHouse = changeArea * 3000;
        } else if ((checkedValueRoom === "2") && (10 <= changeArea) && changeArea <= 99) {
            costOfHouse = changeArea * 2950;
        } else if ((checkedValueRoom === "3") && (10 <= changeArea) && changeArea <= 99) {
            costOfHouse = changeArea * 2900;
        } else if ((checkedValueRoom === "4") && (10 <= changeArea) && changeArea <= 99) {
            costOfHouse = changeArea * 2850;
        } else if ((checkedValueRoom === "5") && (10 <= changeArea) && changeArea <= 99) {
            costOfHouse = changeArea * 2800;
        } else if ((checkedValueRoom === "1") && changeArea > 99) {
            costOfHouse = changeArea * 2500;
        } else if ((checkedValueRoom) === "2" && changeArea > 99) {
            costOfHouse = changeArea * 2450;
        } else if ((checkedValueRoom === "3") && changeArea > 99) {
            costOfHouse = changeArea * 2400;
        } else if ((checkedValueRoom === "4") && changeArea > 99) {
            costOfHouse = changeArea * 2350;
        } else if ((checkedValueRoom === "5") && changeArea > 99) {
            costOfHouse = changeArea * 2300;
        } else {
            return
        }

        return costOfHouse;
    }

    // show cost of repair with type of repair


    let costOfRepaire = () => {
        let checkboxRepair = myForm.find("input[name=repairs]:checked").val();
        let costValue = ((costAllAreaHouse()) * checkboxRepair);
        return costValue;
    }

    // show days of repair

    let daysOfRepaire = () => {
        let daysValue;
        let cost = costOfRepaire();
        if (costAllAreaHouse() <= 50000) {
            daysValue = 14 + ' дней.';
        } else if (cost > 50000 && cost <= 100000) {
            daysValue = 21 + ' день.';
        } else if (cost > 100000 && cost <= 150000) {
            daysValue = 28 + ' дней.';
        } else if (cost > 150000 && cost <= 200000) {
            daysValue = 28 + ' дней.';
        } else if (cost > 200000 && cost <= 250000) {
            daysValue = 30 + ' дней.';
        } else if (cost > 250000 && cost <= 350000) {
            daysValue = 45 + ' дней.';
        } else if (cost > 350000 && cost <= 450000) {
            daysValue = 50 + ' дней.';
        } else {
            daysValue = 50 + ' дней.';
        }
        return daysValue;
    }

    // type of repair

    let saleOfRepairs = () => {
        let checkboxRepair = myForm.find("input[name=repairs]:checked").val();
        let saleValue = (((costAllAreaHouse()) * 0.11) * checkboxRepair)
        return saleValue;
    };

    // standart data

    let valueSaleOfRepairs = saleOfRepairs() + ' руб.';
    $('#sale').attr('value', valueSaleOfRepairs.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('#repair_days').attr('value', daysOfRepaire());

    $('.btn').on("click", function () {
        $('#calck').addClass('hidden');
        $('.alert').removeClass('hidden');
        $('.costAll').html(costAllAreaHouse() + ' руб.');
    })

    // show new data when change range area 

    $(".ui-slider-handle").on("click", function () {

        let valueSaleOfRepairs = saleOfRepairs().toFixed(2) + ' руб.';
        $('#sale').attr('value', valueSaleOfRepairs.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('#repair_days').attr('value', daysOfRepaire());
        
    })

    // show new data when change input 

    $('body').on('change', 'input[type=radio]', function () {

        let valueSaleOfRepairs = saleOfRepairs().toFixed(2) + ' руб.';
        $('#sale').attr('value', valueSaleOfRepairs.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('#repair_days').attr('value', daysOfRepaire());
    });


   
    // show cost of repair

    $('.btn').on("click", function () {
        $('#calck').addClass('hidden');
        $('.alert').removeClass('hidden');
        $('.costAll').html(costOfRepaire() + ' руб.');
    })

    
    
})