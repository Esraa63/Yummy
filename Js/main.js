/// <reference types="../@types/jquery" />
$(function(){
  $(".loader").fadeOut(1000,function(){
    $(".loading-screen").slideUp(1000,function(){
      $("body").css("overflow", "auto")
    });
  })
})
$('#nav').hide();
$('#icon').on('click',function(){
    if($('#nav').css('display') == 'none'){
        $("#icon").removeClass("fa-align-justify");
        $("#icon").addClass("fa-x");
        $('li').slideDown(300);
             }else{
                $("#icon").addClass("fa-align-justify");
                $("#icon").removeClass("fa-x");
                  $('li').slideUp(300);               
             }
             
     $('#nav').animate({width:'toggle', paddingInline:'toggle'},500);
});

async function displayData(){
    let cols="";
    let response=await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=`); 
      if(response.status==200){
        let final = await response.json();
        for(let i=0; i<20;i++){
            // console.log(final.meals[i].strMeal);//name 
            cols+=`
            <div class="col-md-3 p-2">
            <div class="position-relative containerName">
            <img src="${final.meals[i].strMealThumb}" alt="meal" class="img-fluid rounded-3">
             <div class="nameOpacity d-flex ps-2 align-items-center text-white" style="font-size:25px">${final.meals[i].strMeal}</div>
            </div> 
            </div>
            `
        }
        
       $('#dataRow').html(cols)
       let clickedCard = $('.nameOpacity');
       clickedCard.on('click',function(e){
        displayIngredient($(e.target).text());
    });

    }
}
displayData()
//display Ingredient
async function displayIngredient(name){
    finalName=name.trim();
    let cols=``;
    let ingredients=``;
     let response=await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${finalName}`); 
      if(response.status==200){
        let final = await response.json();
         for(let i=1;i<=final.meals.length;i++){
              if(final.meals[0][`strIngredient${i}`].trim().length !==0 || final.meals[0][`strIngredient${i}`]===null){
                ingredients+=`<li class="m-2 p-1">${final.meals[0][`strIngredient${i}`]}</li>`
              } 
         }
        let tags = final.meals[0].strTags?.split(",");
        if (!tags) tags = [];
         let tagsStr = '';
          for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-primary m-2 p-1">${tags[i]}</li>`
    }
        cols+=
          `
          <div class="col-md-4 pt-3">
                    <img src="${final.meals[0].strMealThumb}" alt="meal" class="img-fluid">
                    <h2 class="pt-3">${final.meals[0].strMeal}</h2>
                </div>

                <div class="col-md-8">
                    <div class="row py-3">
                        <h3>Instructions</h3>
                        <p>${final.meals[0].strInstructions}</p>     </div>
                    <div class="row py-3">
                        <h2 class="pb-3" ><span style="color:#03BBDF">Area :</span> ${final.meals[0].strArea}</h2>
                        <h2> <span style="color:#03BBDF">Category :</span> ${final.meals[0].strCategory}</h2>
                    </div>
                    <div class="row py-3">
                        <h2 style="color:#03BBDF">Recipes :</h2>
                        <ul class="d-flex g-3 flex-wrap">
                           ${ingredients}
                        </ul>
                    </div>
                    <div class="row py-3">
                        <h2><span style="color:#03BBDF">Tags :</span></h2>
                      <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsStr}
                      </ul>   
                    </div>
                    <div class="row pt-3">
                        <p>  <a href="${final.meals[0].strSource}" class="btn btn-success">Source </a> <a href="${final.meals[0].strYoutube}" class="btn btn-danger"> Youtube</a></p>   
                   </div>
                </div>
          `
          $('#dataRow').html(cols)
     }
        
    
      
}
//search
$('#search').on('click',function(){
  $('#data').removeClass('d-none');
  $('#dataRow').html('');
  $('#name').val('');
  $('#letter').val('');
  $('#form').addClass("d-none");
  $('#nav').animate({width:'toggle', paddingInline:'toggle'},1000);
  $("#icon").addClass("fa-align-justify");
  $("#icon").removeClass("fa-x");
})
//search By name
$('#name').keyup(async function(){
  console.log($('#name').val());
    let cols=``;
   let response=await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${$('#name').val()}`); 
   if(response.status==200){
    let final = await response.json();
    console.log(final.meals.length);
    for(let i=0; i<final.meals.length;i++){
    cols+=`<div class="col-md-3 p-2 clickIngredient">
    <div class="position-relative containerName">
    <img src="${final.meals[i].strMealThumb}" alt="" class="img-fluid rounded-3">
    <div class="nameOpacity d-flex ps-2 align-items-center 
    text-white" style="font-size:25px">${final.meals[i].strMeal}</div>
    </div> 
    </div>`;
    } 
    $('#dataRow').html(cols)
    let clickedCard = $(".clickIngredient");
     clickedCard.on("click", function (e) {
      console.log(e.target);
      $('#data').addClass('d-none');
      displayIngredient($(e.target).text());
    });
    }
});

//search By letter
$('#letter').keyup(async function(){
  console.log($('#letter').val());
   let cols=``;
   let response=await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${$('#letter').val()}`); 
   if(response.status==200){
    let final = await response.json();
     for(let i=0; i<final.meals.length;i++){
   cols+=`<div class="col-md-3 p-2 clickIngredient">
    <div class="position-relative containerName">
    <img src="${final.meals[i].strMealThumb}" alt="" class="img-fluid rounded-3">
    <div class="nameOpacity d-flex ps-2 align-items-center 
    text-white" style="font-size:25px">${final.meals[i].strMeal}</div>
    </div> 
    </div>`;
    } 
    $('#dataRow').html(cols)
    let clickedCard = $(".clickIngredient");
     clickedCard.on("click", function (e) {
      console.log(e.target);
      $('#data').addClass('d-none');
      displayIngredient($(e.target).text());
    });
    }
});

