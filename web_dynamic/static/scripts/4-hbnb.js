$(document).ready(function () {

    const url = "http://0.0.0.0:5001/api/v1/status/";
  
    $.get(url, function (data) {
  
  
      if (data.status === 'OK') {
  
        $('div.api_status').addClass('available');
      } else {
  
        $('div.api_status').removeClass('available');
      }
    });
    function getHtml (data) {
      $('SECTION.places').append(data.map(place => {
        return `<ARTICLE>
                  <DIV class="title">
                    <H2>${place.name}</H2>
                    <DIV class="price_by_night">
                      ${place.price_by_night}
                    </DIV>
                  </DIV>
                  <DIV class="information">
                    <DIV class="max_guest">
                      <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.max_guest} Guests
                    </DIV>
                    <DIV class="number_rooms">
                      <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_rooms} Bedrooms
                    </DIV>
                    <DIV class="number_bathrooms">
                      <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_bathrooms} Bathrooms
                    </DIV>
                  </DIV>
                  <DIV class="description">
                    ${place.description}
                  </DIV>
                </ARTICLE>`;
      }));
    }
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: '{}',
      contentType: 'application/json',
      dataType: 'json',
      success: getHtml
    });
  
    const amenities = {};
    const amenitiesId = {'amenities' : []}

    $('input[type="checkbox"]').change(function () {
      let amenityName = $(this).data('name');
      let amenityId = $(this).data('id');
  
      if ($(this).is(':checked')) {
        amenities[amenityName] = true;
        amenitiesId.amenities.push(amenityName);
      
      } else {
        delete amenities[amenityName];
      }
      let amenitiesList = '';
      
      for (let id in amenities) {
        if (amenitiesList === '') amenitiesList += id;
        else amenitiesList += ', ' +  id  ;
      }
      $('div.amenities h4').text(amenitiesList);
  
      
      
  
    });
    $('button').click(function () {
      
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify(amenitiesId),
        contentType: 'application/json',
        dataType: 'json',
        success: getHtml
      });
      console.log("data:" + JSON.stringify(amenitiesId));
      
      
    });
  
  });