//categories
$('#categories').on('click',async function(){
  let cols=``;
  let xx=`<div class="loading-screen">
  <span class="loader"></span>
</div>`;
  let response=await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`); 
    if(response.status==200){
      $("#dataRow").html(xx);
       $('.loading-screen').fadeIn(1000,function(){});
      let final = await response.json();
      for(let i=0; i<final.categories.length;i++){
        //console.log(final.categories[i].strCategory.split(" ").slice(0,20).join(" "));
       cols+=`
      <div class="col-md-3 p-2">
      <div class="txt position-relative containerName">
      <img src="${final.categories[i].strCategoryThumb}" alt="category" class="img-fluid rounded-3">
      <div class=" nameOpacity text-center d-flex flex-column align-items-center text-white" style="font-size:25px">
      <h3> ${final.categories[i].strCategory}</h3>
      <p style="font-size:17px;">${final.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
      </div>
      </div> 
      </div>
      `}
       $("#dataRow").html(xx);
       $('.loading-screen').fadeOut(1000);
         $('#dataRow').html(cols)  
       $('#data').addClass("d-none");
     $('#form').addClass("d-none");
     $('#nav').animate({width:'toggle', paddingInline:'toggle'},1000);
     $("#icon").addClass("fa-align-justify");
     $("#icon").removeClass("fa-x");
      //console.log(final);
      let clickedCard = $(".txt");
      let txt=[];
      clickedCard.on("click", function (e) {
        txt=$(e.target).text().trim().split(" ");
        displayDeepCategories(txt[0]);
     });
    }
});

//deep categories
async function displayDeepCategories(category){
  let cols=``;
  let response=await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`); 
    if(response.status==200){
      let final = await response.json();
     // console.log(final);
      for(let i=0; i<final.meals.length;i++){
            cols+=`
           <div class="col-md-3 p-2">
           <div class="position-relative containerName clickIngredient">
           <img src="${final.meals[i].strMealThumb}" alt="meal" class="img-fluid rounded-3">
           <div class="nameOpacity d-flex ps-2 align-items-center text-white" style="font-size:25px">${final.meals[i].strMeal}</div>
           </div> 
           </div>  
      `}

    $('#dataRow').html(cols)
    let clickedCard = $(".clickIngredient");
    clickedCard.on("click", function (e) {
     console.log($(e.target).text());
     displayIngredient($(e.target).text())
    });
}
}

//areas
$('#area').on('click',async function(){
  let cols=``;
  let txt=[];
  let xx=`<div class="loading-screen">
  <span class="loader"></span>
</div>`;
  let response=await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`); 
    if(response.status==200){
      $("#dataRow").html(xx);
      $('.loading-screen').fadeIn(1000,function(){});
      let final = await response.json();
    //  console.log(final);
      for(let i=0; i<final.meals.length;i++){
        //console.log(final.categories[i].strCategory.split(" ").slice(0,20).join(" "));
       cols+=`
      <div class="col-md-3 p-2 text-center Imgs">
      <img src="./Imgs/country.png" alt="${final.meals[i].strArea}" width="150px" class="img-fluid">
      <p>${final.meals[i].strArea}</p>
      </div>
      `}
      $("#dataRow").html(xx);
      $('.loading-screen').fadeOut(1000);
     $('#dataRow').html(cols)
     $('#data').addClass("d-none");
     $('#form').addClass("d-none");
     $('#nav').animate({width:'toggle', paddingInline:'toggle'},1000);
     $("#icon").addClass("fa-align-justify");
     $("#icon").removeClass("fa-x");
     let clickedCard = $(".Imgs");
     clickedCard.on("click", function (e) {
       if($(e.target).text().trim().length!=0 ){
       // console.log($(e.target).text().trim());  
        displayAreasMeals($(e.target).text().trim())
      }if($(e.target).attr('alt')!= undefined){
      //  console.log($(e.target).attr('alt'));
        displayAreasMeals($(e.target).attr('alt'))
      } 
    })
    }
});

//deep areas
async function displayAreasMeals(area){
  let cols=``;
  let response=await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`); 
  if(response.status==200){
    let final = await response.json();
    for(let i=0; i<final.meals.length;i++){
      cols+=`
      <div class="col-md-3 p-2">
      <div class="position-relative containerName clickIngredient">
      <img src="${final.meals[i].strMealThumb}" alt="meal" class="img-fluid rounded-3">
      <div class="nameOpacity d-flex ps-2 align-items-center text-white" style="font-size:25px">${final.meals[i].strMeal}</div>
      </div> 
      </div>
      `
  }
     $('#dataRow').html(cols)
     let clickedCard = $(".clickIngredient");
     clickedCard.on("click", function (e) {
      console.log($(e.target).text());
      displayIngredient($(e.target).text())
     });
  }
}

//ingredients
$('#ingredients').on('click',async function(){
  let cols=``;
  let xx=`<div class="loading-screen">
  <span class="loader"></span>
</div>`;
  let response=await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`); 
    if(response.status==200){
      $("#dataRow").html(xx);
      $('.loading-screen').fadeIn(1000,function(){});
      let final = await response.json();
     // console.log(final);
      for(let i=0; i<20;i++){
         cols+=`
      <div class="col-md-3 p-2 text-center Imgs">
      <img src="./Imgs/ingredient.png" alt="${final.meals[i].strIngredient}" width="150px" class="img-fluid">
      <h3>${final.meals[i].strIngredient}</h3>
      <p>${final.meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
      </div>
      `}

      $("#dataRow").html(xx);
      $('.loading-screen').fadeOut(1000);
      $('#dataRow').html(cols)
      $('#data').addClass("d-none");
      $('#form').addClass("d-none");
      $('#nav').animate({width:'toggle', paddingInline:'toggle'},1000);
      $("#icon").addClass("fa-align-justify");
      $("#icon").removeClass("fa-x");
     
     let clickedCard = $(".Imgs");
     clickedCard.on("click", function (e) {
      if($(e.target)[0].localName=='h3' ){
       // console.log($(e.target)[0].innerHTML);  
        displayIngredientsMeals($(e.target)[0].innerHTML)
      }
      if($(e.target).attr('alt')!= undefined){
       // console.log($(e.target).attr('alt'));
        displayIngredientsMeals($(e.target).attr('alt'))
      }
      if($(e.target)[0].localName=='p'){
        //console.log($(e.target).siblings()[1].innerHTML);
        displayIngredientsMeals($(e.target).siblings()[1].innerHTML)
    }
    })
    }
});

//deep ingredients
async function displayIngredientsMeals(ingredient){
  let cols=``;
  let response=await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`); 
  if(response.status==200){
    let final = await response.json();
   console.log(final);
    for(let i=0; i<final.meals.length;i++){
      cols+=`
      <div class="col-md-3 p-2">
      <div class="position-relative containerName clickIngredient">
      <img src="${final.meals[i].strMealThumb}" alt="meal" class="img-fluid rounded-3">
      <div class="nameOpacity d-flex ps-2 align-items-center text-white" style="font-size:25px">
      ${final.meals[i].strMeal}</div>
      </div> 
      </div>
      `
  }
     $('#dataRow').html(cols)
     let clickedCard = $(".clickIngredient");
     clickedCard.on("click", function (e) {
      console.log($(e.target).text());
      displayIngredient($(e.target).text())
     });
  }
}

//contact
$('#contact').on('click', function(){
  $("#dataRow").html('');
  $('#data').addClass("d-none");
  $('#form').removeClass("d-none");
  $('#nav').animate({width:'toggle', paddingInline:'toggle'},1000);
 $("#icon").addClass("fa-align-justify");
 $("#icon").removeClass("fa-x");
});

//Regex 
let flages=[false,false,false,false,false,false];
$("#fname").on('keyup',function(){
  let text = $("#fname").val();
  let regex = /^[A-Z][a-z]{2,10}$/;
 // console.log(text);
  if (regex.test(text)) {
    $("#alertname").addClass('d-none');
    flages[0]=true;
    let counter =0;
    for(let i =0 ; i<flages.length ;i++){
        if(flages[i]==true){
            counter++;
        }
    }
    console.log("name "+flages);
    if(counter===6){
          $('#btnSubmit').removeAttr('disabled');
        }
   // console.log("true");
    return true; 
  }else{
    $("#alertname").removeClass('d-none');
    console.log("false");
    flages[0]=false;
    $('#btnSubmit').attr('disabled','true');
    return false;
  }
})
$("#email").on('keyup',function(){
  let text = $("#email").val();
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  //console.log(text);
  if (regex.test(text)) {
    $("#alertemail").addClass('d-none');
    flages[1]=true;
    let counter =0;
    for(let i =0 ; i<flages.length ;i++){
        if(flages[i]==true){
            counter++;
        }
    }
    console.log("email "+flages);
    if(counter===6){
         $('#btnSubmit').removeAttr('disabled');
        }
   // console.log("true");
    return true;
  }else{
    $("#alertemail").removeClass('d-none');
    console.log("false");
    flages[1]=false;
    $('#btnSubmit').attr('disabled','true');
    return false;
  }
})
$("#phone").on('keyup',function(){
  let text = $("#phone").val();
  var regex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g;
  //console.log(text);
  if (regex.test(text)) {
    $("#alertphone").addClass('d-none');
    flages[2]=true;
    let counter =0;
    for(let i =0 ; i<flages.length ;i++){
        if(flages[i]==true){
            counter++;
        }
    }
    console.log("phone "+flages);
    if(counter===6){
         $('#btnSubmit').removeAttr('disabled');
        }
   // console.log("true");
    return true;
  }else{
    $("#alertphone").removeClass('d-none');
    console.log("false");
    flages[2]=false;
    $('#btnSubmit').attr('disabled','true');
    return false;
  }
})
$("#age").on('keyup',function(){
  let text = $("#age").val();
  var regex = /^[1-9][0-9]?$|^100$/g;
  //console.log(text);
  if (regex.test(text)) {
    $("#alertage").addClass('d-none');
    flages[3]=true;
    let counter =0;
    for(let i =0 ; i<flages.length ;i++){
        if(flages[i]==true){
            counter++;
        }
    }
    console.log("age "+flages);
    if(counter===6){
          $('#btnSubmit').removeAttr('disabled');
        }
    console.log("true");
    //return true;
  }else{
    $("#alertage").removeClass('d-none');
    console.log("false");
    flages[3]=false;
    $('#btnSubmit').attr('disabled','true');
    return false;
  }
})
$("#pass").on('keyup',function(){
  let text = $("#pass").val();
  var regex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm;
 // console.log(text);
  if (regex.test(text)) {
    $("#alertpass").addClass('d-none');
    flages[4]=true;
    let counter =0;
    for(let i =0 ; i<flages.length ;i++){
        if(flages[i]==true){
            counter++;
        }
    }
    console.log("pass "+flages);
    if(counter===6){
          $('#btnSubmit').removeAttr('disabled');
        }
  //  console.log("true");
    return true;
  }else{
    $("#alertpass").removeClass('d-none');
    console.log("false");
    flages[4]=false;
    $('#btnSubmit').attr('disabled','true');
    return false;
  }
})
$("#repass").on('keyup',function(){
  let repass = $("#repass").val();
  let pass=$("#pass").val();
  if (repass===pass) {
    $("#alertRepass").addClass('d-none');
    flages[5]=true;
    let counter =0;
    for(let i =0 ; i<flages.length ;i++){
        if(flages[i]==true){
            counter++;
        }
    }
    console.log("repaa "+flages);
    if(counter===6){
         $('#btnSubmit').removeAttr('disabled');
        }
   // console.log("true");
    return true;
  }else{
    $("#alertRepass").removeClass('d-none');
    console.log("false");
    flages[5]=false;
    $('#btnSubmit').attr('disabled','true');
    return false;
  }
})
